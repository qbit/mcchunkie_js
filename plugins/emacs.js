// Desc: we are emacs!
(function( helper, to, from, msg, store, sh_store, cb, proto ) {
  'use strict';
  var resp;

  if ( msg === helper.botname + ': are you emacs?' ) {
    resp = "brah, duh brah."
  }

  cb.call( null, to, from, resp, proto );
});
