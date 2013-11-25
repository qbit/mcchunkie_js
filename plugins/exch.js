(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp, parts, ho_convs = {
	  'USD': 0.03,
	  'BTC': 0.1,
	  'LTC': 0.7
  },
  co_convs = {
	  'USD': 0.003,
	  'BTC': 0.01,
	  'LTC': 0.07
  };
  if ( msg.match(/^hnb: /)) {
	  msg = msg.replace(/^hnb: /, '');
	  parts = msg.match(/(\d+)\s(\w\w\w)/);

	  resp = "%D will get you %H hookers and %C g of blow.";

	  resp = resp.replace('%D', parts[1]);
	  resp = resp.replace('%H', ho_convs[parts[2]] * parts[1]);
	  resp = resp.replace('%C', co_convs[parts[2]] * parts[1]);
  }

  cb.call( null, to, from, resp );
});
