// Desc: return random protips
(function(helper, to, from, msg, store, sh_store, cb) {
  'use strict';
  var resp;

  if (!store.rclient) {
	  store.rclient = redis.createClient();
  }

  if (msg.match(/^brotip\?|^protip\?|^pro-tip\?/i)) {
	  store.rclient.srandmember('protip', function(e, d) {
		  cb.call(null, to, from, d);
	  });
  }

  if (msg.match(/^brotip:|^protip:|^pro-tip:/i )) {
	  msg = msg.replace(/^brotip: |^protip: |^pro-tip: /i, '');
	  store.rclient.sadd('protip', msg);
  }
});
