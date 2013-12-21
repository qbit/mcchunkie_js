// Desc: translate strings to punycode
(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp;

  if ( ! store.puny ) { 
    store.puny = require( 'punycode' );
  }

  if ( msg.match( /^puny:/ ) ) {
    msg = msg.replace( /^puny:/, '' );

    resp = store.puny.decode( msg.toString() );
  }

  if ( msg === helper.botname + ': help' ) {
  }

  cb.call( null, to, from, resp );
});
