(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp;
  if ( msg.match(/node\.js/i)) {
    resp = '.data\n';
    resp += "hello_message db 'BARE METAL!!',0dh,0ah,'$'";
  }

  cb.call( null, to, from, resp );
});
