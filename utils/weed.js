var reds = require( 'reds'),
http = require( 'http' ),
url = require( 'url' ),
search = reds.createSearch( 'weed' ), i, l, data = [];

// Loads leafly data in to redis fti

http.get( url.parse( 'http://www.leafly.com/api/strains' ), function( res ) {
  res.on( 'data', function( chunk ) {
    data.push( chunk );
  });

  res.on( 'end', function() {
    data = JSON.parse( data.join( '' ).toString() );
    console.log( data.length );
    for ( i = 0, l = data.length; i < l; i++ ) {
      if ( i < 5 ) {
        console.log( data[i].Name, data[i].Key );
      }

      search.index( data[i].Name, data[i].Key );
    }
    process.exit(0);
  });
});
