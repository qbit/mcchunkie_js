mcchunkie
=========

Home for the new mcchunkie - now with 100% moar chunk

Plugins
=======

Plugins should be javascript functions wrapped in (); and should take
five args: botname, to, from, msg and callback.

The callback should be passed null, to, from, and resp.

Example:

'''
(function( botname, to, from, msg, cb ) {
  // Plugin to reverse every msg that is passed in.
  var resp = msg.split("").reverse().join("");
  cb.call( null, to, from, resp );
});
'''
