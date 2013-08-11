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
			'expireDate': true
		};
		store.fcc.tmap = {
			'licName': 'Name',
			'callsign': 'Callsign',
			'statusDesc': 'Desc',
			'categoryDesc': 'Category',
			'expireDate': 'Expires'
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
		store.fcc.get = function(param) {
			var u = store.fcc.query_url.replace('%S', param);
			console.log('Searching "%s"', u);
			helper.httpGet(u, function(err, data) {
				data = JSON.parse(data);
				console.log(data.Licenses.totalRows);
				if (data.status === 'OK' ) {
					resp = store.fcc.buildList(data.Licenses.License);
					cb.call(null, to, from, resp);
				} else {
					cb.call(null, to, from, data.status);
				}
			});
		};
	}

	if (msg.match(/^ham: / )) {
		store.fcc.get(msg.replace(/^ham: /, ''));
	}

});
