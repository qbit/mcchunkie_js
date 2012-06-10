(function( helper, to, from, msg, store, sh_store, cb ) {
	'use strict';
  var resp = '', parts, category, subcat, i, f, count = 0, c, teststore, o;
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

      if ( ! store[ category ] && ! sh_store[ category ] ) {
        resp = "Sorry "+ from +', I am not currently monitoring '+parts[0]+'.';
      } else {
        o = store[ category ] || sh_store[ category ];
        console.log( o );
        if( subcat && o[ subcat ] ) {
          for ( i in o[subcat] ) {
            c = o[subcat][i];
            if ( count === 0 ) {
              resp += i + ': ' + c.date;
            } else {
              resp += ', ' + i + ': ' + c.date;
            }
            count++;
          }
        } else {
          for ( i in o ) {
            c = o[i];
            count = 0;
            for ( f in c ) {
              if ( count === 0 ) {
                resp += f + ' -> ' + i + ': ' + c[f].date;
              } else {
                resp += ', ' + i + ': ' + c[f].date;
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
