(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp = '', urls, i, l;

  if ( ! store.search ) {
    store.search = helper.reds.createSearch( 'urlcache' );
    store.url = require( 'url' );
  }

  if ( ! helper.isRelevant( msg ) && from !== helper.botname  ) {
    urls = msg.match( /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi );

    if ( urls && urls[0] ) {
      http.get( store.url.parse( urls[0] ), function( res ) {
        var data = [];

        res.on( 'data', function( chunk ) {
          data.push( chunk );
          if ( chunk.toString().match( /<\/title>/i ) || data.length > 2 ) {
            res.destroy();
            return;
          }
        });

        res.on( 'end', function( ) {
          var s = data.join()
            .toString()
            .replace( /\n/g, ' ' )
            .replace( /\r/g, ' ' ), m;

          m = s.match( /<title>(.*)<\/title>/i );

          if ( m ) {
            store.search.index( m, urls[0] );
          }

        });
      });
    }
  }

  if ( msg.match( /^search:/ ) ) {
    msg = msg.replace( /^search:/, '' );
    store.search.query( msg ) .end( function(err, ids){
      var ii, il;
      for ( ii = 0, il = ids.length; ii < il; ii++ ) {
        resp += ids[ii] + ' | ';
      }

      resp = resp.replace( / \| $/, '' );
      to = to || from;
      cb.call( null, to, from, resp );
    });
  }
});
