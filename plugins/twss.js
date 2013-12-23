(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp,
  responses = [
    "that's what she said!",
    "twss!",
    "TWSS!",
    "heuheuhuheuheuhe",
    "ohlol, that's what she said!",
    "ew! you guys are sick!",
    "if you know what I mean."
  ],

  template = "\
  ";

  if ( ! store.msgs ) {
    store.msgs = [];
    store.spoken_twsses = [];
  }

  store.msgs.push( msg );

  if ( ! helper.isRelevant( msg ) || msg === helper.botname + ': no' ) { 

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
          store.bays.train( store.msgs[ store.msgs.length - 2 ], 'funny', function() {
            store.spoken_twsses.push( store.msgs[ store.msgs.length - 2 ] );
            resp = 'Added funny: "' + store.msgs[ store.msgs.length - 2 ] + '"';
            cb.call( null, to, from, resp );
          });
        } if ( msg === helper.botname + ': no' ) {
          // store.bays.train( store.msgs[ store.msgs.length - 2 ], 'notfunny', function() {
          store.bays.train( store.spoken_twsses[ store.spoken_twsses.length - 1 ], 'notfunny', function() {
            // resp = 'Sorry: "' + store.msgs[ store.msgs.length - 2 ] + '"';
            resp = 'Sorry: "' + store.spoken_twsses[ store.spoken_twsses.length - 1 ] + '"';
            cb.call( null, to, from, resp );
          });
        } if ( msg.match( /^twss\?$/i ) ) {
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
