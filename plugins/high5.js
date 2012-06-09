(function( botname, to, from, msg, cb ) {
	'use strict';
  var resp;
	if ( msg === botname + ': o/'  || msg === 'o/ ' + botname ) {
		resp = '\\o';
	}
	if ( msg === botname + ': \\o'  || msg === '\\o ' + botname ) {
		resp = 'o/';
	}

  cb.call( null, to, from, resp );
});
