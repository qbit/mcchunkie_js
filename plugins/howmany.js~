// Desc: query openbsd ports for maintainer count info
(function( helper, to, from, msg, store, sh_store, cb, proto ) {
  'use strict';

  if (os.type() !== 'OpenBSD') {
	  return;
  }

        if (msg.match(/^\/help$|^help:$/)) {
                if (proto === 'telegram') {
                        resp = "/howmany [openbsd developer short name] - Returns how many ports a given OpenBSD developer maintaines.";
                } else {
                        resp = "howmany: [openbsd developer short name] - Returns how many ports a given OpenBSD developer maintaines.";
                }

                cb.call(null, to, from, resp, proto);
                return;
        }


  from = from || to;
  var resp = ''; 
  if ( ! store.db ) {
    helper.sqlite.verbose();
    store.map = {
	mordac: 'Eric Lalonde',
	qbit: 'abieber'
	};
    store.db = new helper.sqlite.Database( '/usr/local/share/sqlports' );
    store.query = "select count(distinct pkgname) as num from ports where maintainer like ?";
    store.query_most = "select maintainer as maintainer, count(*) as num from ports where maintainer <> 'The OpenBSD ports mailing-list <ports@openbsd.org>' group by maintainer order by count(*) desc limit 1";
  }

  var a, p;
  if ( msg.match( /^mostports:$|^\/mostports / ) ) {
    p = store.db.prepare( store.query_most );

    p.get( [ ], function( err, row ) {
      if ( !err ) {
        console.log( row );
        cb.call( null, to, from, row.maintainer + ' has the most ports (' + row.num + ').' );
      }
    });
  }
  if ( msg.match( /^howmany: |^\/howmany / ) ) {
    msg = msg.replace( /^howmany: /, '' );
    msg = msg.replace( /^\/howmany /, '' );
    p = store.db.prepare( store.query );

    if (store.map[msg]) {
	msg = store.map[msg];
    }

    p.get( [ "%" + msg + "%" ], function( err, row ) {
      if ( !err ) {
        cb.call( null, to, from, msg + ' has ' + row.num + ' ports.', proto );
      }
    });
  }
});
