// Desc: respond to high5's
(function( helper, to, from, msg, store, sh_store, cb, proto ) {
	'use strict';
  var resp;
  if ( helper.isRelevant( msg ) ) { 
    msg = msg.trim();
    if ( msg === helper.botname + ': o/'  || msg === 'o/ ' + helper.botname ) {
      resp = '\\o';
    }
    if ( msg === helper.botname + ': \\o'  || msg === '\\o ' + helper.botname ) {
      resp = 'o/';
    }
  }

  cb.call( null, to, from, resp, proto );
});
