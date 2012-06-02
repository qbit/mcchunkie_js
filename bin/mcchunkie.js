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
	po = require( 'pushover-notifications' ),
	current_dates = {}, dates, urls, responses, client, 
	channels, chanCount = 0, monitors = [],
	lineCount, negCount, posCount;

channels = args.c.split( ',' );
channels.forEach( function( c ) {
	channels[ chanCount ] = '#' + c.trim();
	chanCount++;
});

function processMsg( to, from, msg ) {
	if ( msg.indexOf( args.n ) ) {
	}
}

function update() {
	nconf.file( { file: config } );

	dates = nconf.get( 'dates' );
	urls = nconf.get( 'urls' );
	responses = nconf.get( 'responses' );

	//TODO need to add the ability to stop mon's and also add new ones
	// console.log( urls );
}

function createMon( m ) {
	mon.create( 'http', m );

	mon.on( m.name, function( r ) {
		current_dates[ r.name ] = r.date;
		nconf.set( 'dates:' + r.name, r.date );

		nconf.save();

		channels.forEach( function( c ) {
			client.say( c, urls[ r.name ].msg );
		});
	});

	monitors.push( mon.monitor() );

	// console.log( monitors );
}

update();

client = new irc.Client( args.s, args.n, { 
	channels: channels, 
	userName: args.n 
}); 

client.addListener( 'message', function( from, to, msg ) {
	processMsg( from, to, msg );
});

client.addListener( 'pm', function( from, to, msg ) {
	processMsg( from, to, msg );
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
