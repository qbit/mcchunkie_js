(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp;

  if ( helper.isRelevant( msg ) ) {
    if ( msg == helper.botname + ": toggle e" ) {
      store.doit = !store.doit;
    }
  }

  msg = msg.toUpperCase();
  msg = msg.replace(/[AEIOUY]r(?! )/g, 'E');
  msg = msg.replace(/AA/g, 'A');
  msg = msg.replace(/EE/g, 'E');
  msg = msg.replace(/II/g, 'I');
  msg = msg.replace(/OO/g, 'O');
  msg = msg.replace(/UU/g, 'U');
  msg = msg.replace(/YY/g, 'Y');
  msg = msg.replace(/[AEIOUY]{2,}/g, 'E');
  msg = msg.replace(/[AEIOUY](?! )/g, 'ER');
  msg = msg.replace(/[Y]/g, 'ER');
  msg = msg.replace(/ERH/g, 'ER');
  msg = msg.replace(/ERR/g, 'ER');
  msg = msg.replace(/MER/g, 'MAH');

  if ( store.doit ) {
    resp = msg;
  }

  cb.call( null, to, from, resp );
});
