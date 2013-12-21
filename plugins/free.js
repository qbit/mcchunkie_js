// Desc: no one is as free as 'Merika!
(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp;
  if ( helper.isRelevant( msg ) ) {
  }

  if ( msg === 'freedom' ) {
    resp = 'MERIKA!';
  }

  cb.call( null, to, from, resp );
});
