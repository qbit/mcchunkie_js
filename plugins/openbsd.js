(function( helper, to, from, msg, store, sh_store, cb ) {
	'use strict';
  var resp = '', parts, list, p;

  if ( helper.isRelevant( msg ) ) {
    if ( msg.match( /openbsd/i ) ) {
      msg = msg.replace( helper.botname, '' );
      msg = msg.replace( ':', '' );
      msg = msg.trim();

      parts = msg.split( ' ' ); 

      console.log( 'Parts: ', parts );

      // resp = ':( - hurry qbit! fix it!';
      if ( store[ parts[0] ] || sh_store[ parts[0] ] ) {
        p = parts[0];
        list = Object.keys( sh_store[ p ] ); 
        console.log( list );
      }
    }
  }
  cb.call( null, to, from, resp );
});
