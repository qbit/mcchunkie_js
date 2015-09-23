// Desc: query the FCC license database for license info. *requires api key for aprs.fi*
(function(helper, to, from, msg, store, sh_store, cb, proto) {
    'use strict';
    var resp, what, who, parts = msg.split( ' ' );

    if (msg.match(/^\/help$|^help:$/)) {
        if (proto === 'telegram') {
	    resp = "/aprs [loc,wx] [callsign] - Return the last APRS entry for a given callsign. It can return callsigns with a suffix as well.";
        } else {
	    resp = "aprs: [loc,wx] [callsign] - Return the last APRS entry for a given callsign. It can return callsigns with a suffix as well.";
        }

	cb.call(null, to, from, resp, proto);
	return;
    }

    if (! store.aprs ) {
	store.aprs = {};
	store.aprs.url = 'http://api.aprs.fi/api/get?';
	store.aprs.qs = require('querystring');
	store.aprs_options = {
	    format: 'json',
	    apikey: store.token,
	    what: '',
	    name: ''
	};
	store.aprs.parseEntry = function(entry) {
	    var l, text = [], u;
	    
	    for (l in entry) {
		if (entry.hasOwnProperty(l)) {
		    if (l.match(/time/)) {
			var nd = new Date(0);
			entry[l] = nd.setUTCSeconds(entry[l]);
		    }
		    text.push(l + ': ' + entry[l]);
		}
	    }
	    
	    if (entry.lng && entry.lat) {
		u = 'http://aprs.fi/?call=' + entry.name;
		text.push(u);
	    }
	    
	    console.log(text);
	    return text.join(', ');
	};
	store.aprs.buildList = function(entries) {
	    var i, l, r, list;

	    if (entries.length > 1) {
		r = 'I found %d entries (from http://aprs.fi), here is the first: %l';
	    } else {
		r = '%l';
	    }

	    r = r.replace('%d', entries.length);
	    r = r.replace('%l', store.aprs.parseEntry(entries[0]));
	    return r;
	};
	store.aprs.whats = {
	    loc: true,
		wx: true
	    };
	    store.aprs.get = function(what, who, t, frm, prot) {
		var aprs_url = store.aprs.url,
		    options = {
			headers: {
			    'User-Agent': 'mcchunkie/1.0.0 (+http://github.com/qbit/mcchunkie)'
			}
		    };

		store.aprs_options.what = what;
		store.aprs_options.name = who;

		aprs_url += store.aprs.qs.stringify(store.aprs_options);

		helper.httpGet(aprs_url, options, function(err, data) {
		    var f;

		    store.aprs_options.what = '';
		    store.aprs_options.name = '';

		    data = JSON.parse(data);
		    if (data.result === 'ok' && data.found > 0) {
			resp = store.aprs.buildList(data.entries);
			cb.call(null, t, frm, resp, prot);
		    } else {
			cb.call(null, t, frm, 'I got nothin.', prot);
		    }
		});
	    };
    }

    if (msg.match(/^aprs: |^\/aprs / )) {
	msg = msg.replace(/^aprs: /, '');
	msg = msg.replace(/^\/aprs /, '');
	parts = msg.split(' ');
	what = parts[0];
	who = parts[1];
	if ( store.aprs.whats[what] ) {
	    store.aprs.get(what, who, to, from, proto);
	}
    }

});
