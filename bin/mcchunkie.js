#!/usr/bin/env node

'use strict';
var irc = require( 'irc' ),
  fs = require( 'fs' ),
  http = require( 'http' ),
  https = require( 'https' ),
  url = require( 'url' ),
  nconf = require( 'nconf' ),
  redis = require( 'redis' ),
  rclient = redis.createClient(),
  pushover = require( 'pushover-notifications' ),
  helpers,
  plugins = __dirname + '/../plugins',
  messages = __dirname + '/../messages',
  storage_file = __dirname + '/../shared_storage.json',
  running_plugins = {},
  running_messages = {},
  storage = {},
  args = require( 'optimist' )
    .usage( '$0 -n <nick> -s <server> -c <chan1>,<chan2>\n' )
    .demand( [ 'n', 's', 'c' ] )
    .argv,
  client, channels, chanCount = 0,
  tokens = {};

nconf.file( { file: storage_file } );

fs.stat( 'api_keys.json', function( err, data ) {
  if ( err ) {
    throw err;
  }
  fs.readFile( 'api_keys.json', function( err, data ) {
    tokens = JSON.parse( data );
  });
});

function loadStorage( fn ) {
  storage.shared = {};
  fs.readFile( storage_file, function (err, data) {
    if ( data ) {
      storage.shared = JSON.parse( data.toString() );
      if ( fn ) { 
        fn.call();
      }
    }
  });
}

loadStorage();

rclient.on( 'message', function( channel, data ) {
  var o = data.toString().split( '^' ), i, l, value, msg, str;

  value = o[ o.length - 1 ];

  str = data.toString()
    .replace( value, '' )
    .replace( /\^/g, ':' )
    .trim()
    .replace( /:$/, '' );

  if ( ! str.match( 'mcchat' ) ) {  
    nconf.set( str + ':date', value );
  }
  nconf.save( function() {
    loadStorage( function() {
      if ( running_messages[ o[0] ] ) {
        msg = running_messages[ o[0] ].message;
        for ( i = 1, l = o.length; i < l; i++ ) {
          msg = msg.replace( '$' + i, o[i] );
        }
      }

      channels.forEach( function( c ) {
        client.say( c, msg );
      });
    });
  });
});

rclient.subscribe( args.n );

helpers = { 
  botname: args.n,
  rand: function( len ) {
    return Math.floor( Math.random() * len );
  },
  pushover: new pushover({
    token: tokens.pushover
  }),
  pHolder: function( str, array ) {
    // lol - PHOLDER!
    var i, l = array.length; 
    for ( i = 0; i < l; i++ ) {
      str = str.replace( '$' + parseInt( i + 1, 10 ), array[i] );
    }
    return str;
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
  reds: require( 'reds' ),
  classifier: require( 'classifier' ),
  sqlite: require( 'sqlite3' ),
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
        n = file.split( '/' );
        n = n[ n.length - 1 ];
        if ( ismsg ) {
          t = eval( data.toString() );
          running_messages[ n ] = t();
        } else {
          running_plugins[ n ] = eval( data.toString() );
          storage[ n ] = {};
          if ( tokens[ n ] ) {
            storage[ n ].token = tokens[ n ];
          }
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
      try { 
        running_plugins[i]( helpers, to, from, msg, storage[i], storage.shared, reply );
      } catch( e ) {
        console.log( "Error running '" + i + "'\n" + e );
      }
    }
  }
}

client = new irc.Client( args.s, args.n, { 
  channels: channels, 
  debug: false,
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
