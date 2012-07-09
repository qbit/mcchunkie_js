(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp;
  if ( helper.isRelevant( msg ) ) {
    if ( msg.match( 'version' ) ) {
      resp = "I am running on Node.JS " + process.version + ' on ' + process.platform + '.';
    }
  }
  cb.call( null, to, from, resp );
});
