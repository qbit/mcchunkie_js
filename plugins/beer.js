// Desc: query brewerydb for delicious delicious beer
(function( helper, to, from, msg, store, sh_store, cb, proto ) {
  'use strict';
  var resp, url;

  try {

    if ( ! store.url ) {
      url =  "http://api.brewerydb.com/v2/search?key=" + store.token + "&withBreweries=Y&type=beer";
    }

    // TODO get glass info and store it .. or make a second request to get
    // glass data

    if ( ! store.get ) {
      store.get = function( url, to, from ) {
        helper.httpGet( url, {}, function( err, data ) {
          var result, resp, name, abv, ibu, desc, year, bname, url;
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

            if ( result.status === 'success'  && result.data ) {
              // if ( result.data.length > 1 ) {
              //   console.log( result );
              //   resp = 'can you be more specific?';
              // } else {
                resp = '';

                name = result.data[0].name;
                abv = result.data[0].abv || '?';
                ibu = result.data[0].ibu || '?';
                desc = result.data[0].description || ':(';

                if ( result.data[0].breweries ) {
                  year = result.data[0].breweries[0].established || "?";
                  bname = result.data[0].breweries[0].name || "?";
                  url = result.data[0].breweries[0].website || "?"; 
                  resp += bname + ' (' + year + ' : ' + url + ' ) ';
                }
                resp += name;
                resp += ' ( ABV: ' + abv + ' IBU: ' + ibu + ' ) - ';
                resp += desc
                  .replace( /\n/, ' ' )
                  .replace( /\n/g, '' )
                  .replace( /\r/g, '' );
              // }
            }

            if ( to === helper.botname ) {
              to = from;
            }
            cb.call( null, to, from, resp, proto );
          }
        });
      };
    }

    if ( msg.match( /^beer:/ ) ) {
      msg = msg.replace( /^beer:/, '' );
	msg = msg.replace(/^\//, "");
      url += "&q=" + msg;
      try { 
        store.get( url, to, from );
      } catch( e ) {
        resp = "oh shit...";
        cb.call( null, to, from, resp, proto );
      }
    }
  } catch ( e ) {
    console.log( e );
  }
});
