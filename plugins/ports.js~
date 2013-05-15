(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';

  from = from || to;
  var resp = '', db = new helper.sqlite.Database( '/usr/local/share/sqlports' ),
  cmd, action, query,
  queries = {
    help: {
      h: 'Port searching options are ( results are limited to 3 ):'
    },
    search: { 
      q: "select fullpkgpath, comment, homepage from ports where fullpkgpath like '%$1%' limit 3",
      h: "Search for a port name ( displays pkgpath, comment and homepage"
    },
    desc: {
      q: "select fullpkgpath, value from descr where fullpkgpath like '%$1%' limit 3",
      h: "Search for a ports description"
    },
    flavors: {
      q: "select fullpkgpath, value from pseudoflavors where fullpkgpath like '%$1%' limit 3",
      h: "Show the flavors a port will build for."
    },
    arch: {
      q: "select fullpkgpath, value from onlyforarch where fullpkgpath like '%$1%' limit 3",
      h: "Show the arches for a port."
    }
  };

  if ( msg.match( /^\~ports/ ) ) {
    cmd = msg.split( ' ' );
    action = cmd[ 1 ];

    if ( queries[ action ] ) {
      if ( action === 'help' ) {
        var hi, hc = 0;
        for ( hi in queries ) {
          if ( hc === 0 ) {
            resp = queries.help.h + '\n';
          } else {
            if ( hi !== 'help' ) {
              resp += hi + ': ' + queries[hi].h + '\n';
            }
          }
          hc++;
        }
        cb.call( null, from, to, resp );
      } else {
        query = helper.pHolder( queries[ action ].q, [ cmd[ 2 ] ] );
        db.all( query, function( err, rows ) {
          if ( err ) {
            console.log( err );
          }
          if ( rows ) {
            rows.forEach( function( row ) {
              var a, count = 0;
              for ( a in row ) {
                if ( row.hasOwnProperty( a ) ) {
                  if ( row[a] ) {
                    if ( count === 0 ) {
                      resp += row[a] + ' ';
                    } else {
                      resp += ' | '  + row[a].replace( /\n/g, ' ' );
                    }
                  }
                }
                count++;
              }
            });
            cb.call( null, to, from, resp.replace( /\n/g, ' ' ).trim() );
          } else {
            resp = "Sorry, nothing found for '" + cmd[ 2 ] + "'";
          }
        });
      }
    } else {
      resp = "Sorry " + from + ", I don't know how to '" + action + "'.";
      cb.call( null, to, from, resp );
    }
  }

});
