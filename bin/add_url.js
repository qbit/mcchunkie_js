#!/usr/bin/env node

'use strict';
var nconf = require( 'nconf' ),
conf = __dirname + '/../config.json',
u = '$0 -n <name>, -p <phrase>, -i <interval>, -m <message>, -u <url>\n',
args = require( 'optimist' )
	.usage( u )
	.demand( [ 'n', 'i', 'm', 'u', 'p' ] )
	.argv;

nconf.file( { file: conf } );

var phrases = args.p.split( ',' );
var c = 0;
phrases.forEach( function( p ) {
	phrases[c] = p.trim();
	c++;
});

nconf.set( 'urls:' + args.n + ':interval', args.i );
nconf.set( 'urls:' + args.n + ':url', args.u );
nconf.set( 'urls:' + args.n + ':msg', args.m );
nconf.set( 'urls:' + args.n + ':phrases', phrases );

nconf.save();
