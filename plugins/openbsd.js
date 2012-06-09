(function( helper, to, from, msg, store, cb ) {
	'use strict';
  var resp = '', parts, category, subcat, i, f, count = 0, c, teststore;
  /*
  teststore = {
    openbsd: {
      i386: {
        packages: new Date(),
        snapshots: new Date()
      },
      amd64: {
        packages: new Date(),
        snapshots: new Date()
      }
    }
  };

  store = teststore;
  */

  if ( helper.isRelevant( msg ) ) {
    if ( msg.match( /openbsd/i ) ) {
      msg = msg.replace( helper.botname, '' );
      msg = msg.replace( ':', '' );
      msg = msg.trim();

      parts = msg.split( ' ' ); 

      category = parts[0];
      subcat = parts[1];

      if ( ! store[ category ] ) {
        resp = "Sorry "+ from +', I am not currently monitoring '+parts[0]+'.';
      } else {
        if( subcat && store[ category ][ subcat ] ) {
          for ( i in store[category][subcat] ) {
            c = store[category][subcat][i];
            if ( count === 0 ) {
              resp += i + ': ' + c;
            } else {
              resp += ', ' + i + ': ' + c;
            }
            count++;
          }
        } else {
          for ( i in store[category] ) {
            c = store[category][i];
            count = 0;
            for ( f in c ) {
              if ( count === 0 ) {
                resp += i + ' -> ' + f + ': ' + c[f];
              } else {
                resp += ', ' + f + ': ' + c[f];
              }
              count++;
            }
            resp += "\n";
          }
        }
      }
    }
  }
  cb.call( null, to, from, resp );
});
