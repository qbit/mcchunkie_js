// Desc: once a table has been fliped, politely put it back
(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp;

  if ( msg.match( /@tableflip/ ) ) {
    resp = '┬──┬﻿ ¯\_(ツ)';
  }

  setTimeout( function() {
    cb.call( null, to, from, resp );
  }, Math.ceil( Math.random( ) * 10000 ) );
});
