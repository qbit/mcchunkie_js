(function(helper, to, from, msg, store, sh_store, cb) {
  'use strict';
  var resp;

  if (!store.t && ! store.g && ! store.e) {
	  store.t = {};
	  store.t.db = redis.createClient();
	  store.t.db.select(2);

	  store.t.takers = {};
	  store.t.curr = '';

	  store.g = {};
	  store.g.db = redis.createClient();
	  store.g.db.select(3);

	  store.g.takers = {};
	  store.g.curr = '';

	  store.e = {};
	  store.e.db = redis.createClient();
	  store.e.db.select(4);

	  store.e.takers = {};
	  store.e.curr = '';

	store.randFromTest = function( id, fn ) {
		  store[id].db.randomkey(function(e, d) {
			  store[id].curr = d;
			  store[id].db.hget( d, 'question', function(e, q) {
				  cb.call(null, to, from, '(' + store[id].curr +') ' + q);
				  if ( fn ) {
					  fn.call(null, q);
				  }
			  });
		  });
	  };

	  store.calcRes = function( from, taker, just_pct ) {
		  var pct = Math.floor( taker.correct/taker.total * 100 ),
		  resp = '';

		  if ( ! just_pct ) {
			  if ( pct < 74 ) {
				  resp = 'Better luck next time, ' + from + '. you got ' + pct + '%';
			  } else {
				  resp = from + ', congrats! :D';
			  }
		  } else {
			  resp = taker.correct + ' / ' + taker.total ;
		  }

		  return resp;
	  };

	  store.processAns = function ( ans, id, from ) {
		  if ( ! store[id].takers[from] ) {
			  store[id].takers[from] = {};
			  store[id].takers[from].correct = 0;
			  store[id].takers[from].total = 0;
		  }
		  if ( ans.match( store[id].curr + ': ' ) || ans.match(/^[a-e]$/i) ) {
			  ans = ans.replace( store[id].curr + ': ', '' );
			  store[id].db.hget( store[id].curr, 'answer', function(e, a) {
				  if ( a ) {
					  if ( a.toLowerCase() === ans.toLowerCase() ) { 
						  resp = 'Correct! ' + store[id].curr + ' is "' + a.toUpperCase() + '", good job ' + from + '. ' + store.calcRes( from, store[id].takers[from], true );
						  store[id].curr = '';

						  store[id].takers[from].correct++;
						  store[id].takers[from].total++;
					  } else {
						  resp = 'Incorrect answer for ' + store[id].curr + ', ' + from + '. ' + store.calcRes( from, store[id].takers[from], true );
						  store[id].takers[from].total++;
					  }
					  cb.call(null, to, from, resp);

					  if ( store[id].takers[from] && store[id].takers[from].total ) {
						  if ( store[id].takers[from].total === 30 ) {
							  cb.call(null, to, from, from + ': ' + store.calcRes( from, store[id].takers[from] ));
						  }
					  }
				  }
			  });
		  }
	  };
  }


  if (msg.match(/^THQ:/i)) {
	  store.randFromTest('t');
  }

  if (msg.match(/^GHQ:/i)) {
	  store.randFromTest('g');
  }

  if (msg.match(/^EHQ:/i)) {
	  store.randFromTest('e');
  }

  if ( store.t.curr !== '' ) {
	  store.processAns( msg, 't', from );
  }

  if ( store.g.curr !== '' ) {
	  store.processAns( msg, 'g', from );
  }

  if ( store.e.curr !== '' ) {
	  store.processAns( msg, 'e', from );
  }
});
