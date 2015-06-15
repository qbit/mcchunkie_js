// Desc: print version information
(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp;

  if ( ! 'asdf'.ucFirst ) {
    String.prototype.ucFirst = function() {
      return this.charAt(0).toUpperCase() + this.substr(1);
    };
    if ( ! os ) {
      os = require('os');
    }
    
  }

  if ( helper.isRelevant( msg ) ) {
    if ( msg.match( ' version$' ) ) {
      resp = "I am running on Node.JS " + process.version + ' on ' + process.platform.ucFirst().replace( 'bsd', 'BSD' ) + ' ' + os.release() + '.';
    }
  }
  cb.call( null, to, from, resp );
});
