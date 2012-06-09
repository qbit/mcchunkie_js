(function( botname, to, from, msg, storage, cb ) {
  // Plugin to reverse every msg that is passed in.
  var resp = msg.split("").reverse().join("");
  cb.call( null, to, from, resp );
});
