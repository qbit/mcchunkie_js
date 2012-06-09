(function( botname, to, from, msg, store, cb ) {
	'use strict';
  var resp;
  msg = msg.trim();
	if ( msg === botname + ': thanks'  || msg === 'thanks ' + botname ) {
		resp = from + ', you are welcome!';
	}

  cb.call( null, to, from, resp );
});
