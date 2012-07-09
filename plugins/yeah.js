(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp = "";
  if ( helper.isRelevant( msg ) ) {
    if ( msg.match( "CSI" ) ) {
      resp += "( •_•)\n"
      resp += "( •_•)>⌐■-■\n"
      resp += "(⌐■_■)"

    }
  }
  cb.call( null, to, from, resp );
});
