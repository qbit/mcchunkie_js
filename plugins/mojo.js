// Desc: I got my mojo workin!
(function( helper, to, from, msg, store, sh_store, cb, proto ) {
	'use strict';
	var resp;

	if ( msg.match(/i got my mojo working/i) ) {
		setTimeout(function() {
			resp = 'I GOT MY MOJO WORKING!';
			cb.call( null, to, from, resp, proto );
	  	},3000);
	}
});
