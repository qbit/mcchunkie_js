(function( helper, to, from, msg, store, sh_store, cb ) {
	'use strict';

  String.prototype.ucFirst = function() {
    return this.charAt(0).toUpperCase() + this.substr(1);
  };

  var resp = [], parts, list, p, cat, scat, s, a,b,c,d;

  if ( helper.isRelevant( msg ) ) {
    if ( msg.match( /openbsd/i ) ) {
      msg = msg.replace( helper.botname, '' );
      msg = msg.replace( ':', '' );
      msg = msg.trim();

      parts = msg.split( ' ' ); 

      cat = parts[1];
      scat = parts[2];

      s = store.openbsd || sh_store.openbsd;

      if ( s[cat] && ! scat ) {
        for ( a in s[cat] ) {
          resp.push( a, '=>', s[cat][a].date + '.' );
        }
      } else if( s[cat] && scat ) {
        resp.push( scat, '=>', s[cat][scat].date + '.' );
      } else {
        if ( ! cat ) {
          for ( cat in s ) {
            for ( a in s[cat] ) {
                resp.push( cat, a, '=>', s[cat][a].date + '.' );
            }
            resp.push( '\n' );
          }
        } else {
          for ( c in s ) {
            if ( c.length === cat.length ) {
              resp.push( "did you mean '" + c + "'?" );
            }
          }
          if ( resp.length === 0 ) {
            resp.push( 'not sure what that is..' );
          }
        }
      }
    }
  }

  cb.call( null, to, from, resp.join( ' ' ).toString() );
});
