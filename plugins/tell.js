// Desc: tell $person $msg next time you see them
(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp, i, a = [], msgto, msgfrm, rest;

  if ( ! store.msgs ) {
    store.msgs = {};
  }

  if ( msg.match( helper.botname + ': tell ' ) ) {

    msg = msg.replace( helper.botname + ': tell ', '' );
    a = msg.split( ' ' );

    msgto = a.shift();
    rest = a.join( ' ' );

    store.msgs[msgto] = from + ':' + rest;

    console.log( store.msgs );

    resp = "I will tell " + msgto + " next time I see them!";

    cb.call( null, to, from, resp );
  } else {
    for ( i in store.msgs ) {
      console.log( i, from );
      if ( i === from ) {

        resp = store.msgs[i];
        msgfrm = resp.split( /:/ )[0];
        resp = i + ', ' + msgfrm + ' says: ' + resp.replace( /^.*:/, '' );
        // to = i;

        delete store.msgs[i];
        cb.call( null, to, from, resp );
      }
    }
  }

  // cb.call( null, to, from, resp );
});
