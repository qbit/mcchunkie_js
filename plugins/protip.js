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

    function getID(id) {
	return id.replace(/\+\+.*$/, '').replace(/--.*$/, '');
    }

    if (msg.match(/^\d+\+\+/)) {
	var id = getID(msg);
	store.rclient.hincrby('protip_votes', id, 1, function() {});
    }

    if (msg.match(/^\d+\--/)) {
	var id = getID(msg);
	store.rclient.hincrby('protip_votes', id, -1, function() {});
    }

    function getByIDX(idx, fn) {
	store.rclient.lindex('l_protips', idx, function(e, d) {
	    
	    if (d) {
		d = d.replace(/^\s+/, '');
	    }
	    
	    store.rclient.hget('protip_votes', idx, function(e, count) {
		if (count === null) {
		    d = "(0:" + idx + ") " + d;
		    fn.call(null, d);
		} else {
		    d = "(" + count + ":" + idx + ") " + d;
		    fn.call(null, d);
		}
	    });
	});
    }

    if (msg.match(/^getpt:\d+$/)) {
	var id = msg.replace('getpt:', '');
	getByIDX(id, function(s) {
	    cb.call(null, to, from, s, proto);
	});
    }

    if (msg.match(/^\/[pb]rotip\?|^brotip\?|^protip\?|^pro-tip\?/i)) {
	if (store.authed) {
	    store.rclient.llen('l_protips', function(e, max) {
		var idx = helper.rand(parseInt(Math.ceil(max), 10));
		getByIDX(idx, function(s) {
		    cb.call(null, to, from, s, proto);
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
