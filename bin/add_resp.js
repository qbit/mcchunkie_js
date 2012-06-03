#!/usr/bin/env node

'use strict';
var nconf = require( 'nconf' ),
conf = __dirname + '/../config.json',
args = require( 'optimist' )
  .usage( '$0 <resp>\n' )
  .demand( 1 )
  .argv;

nconf.file( { file: conf } );

var count = 0;
var resp = nconf.get( 'responses' );

var i;
for( i in resp ) {
  if ( resp.hasOwnProperty( i ) ) { 
    count++;
  }
}

nconf.set( 'responses:' + count, args._[0] );

nconf.save();
