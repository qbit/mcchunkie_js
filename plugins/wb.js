(function( botname, to, from, msg, cb ) {
	'use strict';
  var resp;
  msg = msg.trim();
  console.log( botname + ': wb' );
	if ( msg === botname + ': wb'  || msg === 'wb ' + botname ) {
		resp = 'shanks ' + from + '!';
	}

  cb.call( null, to, from, resp );
});
