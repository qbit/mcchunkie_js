(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp;

  if ( msg.match(/i got my mojo working/i) ) {
	  setTimeout(function() {
		  resp = 'I GOT MY MOJO WORKING!';
		  cb.call( null, to, from, resp );
	  },3000);
  }
});
