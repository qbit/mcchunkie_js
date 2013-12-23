// Desc: HEY LOOK!!!!! AHHHHHHHH!
(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp;

  if ( msg.match( / navi /i ) ) {
    resp = "DIAF NAVI!!!";
  }

  cb.call( null, to, from, resp );
});
