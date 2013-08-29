(function(helper, to, from, msg, store, sh_store, cb) {
  'use strict';
  var resp;

  if (!store.rclient) {
	  
	  store.rclient = redis.createClient();
	  store.rclient.select(3);
  }

  if (msg.match(/^GHQ:/i)) {
	  store.rclient.randomkey(function(e, d) {
		  store.cur_q = d;
		  store.rclient.hget( d, 'question', function(e, q) {
			  cb.call(null, to, from, '(' + store.cur_q +') ' + q);
		  });
	  });
  }

  console.log(store.cur_q, msg);
  if ( store.cur_q !== '' ) {
	  if ( msg.match( store.cur_q + ': ' ) || msg.match(/^[a-e]$/i) ) {
		  msg = msg.replace( store.cur_q + ': ', '' );
		  store.rclient.hget( store.cur_q, 'answer', function(e, a) {
			  if ( a ) {
				  if ( a.toLowerCase() === msg.toLowerCase() ) { 
					  resp = 'Correct!';
					  store.cur_q = '';
				  } else {
					  resp = "Incorrect!";
				  }
				  cb.call(null, to, from, resp);
			  }
		  });
	  }
  }
});
