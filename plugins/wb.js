(function( botname, to, from, msg, store, cb ) {
	'use strict';
  var resp;
  msg = msg.trim();
	if ( msg === botname + ': wb'  || msg === 'wb ' + botname ) {
		resp = 'thanks ' + from + '!';
	}

  cb.call( null, to, from, resp );
});
