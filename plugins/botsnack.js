(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var snacks = [
    'omm nom nom nom',
    '*puke*',
    'MOAR!',
    '=.='
  ];
  var resp = "";
  if ( helper.isRelevant( msg ) ) {
    if ( msg.match( 'botsnack' ) ) {
      resp = snacks[ helper.rand( snacks.length ) ];
    }
  }
  cb.call( null, to, from, resp );
});
