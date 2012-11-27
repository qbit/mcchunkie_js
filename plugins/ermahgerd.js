(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp;

  if ( ! store.ermg ) {
    store.ermg = function( s ) {
      s = s.toUpperCase();
      s = s.replace(/[AEIOUY]r(?! )/g, 'E');
      s = s.replace(/AA/g, 'A');
      s = s.replace(/EE/g, 'E');
      s = s.replace(/II/g, 'I');
      s = s.replace(/OO/g, 'O');
      s = s.replace(/UU/g, 'U');
      s = s.replace(/YY/g, 'Y');
      s = s.replace(/[AEIOUY]{2,}/g, 'E');
      s = s.replace(/[AEIOUY](?! )/g, 'ER');
      s = s.replace(/[Y]/g, 'ER');
      s = s.replace(/ERH/g, 'ER');
      s = s.replace(/ERR/g, 'ER');
      s = s.replace(/MER/g, 'MAH');

      return s;
    }
  }

  if ( helper.isRelevant( msg ) ) {
    if ( msg == helper.botname + ": toggle e" ) {
      store.doit = !store.doit;
      if ( store.doit ) {
        //resp = store.ermg( 'doing it!' );
        resp = 'Not doing it out of <3 for lteo';
      }
      cb.call( null, to, from, resp );
      return;
    }
  }

  if ( store.doit ) {
    //resp = store.ermg( msg );
  }

  cb.call( null, to, from, resp );
});
