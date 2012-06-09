(function( helper, to, from, msg, store, cb ) {
	'use strict';
  var resp;
  if ( helper.isRelevant( msg ) ) {
    msg = msg.trim();
    if ( msg ===helper. botname + ': wb'  || msg === 'wb ' + helper.botname ) {
      resp = 'thanks ' + from + '!';
    }
  }

  cb.call( null, to, from, resp );
});
