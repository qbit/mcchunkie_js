(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp = '', url;

  try {

    if ( ! store.url ) {
      url =  "http://www.leafly.com/api/details/";
    }

    // TODO get strain info and store it .. cross ref the msg with the
    // store.

    if ( ! store.get ) {
      store.get = function( url, to, from ) {
        helper.httpGet( url, function( err, data ) {
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

            cb.call( null, to, from, resp );
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
      url += msg;
      try { 
        store.get( url, to, from );
      } catch( e ) {
        resp = "oh shit...";
        cb.call( null, to, from, resp );
      }
    }
  } catch ( error ) {
    console.log( error );
  }
});
