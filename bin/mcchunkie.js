#!/usr/bin/env node

'use strict';
var irc = require( 'irc' ),
	nconf = require( 'nconf' ),
	config = __dirname + '/../config.json',
	args = require( 'optimist' )
		.usage( '$0 -n <nick> -s <server> -c <chan1>,<chan2>\n' )
		.demand( [ 'n', 's', 'c' ] )
		.argv,
	nmon = require( 'nmon' ),
	mon = new nmon(),
	analyze = require( 'Sentimental' ).analyze,
	positivity = require( 'Sentimental' ).positivity,
	negativity = require( 'Sentimental' ).negativity,
	datejs = require( 'datejs' ),
	po = require( 'pushover-notifications' ),
	urls, responses, client, 
	channels, chanCount = 0, monitors = [],
	lineCount, negCount, posCount;

channels = args.c.split( ',' );
channels.forEach( function( c ) {
	channels[ chanCount ] = '#' + c.trim();
	chanCount++;
});

function toHumanDate( str ) {
	var d = new Date( str );
	return d.toString('dddd MMMM dS, yyyy') + ' at ' + d.toString('h:mm tt');
}

function sendMsg( cmd, from ) {
	var l, st = '', ii, ll;
	for ( l in urls ) {
		if ( urls.hasOwnProperty( l ) ) {
			ll = urls[l].phrases.length;
			for ( ii = 0; ii < ll; ii++ ) {
				if ( urls[l].phrases[ ii ] === cmd ) {
					st = '';
					if ( urls[l].date ) {
						st += 'last update for "' + l + '" was ' +
							toHumanDate( urls[l].date );
					} else {
						st += 'Nothing recorded for "' + cmd + '"';
					}
					client.say( from, st );
				}
			}
		}
	}
}

function processMsg( from, msg ) {
	var a, i, l, c = '';
	if ( msg.match( args.n + ':' ) ) {
		a = msg.split( ' ' );
		l = a.length;
		for ( i = 1; i < l; i++ ) {
			c += a[i] + ' ';
		}
		c = c.trim();
		sendMsg( c, from );
	}
}

function update() {
	nconf.file( { file: config } );

	urls = nconf.get( 'urls' );
	responses = nconf.get( 'responses' );

	//TODO need to add the ability to stop mon's and also add new ones
	// console.log( urls );
}

function createMon( m ) {
	mon.create( 'http', m );

	mon.on( m.name, function( r ) {
		nconf.set( 'urls:' + r.name + ':date', r.date );

		nconf.save();

		channels.forEach( function( c ) {
			client.say( c, urls[ r.name ].msg );
		});
	});

	monitors.push( mon.monitor() );
}

update();

client = new irc.Client( args.s, args.n, { 
	channels: channels, 
	userName: args.n 
}); 

client.addListener( 'error', function( err ) {
	console.log( err );
	throw err;
});

client.addListener( 'message', function( from, to, msg ) {
	processMsg( to, msg );
});

client.addListener( 'pm', function( from, msg ) {
	processMsg( from, args.n + ': ' + msg );
});

client.addListener( 'invite', function( chan, from ) {
	channels.push( chan );
	client.join( chan, function() {
		client.say( from, "I have joined " + chan );
	});
});

setInterval( function() {
	update();
}, 3000);

var name, o;
for ( name in urls ) {
	if ( urls.hasOwnProperty( name ) ) {
		o = urls[ name ];
		o.name = name;

		createMon( o );
	}
}
