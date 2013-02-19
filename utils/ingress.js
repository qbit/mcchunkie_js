var reds = require( 'reds'),
fs = require( 'fs' ),
url = require( 'url' ),
search = reds.createSearch( 'pueblo_ingress' ), i, l, data = [];

fs.readFile( 'ColoradoPortals.js', function( err, data ) {
  data = JSON.parse( data );
  for ( i = 0, l = data.length; i < l; i++ ) {
    if ( i < 5 ) {
      console.log( data[i] );
    }

    // search.index( data[i].Name, JSON.stringify( data[i].geometry ) );
    search.index( data[i].properties.Name, JSON.stringify( data[i].geometry ) );
  }
  process.exit(0);
});
