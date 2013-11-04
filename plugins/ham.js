// Title: ham.js
// Usage: ham: <callsign>|<string>
// Desc: query the FCC license database for license info.
(function(helper, to, from, msg, store, sh_store, cb ) {
	'use strict';
	var resp;
	if (! store.fcc ) {
		store.fcc = {};
		store.fcc.query_url = 'http://data.fcc.gov/api/license-view/basicSearch/getLicenses?searchValue=%S&format=json';
		store.fcc.lfields = {
			'licName': true,
			'callsign': true,
			'statusDesc': true,
			'categoryDesc': true,
			'lastUpdate': true,
			'expiredDate': true
		};
		store.fcc.tmap = {
			'licName': 'Name',
			'callsign': 'Callsign',
			'statusDesc': 'Desc',
			'categoryDesc': 'Category',
			'lastUpdate': 'Last Update',
			'expiredDate': 'Expires'
		};
		store.fcc.parseLicense = function(license) {
			var l, text = [];
			for (l in license) {
				if (license.hasOwnProperty(l)) {
					if (store.fcc.lfields[l] && license[l] !== '') {
						text.push(store.fcc.tmap[l] + ': ' + license[l]);
					}
				}
			}

			return text.join(', ');
		};
		store.fcc.buildList = function(licenses) {
			var i, l, r, list;

			if (licenses.length > 1) {
				r = 'I found %d licenses, here is the first: %l';
			} else {
				r = '%l';
			}

			r = r.replace('%d', licenses.length);
			r = r.replace('%l', store.fcc.parseLicense(licenses[0]));
			return r;
		};
		store.fcc.get = function(param, t, frm) {
			var u = store.fcc.query_url.replace('%S', param);
			helper.httpGet(u, {}, function(err, data) {
				try {
					data = JSON.parse(data);
				} catch (e) {
					data = {};
					data.status = 'ENOGVMNT';
				}
				if (data.status === 'OK' ) {
					resp = store.fcc.buildList(data.Licenses.License);
					cb.call(null, t, frm, resp);
				} else {
					cb.call(null, t, frm, data.status);
				}
			});
		};
	}

	if (msg.match(/^ham: / )) {
		store.fcc.get(msg.replace(/^ham: /, ''), to, from);
	}

});
