(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp,
  responses = [
    "that's what she said!",
    "twss!",
    "TWSS!",
    "That's what c0sh said!",
    "ohlol, that's what she said!",
    "ew! you guys are sick!",
    "I am a respectable lady! I will not take this lying down!",
    "aw, where's the pun in that?",
    "(╯‵Д′)╯彡┻━┻"

  ],

  template = "\
  ";

  if ( ! store.msgs ) {
    store.msgs = [];
  }

  store.msgs.push( msg );

  if ( ! helper.isRelevant( msg ) || msg === helper.botname + ': no' ) { 

    if ( store.msgs.length >  10 ) {
      store.msgs.shift();
    }

    if ( ! store.bays ) {
      console.log( 'Initializing twss plugin.. ' );
      store.bays = new helper.classifier.Bayesian({
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
            resp = 'Added funny: "' + store.msgs[ store.msgs.length - 2 ] + '"';
            cb.call( null, to, from, resp );
          });
        } if ( msg === helper.botname + ': no' ) {
          store.bays.train( store.msgs[ store.msgs.length - 2 ], 'notfunny', function() {
            resp = 'Sorry: "' + store.msgs[ store.msgs.length - 2 ] + '"';
            cb.call( null, to, from, resp );
          });
        } if ( msg.match( /^twss\?$/i ) ) {
          if ( cat !== 'funny' ) {
            resp = 'no.';
            cb.call( null, to, from, resp );
          }
        } else {
          if ( cat === 'funny' ) {
            resp = responses[ helper.rand( responses.length ) ];
            cb.call( null, to, from, resp );
          }
        }

      });
    } catch( e ) {
      console.log( e );
    }
  }
});
