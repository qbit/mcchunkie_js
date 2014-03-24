(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp;

  if (! store.ba) {
	  store.ba = require('beer-advocate-api');
  }

  function pretty(rev) {
	  var map = {
		  beer_name: 'Name',
		  beer_style: 'Style',
		  beer_abv: 'ABV',
		  brewery_name: 'Brewery',
		  brewery_state: 'State',
		  brewery_country: 'Country',
		  ba_score: 'BA Score',
		  ba_rating: 'BA Rating',
		  bros_score: 'Bros Score',
		  rAvg: 'rAvg',
		  pDev: 'pDev'
	  }, i, o = [];

	  if (rev) {
		  for(i in rev) {
			  if (map.hasOwnProperty(i) && rev.hasOwnProperty(i)) {
				  o.push(map[i] + ': ' + rev[i] || '?');
			  }
		  }
	  }

	  o = o.sort();

	  return(o.join(', '));
  }

  if (msg.match(/^ba:/)) {
	  msg = msg.replace(/^ba:/, '');
	  store.ba.beerSearch(msg, function(beers) {
		  if ( beers[0] && beers[0].beer_url ) {
			  store.ba.beerPage(beers[0].beer_url, function(reviews) {
				  if ( reviews.length >= 1) {
					  cb.call( null, to, from, pretty(reviews[0]));
				  }
			  });
		  }
      	  });

  }
});
