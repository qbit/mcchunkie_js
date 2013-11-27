(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp = '', urls, i, l;

  if ( ! store.nude ) {
    store.nude = require('nude');
    store.nude_res_handler = function( t, f, callback ) {
	    return function( res ) {
		console.log(res);
		resp = (res) ? "NSFW" : "SFW";
		callback.call( null, t, f, resp );
	    };
    };
    store.nude_check = function(t, f, url, callback) {
	    store.nude.scanURL(url, store.nude_res_handler(t, f, callback));
    };
  }

  if ( msg.match( /\.jpg|\.jpeg|\.png|\.gif/i ) ) {

	  urls = msg.match( /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi );

	  if (urls) {
	      for(i = 0, l = urls.length; i < l; i++) {
		      store.nude_check(to, from, urls[i], cb);
	      }
	  }
  }
});
