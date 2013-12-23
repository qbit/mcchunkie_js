// Desc: reverse a string
(function( helpers, to, from, msg, storage, sh_store, cb ) {
  // Plugin to reverse every msg that is passed in.
  'use strict';
  if ( helpers.isRelevant( msg ) && msg.indexOf( 'reverse' ) > -1 ) {
    msg = msg.replace( helpers.botname, '' );
    msg = msg.replace( ':', '' );
    msg = msg.replace( 'reverse', '' );

    var resp = msg.split("").reverse().join("");
    cb.call( null, to, from, resp );
  }
});
