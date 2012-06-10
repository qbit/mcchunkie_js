#!/usr/bin/env node

'use strict';
var irc = require( 'irc' ),
  fs = require( 'fs' ),
  http = require( 'http' ),
  url = require( 'url' ),
  drev = require( 'drev' ),
  helpers,
  plugins = __dirname + '/../plugins',
  messages = __dirname + '/../messages',
  running_plugins = {},
  running_messages = {},
  storage = {},
  args = require( 'optimist' )
    .usage( '$0 -n <nick> -s <server> -c <chan1>,<chan2>\n' )
    .demand( [ 'n', 's', 'c' ] )
    .argv,
  client, channels, chanCount = 0;

storage.shared = {};

drev.on( args.n, function( data ) {
  var o = data.toString().split( '^' ), i, l, value, msg;

  value = o[ o.length - 1 ];
  if ( running_messages[ o[0] ] ) {
    msg = running_messages[ o[0] ].message;
    for ( i = 1, l = o.length; i < l; i++ ) {
      msg = msg.replace( '$' + i, o[i] );
    //   if ( o.hasOwnProperty( i ) ) {
    //     storage.shared[i] = o[i];

    //     if ( running_messages[i] ) {
    //       m = running_messages[i];
    //       for ( a in o[i] ) {
    //         
    //       }
    //     }
    //   }
    }
  }

  console.log( msg );
  channels.forEach( function( c ) {
    client.say( c, msg );
  });

});

drev.start();

helpers = { 
  botname: args.n,
  rand: function( len ) {
    return Math.floor( Math.random() * len );
  },
  httpGet: function( u, cb ) {
    u = url.parse( u );
    http.get( u, function( res ) {
      var d = [];
      res.on( 'data', function( chunk ) {
        d.push( chunk );
      }).on( 'end', function() {
        cb.call( null, null, d.join() );
      });
    }).on( 'error', function( er ) {
      cb.call( null, er );
    });
  },
  isRelevant: function( msg ) {
    if ( msg.indexOf( this.botname ) > -1 ) {
      return true;
    }
    return false;
  }
};

channels = args.c.split( ',' );
channels.forEach( function( c ) {
  channels[ chanCount ] = '#' + c.trim();
  chanCount++;
});

function loadPlugin( file, ismsg ) {
  fs.readFile( file, function( err, data ) {
    var t, n;
    if ( data ) {
      try {
        if ( ismsg ) {
          t = eval( data.toString() );
          n = file.split( '/' );
          n = n[ n.length - 1 ];
          running_messages[ n ] = t();
        } else {
          running_plugins[ file ] = eval( data.toString() );
          storage[ file ] = {};
        }
      } catch( e ) {
        console.log( 'Syntax error in "' + file + '"\n' + e );
      }
    }
  });
}

function loadPlugins( dir, harsh ) {

  if ( harsh ) {
    running_plugins = {};
  } else {
    running_messages = {};
  }

  fs.readdir( dir, function( err, files ) {
    var i,l = files.length, file;

    for ( i = 0; i < l; i++ ) {
      file = dir + '/' + files[i];
      if ( file.indexOf( '~' ) === -1 ) {
        if ( harsh ) {
          if ( file.indexOf( '.js' ) > -1 ) {
            loadPlugin( file );
          }
        } else {
          loadPlugin( file, true );
        }
      }
    }
  });
}

loadPlugins( plugins, true );
loadPlugins( messages, false );

fs.watch( plugins, function( e, file ) {
  loadPlugins( plugins, true );
  loadPlugins( messages, false );
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
      running_plugins[i]( helpers, to, from, msg, storage[i], reply );
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
