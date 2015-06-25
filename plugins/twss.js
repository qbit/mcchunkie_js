// Desc: watch incoming messages for possible twss jokes. Can be trained.
(function( helper, to, from, msg, store, sh_store, cb, proto ) {
  'use strict';
  var resp,
  responses = [
    "that's what she said!",
    "PHRASING, BOOM!",
    " - Brazzers",
    "( ͡ʘ ͜ʖ ͡ʘ)",
    "phrasing.",
    "twss!",
    "TWSS!",
    "heuheuhuheuheuhe",
    "ohlol, that's what she said!",
    "ew! you guys are sick!",
    "if you know what I mean."
  ];

    if ( ! store.msgs ) {
	store.msgs = {};
	store.spoken_twsses = {};
    }

    if (!store.msgs[proto]) {
	store.msgs[proto] = [];
    }

    if (!store.spoken_twsses[proto]) {
	store.stpoken_twsses[proto] = [];
    }

    store.msgs[proto].push( msg );

    if ( ! helper.isRelevant( msg ) || msg === helper.botname + ': no' ) {

	if ( store.msgs[proto].length >  10 ) {
	    store.msgs[proto].shift();
	}

	if ( store.spoken_twsses[proto].length >  10 ) {
	    store.spoken_twsses[proto].shift();
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
			name: 'twss'
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
		if ( msg.match( /^twss$/i ) || msg === helper.botname + ': yes' ) {
		    if (store.msgs[proto].length > 1) {
			store.bays.train( store.msgs[proto][ store.msgs[proto].length - 2 ], 'funny', function() {
			    store.spoken_twsses[proto].push( store.msgs[proto][ store.msgs[proto].length - 2 ]);
			    resp = 'Added funny: "' + store.msgs[proto][ store.msgs[proto].length - 2 ] + '"';
			    cb.call( null, to, from, resp, proto );
			});
		    } else {
			cb.call( null, to, from, 'que?', proto );
		    }
		} if ( msg === helper.botname + ': no' ) {
		    // store.bays.train( store.msgs[ store.msgs.length - 2 ], 'notfunny', function() {
		    if(store.spoken_twsses[proto].length > 0) {
			store.bays.train( store.spoken_twsses[proto][ store.spoken_twsses[proto].length - 1 ], 'notfunny', function() {
			    // resp = 'Sorry: "' + store.msgs[ store.msgs.length - 2 ] + '"';
			    resp = 'Sorry: "' + store.spoken_twsses[proto][ store.spoken_twsses[proto].length - 1 ] + '"';
			    cb.call( null, to, from, resp, proto );
			});
		    } else {
			cb.call( null, to, from, 'que?', proto );
		    }
		} if ( msg.match( /^twss\?$/i ) ) {
		    if ( cat !== 'funny' ) {
			resp = 'no.';
			cb.call( null, to, from, resp, proto );
		    }
		} else {
		    if ( cat === 'funny' ) {
			store.spoken_twsses[proto].push( msg );
			resp = responses[ helper.rand( responses.length ) ];
			if ( from !== 'dbtid' ) {
			    cb.call( null, to, from, resp, proto );
			}
		    }
		}

	    });
	} catch( e ) {
	    console.log( e );
	}
    }
});
