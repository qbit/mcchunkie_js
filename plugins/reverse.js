(function( botname, to, from, msg, storage, cb ) {
  // Plugin to reverse every msg that is passed in.
  console.log( msg.indexOf( botname ), msg.indexOf( 'reverse' ));
  if ( msg.indexOf( botname ) > -1 && msg.indexOf( 'reverse' ) > -1 ) {
    msg = msg.replace( botname, '' );
    msg = msg.replace( ':', '' );
    msg = msg.replace( 'reverse', '' );

    var resp = msg.split("").reverse().join("");
    cb.call( null, to, from, resp );
  }
});
