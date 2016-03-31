// Desc: return random protips
(function(helper, to, from, msg, store, sh_store, cb, proto) {
  'use strict';
  var resp;

  if (!store.rclient) {
	  store.rclient = redis.createClient();
	  store.authed = false;
	  if (process.env.REDIS_PASS) {
		  store.rclient.auth(process.env.REDIS_PASS, function() {
			  store.authed = true;
			  console.log('protip authed');
		  });
	  } else {
		  store.authed = true;
	  }
  }

  if (msg.match(/^\/[pb]rotip\?|^brotip\?|^protip\?|^pro-tip\?/i)) {
      if (store.authed) {
	  store.rclient.llrange('l_protips', function(e, max) {
	      var idx = helper.rand(parseInt(Math.ceil(max), 10));
	      store.rclient.lindex(idx, 'l_protips', function(e, d) {
		  store.rclient.hget('protip_votes', idx, function(e, count) {
		      d = "(" + count + ") " + d;
		      cb.call(null, to, from, d, proto);
		  });
	      });
	  });
      }
  }

    if (msg.match(/^\/[pb]rotip:|^brotip:|^protip:|^pro-tip:/i )) {
	if (store.authed) {
	    msg = msg.replace(/\/[pb]rotip|^brotip: |^protip: |^pro-tip: /i, '');
	    store.rclient.rpush('l_protips', msg);
	}
    }
});
