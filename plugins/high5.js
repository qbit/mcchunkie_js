(function( botname, to, from, msg, store, cb ) {
	'use strict';
  var resp;
  msg = msg.trim();
	if ( msg === botname + ': o/'  || msg === 'o/ ' + botname ) {
		resp = '\\o';
	}
	if ( msg === botname + ': \\o'  || msg === '\\o ' + botname ) {
		resp = 'o/';
	}

  cb.call( null, to, from, resp );
});
