// Desc: translate text to pigpen
(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp, i;

  if ( ! store.chars ) {
    store.chars = { 
      b: '␣',
      c: '∟',
      e: '☐',
      n: '☒'
    };
  }

  if ( msg.match( /^pigpen: / ) ) {
    msg = msg.replace( /^pigpen: /, '' );
    for ( i in store.chars ) {
      if ( store.chars.hasOwnProperty( i ) ) {
        msg = msg.replace( new RegExp(i, "g"), store.chars[i] );
      }
    }
    resp = msg;
    console.log( msg );
  }

  cb.call( null, to, from, resp );
});
