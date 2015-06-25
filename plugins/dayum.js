// Desc: Daaayum Daaayyyyuuummm DAAAAAAYYYYUUUUMMMMMMMM
(function( helper, to, from, msg, store, sh_store, cb, proto ) {
  'use strict';
  var resp;

  if ( msg.match( /cheese burger/i ) ) {
    resp = "Dayum DAYum DAAAAAYUUUUUMMMMM!!!!";
  }
  if ( msg.match( /5 guys/i ) ) {
    resp = "Dayum DAYum DAAAAAYUUUUUMMMMM!!!!";
  }

  cb.call( null, to, from, resp, proto );
});
