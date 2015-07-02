(function( helper, to, from, msg, store, sh_store, cb, proto ) {
	'use strict';
	var resp;

	if (!store.loading || !store.markov) {
		var markov = require('markov');
		console.log("reloading markov stuff..");
		store.markov = markov();
		store.loading = true;
		fs.readFile(__dirname +'/../misc.markov', function(err, data) {
    			if (err) { throw err; }
    			store.markov.seed(data.toString(), function () {
				console.log("markov chain loaded!");
			});
		});
	}

	if (msg.match(/misckov/i)) {
		var s = msg.split(' ');
		resp = store.markov.forward(s[helper.rand(s.length)], 30).join(' ');
		cb.call( null, to, from, resp, proto );
	}
});
