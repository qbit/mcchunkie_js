#!/usr/bin/env node

'use strict';
var irc = require( 'irc' ),
  fs = require( 'fs' ),
  plugins = __dirname + '/../plugins',
  running_plugins = {},
  args = require( 'optimist' )
    .usage( '$0 -n <nick> -s <server> -c <chan1>,<chan2>\n' )
    .demand( [ 'n', 's', 'c' ] )
    .argv,
  client, channels, chanCount = 0;

channels = args.c.split( ',' );
channels.forEach( function( c ) {
  channels[ chanCount ] = '#' + c.trim();
  chanCount++;
});

function loadPlugin( file ) {
  fs.readFile( file, function( err, data ) {
    if ( data ) {
      try {
        running_plugins[ file ] = eval( data.toString() );
      } catch( e ) {
        console.log( 'Syntax error in "' + file + '"\n' + e );
      }
    }
  });
}

function loadPlugins( dir ) {
  fs.readdir( plugins, function( err, files ) {
    var i,l = files.length, file;

    for ( i = 0; i < l; i++ ) {
      file = plugins + '/' + files[i];
      if ( file.indexOf( '~' ) === -1 ) {
        loadPlugin( file );
      }
    }
  });
}

loadPlugins( plugins );

fs.watch( plugins, function( e, file ) {
  loadPlugins( plugins );
});

function reply( to, from, resp ) {
  if ( resp ) {
    client.say( to, resp );
  }
}

function processMsg( o ) {
  var to, from, msg, i, resp;

  to = o.to;
  from = o.from;
  msg = o.msg;

  for ( i in running_plugins ) {
    if ( running_plugins.hasOwnProperty( i ) ) { 
      running_plugins[i]( args.n, to, from, msg, reply );
    }
  }
}

client = new irc.Client( args.s, args.n, { 
  channels: channels, 
  userName: args.n 
}); 

client.addListener( 'error', function( err ) {
  throw err;
});

client.addListener( 'message', function( from, to, msg ) {
  processMsg( { to: to, from: from, msg: msg } );
});

client.addListener( 'pm', function( from, msg ) {
  processMsg( { to: from, msg: args.n + ': ' + msg } );
});

client.addListener( 'invite', function( chan, from ) {
  channels.push( chan );
  client.join( chan, function() {
    console.log( 'joined ' + chan + ' because ' + from + ' invited me' );
  });
});
