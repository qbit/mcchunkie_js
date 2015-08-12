// Desc: return random snapplefacts
(function(helper, to, from, msg, store, sh_store, cb, proto) {
  'use strict';
  var resp;

  if (!store.rclient) {
	  store.rclient = redis.createClient();
	  store.authed = false;
	  if (process.env.REDIS_PASS) {
		  store.rclient.auth(process.env.REDIS_PASS, function() {
			  store.authed = true;
			  console.log('snapplefact authed');
		  });
	  } else {
		  store.authed = true;
	  }
  }

  if (msg.match(/^snapplefact\?/i)) {
	  if (store.authed) {
		  store.rclient.srandmember('snapplefacts', function(e, d) {
			  cb.call(null, to, from, d, proto);
		  });
	  }
  }
});
