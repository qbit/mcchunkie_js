// Desc: search leafly for types of weed (requires api key)
(function( helper, to, from, msg, store, sh_store, cb, proto ) {
  'use strict';
  var resp = '', url, i, l, index;

  index = function() {
    helper.httpGet( 'http://www.leafly.com/api/strains', {}, function( err, data ) {
      console.log( 'indexing weeds' );
      for ( i = 0, l = data.length; i < l; i++ ) {
        console.log( data[i].Name, data[i].Key );
        store.search.index( data[i].Name, data[i].Key );
      }
      console.log( "done indexing" );
    });
  }

  try {

    if ( ! store.url ) {
      url =  "http://www.leafly.com/api/details/";
    }

    if ( ! store.search ) {
      store.search = helper.reds.createSearch( 'weed' );
    }

    if ( ! store.updateInterval ) {
      store.updateInterval = setInterval(function() {
        //index();
        console.log( 'not really indexing' );
      }, 8640000 );
    }

    if ( ! store.get ) {
      store.get = function( url, to, from ) {
        helper.httpGet( url, {}, function( err, data ) {
          var result, name, cat, rate, effect, desc, url;
          resp = '';
          if ( data ) {
            try {
              result = JSON.parse( data );
            } catch( e ) {
              result = {};
              result.errorMessage = e;
            }
            if ( result.errorMessage ) {
              resp = result.errorMessage;
            }

            name = result.Name || '?';
            cat = result.Category || '?';
            rate = result.Rating || '?';
            effect = result.TopEffect || '?';
            desc = result.Abstract || ':(';

            resp += name;
            resp += ": ";
            resp += " ( Type: " + cat + ", Rating: " + rate + ", Effect: " + effect + " ) ";
            resp += " ";
            resp += desc;

            resp = resp.replace( /\s+/, ' ' );

            if ( to === helper.botname ) {
              to = from;
            }

            if ( name !== '?' ) {
              cb.call( null, to, from, resp, proto );
            }
          }
        });
      };
    }

    if ( msg.match( /^weed:/ ) ) {
      msg = msg.replace( /^weed:/, '' );
      msg = msg.replace( /^ /g, '' );
      msg = msg.replace( / $/g, '' );
      msg = msg.replace( / /g, '-' );
      msg = msg.toLowerCase();
      // url += msg;
      try { 
        store.search.query( msg ).end( function( err, ids ) {
          store.get( url += ids[0], to, from );
        });
      } catch( e ) {
        resp = "oh shit...";
        cb.call( null, to, from, resp, proto );
      }
    }
  } catch ( error ) {
    console.log( error );
  }
});
