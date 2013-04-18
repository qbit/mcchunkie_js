(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';

  from = from || to;
  var resp = ''; 
  if ( ! store.db ) {
    helper.sqlite.verbose();
    store.db = new helper.sqlite.Database( '/usr/local/share/sqlports' );
    store.query = "select count(*) as num from ports where maintainer like ?";
  }

  var a, p;
  if ( msg.match( /^howmany: / ) ) {
    msg = msg.replace( /^howmany: /, '' );
    p = store.db.prepare( store.query );

    p.get( [ "%" + msg + "%" ], function( err, row ) {
      if ( !err ) {
        cb.call( null, to, from, msg + ' has ' + row.num + ' ports.' );
      }
    });
  }
});
