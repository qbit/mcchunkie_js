mcchunkie
=========

Home for the new mcchunkie - now with 100% moar chunk

Plugins
=======

Plugins should be javascript functions wrapped in (); and should take
six args: botname, to, from, msg, store and callback.

The callback should be passed null, to, from, and resp.

Example:

````javascript
(function( botname, to, from, msg, store, cb ) {
  // Plugin to reverse every msg that is passed in.
  var resp = msg.split("").reverse().join("");

  // do something awesome with storage here..

  // do some more manip of the msg here

  cb.call( null, to, from, resp );
});
````
