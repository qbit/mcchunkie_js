(function( helper, to, from, msg, store, sh_store, cb ) {
	'use strict';
  var resp;
  if ( helper.isRelevant( msg ) ) {
    msg = msg.trim();
    if ( msg === helper.botname + ': thanks'  || 
      msg === 'thanks ' + helper.botname ) {
      resp = from + ', you are welcome!';
    }
  }

  cb.call( null, to, from, resp );
});
