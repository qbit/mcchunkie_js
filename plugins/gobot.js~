// Desc: watch incoming messages for possible twss jokes. Can be trained.
(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp,
  responses = [
	  "golang can already do that.",
	  "did you know go channels are concurrent?",
	  "god I love channels in go!",
	  "no way bro! Concurrency Is Not Parallelism",
	  "WWRPD?",
	  "there is literally no way golang is hurting the industry!",
	  "just go get it!"
  ],

  template = "\
  ";

  if ( ! store.msgs ) {
    store.msgs = [];
    store.spoken_twsses = [];
  }

  store.msgs.push( msg );

  if ( ! helper.isRelevant( msg ) || msg === helper.botname + ': notgolang' ) { 

    if ( store.msgs.length >  10 ) {
      store.msgs.shift();
    }

    if ( store.spoken_twsses.length >  10 ) {
      store.spoken_twsses.shift();
    }

    if ( ! store.bays ) {
      store.bays = new helper.classifier.Bayesian({
        error: function( e ) {
          console.log( 'classifier error!', e );
        },
        backend: {
          type: "Redis",
          options: {
            hostname: 'localhost',
            name: 'golang'
          }
        },
        thresholds: {
          funny: 3,
          notfunny: 1
        },
        default: 'notfunny'
      });
    }

    try { 
      store.bays.classify( msg, function( cat ) {
      //   console.log( 'prev msg: ' + store.msgs[1] );
        if ( msg.match( /^sogolang$/i ) || msg === helper.botname + ': yes' ) {
		console.log('store.msgs', store.msgs);
 	  if (store.msgs.length > 1) {
		  store.bays.train( store.msgs[ store.msgs.length - 2 ], 'funny', function() {
		    store.spoken_twsses.push( store.msgs[ store.msgs.length - 2 ]);
		    resp = 'Appended: "' + store.msgs[ store.msgs.length - 2 ] + '" to the slice';
		    cb.call( null, to, from, resp );
		  });
	  } else {
		    cb.call( null, to, from, 'que?' );
	  }
        } if ( msg === helper.botname + ': notgolang' ) {
          // store.bays.train( store.msgs[ store.msgs.length - 2 ], 'notfunny', function() {
 	  if(store.spoken_twsses.length > 0) {
		  store.bays.train( store.spoken_twsses[ store.spoken_twsses.length - 1 ], 'notfunny', function() {
		    // resp = 'Sorry, I have failed the Rob Pike: "' + store.msgs[ store.msgs.length - 2 ] + '"';
		    resp = 'Sorry, I have failed the Rob Pike: "' + store.spoken_twsses[ store.spoken_twsses.length - 1 ] + '"';
		    cb.call( null, to, from, resp );
		  });
	  } else {
		    cb.call( null, to, from, 'que?' );
	  }
        } if ( msg.match( /^sogolang\?$/i ) ) {
          if ( cat !== 'funny' ) {
            resp = 'no.';
            cb.call( null, to, from, resp );
          }
        } else {
          if ( cat === 'funny' ) {
            store.spoken_twsses.push( msg );
            resp = responses[ helper.rand( responses.length ) ];
	    if ( from !== 'dbtid' ) {
		    cb.call( null, to, from, resp );
	    }
          }
        }

      });
    } catch( e ) {
      console.log( e );
    }
  }

});
