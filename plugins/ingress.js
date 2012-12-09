(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp;

  if ( ! store.url ) {
    store.url = "http://www.enlightened.co/";

    store.e = '';
    store.r = '';

    store.getData = function() {
      var data = [];
      http.get( store.url, function( res ) {
        if ( res.statusCode === 200 ) {
          res.on( 'data', function( chunk ) {
            data.push( chunk );
          });
          res.on( 'end', function() {
            var d = data.join( '' ).toString(), a, i, l, r;
            a = d.split( /\n/ );
            for ( i = 0, l = a.length; i < l; i++ ) {
              if ( a[i].match( /#06D502|#00A2FF/i ) ) {
                if ( a[i].length > 27 ) {
                  r = a[i].match( /\d+,\d+,\d+/g );
                  store.e = r[0];
                  store.r = r[1];
                }
              }
            }
          });
        }
      });
    };

    store.getData();
    store.timer = setInterval( function() {
      store.getData();
      client.send( 'TOPIC', '#pueblo-ingress', 'All things Ingress for the Pueblo Colorado region | http://niantic.schlarp.com/ | http://ingress.com/intel | Enlightened: ' + store.e + ' Resistance: ' + store.r );
    }, 10800000 );
  }

  if ( msg.match( /^ingress:$/ ) ) {
    resp = 'Currently Enlightened is at ' + store.e + ' and Resistance is at ' + store.r + '.';
  }

  cb.call( null, to, from, resp );
});
