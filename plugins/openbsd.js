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

      console.log( 'Parts: ', parts );

      cat = parts[1];
      scat = parts[2];

      // resp = ':( - hurry qbit! fix it!';
      s = store.openbsd || sh_store.openbsd;

      console.log( 'cat: %s, scat: %s', cat, scat );

      if ( s[cat] ) {
        // showing packages or sets for all
        for ( a in s[cat] ) {
          if ( s[cat][a] ) {
            console.log( 1, a, cat, s[cat][a] );
            resp.push( a, ':', s[cat][a].date + '.' );
          }
        }
      } else {
        if ( s[scat] ) {
          if ( s[scat][cat] ) {
            for ( a in s[scat][cat] ) {
              console.log( 2, a, cat, s[scat][cat][a] );
              resp.push( cat, ':', s[scat][cat][a] + '.' );
            }
          }
        } else {
          for ( a in s ) {
            for( b in s[a] ) {
              // if ( b === cat ) {
                // console.log( b, a, s[a][b] );
                // resp.push( b, a, '=>',  s[a][b].date + '.' );
              // } else {
                resp.push( b, a, '=>',  s[a][b].date + '. \n' );
              // }
            }
          }
        }
      }
    }
  }
  cb.call( null, to, from, resp.join( ' ' ).toString() );
});
