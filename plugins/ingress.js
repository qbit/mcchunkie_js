(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp;

  if ( ! store.search ) {
    store.search = helper.reds.createSearch( 'pueblo_ingress' );
    store.geop = function( a ) {
      var b = [];

      b.push( parseInt( a[0] * 1E6, 10 ) );
      b.push( parseInt( a[1] * 1E6, 10 ) );

      return b;
    };
  }

  if ( msg.match( /^ingress:/ ) ) {
    msg = msg.replace( /^ingress:/, '' );
    msg = msg.replace( /^ /g, '' );
    msg = msg.replace( / $/g, '' );
    msg = msg.toLowerCase();
    // url += msg;
    try { 
      store.search.query( msg ).end( function( err, geo ) {
        var g;
        if ( err ) {
          resp = "something bad happened!";
        } else {
          if ( geo.length > 0 ) {
            if ( geo.length > 1 ) {
              resp = "found X portals, can you be more specific?".replace( 'X', geo.length );
            } else {
              g = JSON.parse( geo );

              if ( g && g.coordinates ) { 

                g.coordinates = store.geop( g.coordinates );

                // http://www.ingress.com/intel?latE6=38263566&lngE6=-104617108&z=19
                resp = 'http://www.ingress.com/intel?latE6=' + g.coordinates[1];
                resp += '&lngE6=' + g.coordinates[0] + '&z=19';

              }
            }
          } else {
            resp = "nothing found.";
          }
        }
        cb.call( null, to, from, resp );
      });

    } catch ( err ) {
      console.log( err );
    }
  }

});
