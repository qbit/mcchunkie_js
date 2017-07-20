// Desc: watch incoming messages for possible twts jokes. Can be trained.
exports.fn = function (helper, to, from, msg, store, cb, proto) {
  'use strict'
  var resp
  var responses = [
    "that's what she said!",
    "that's what he said!",
    "that's what they said!",
    'PHRASING, BOOM!',
    ' - Brazzers',
    '( ͡ʘ ͜ʖ ͡ʘ)',
    'phrasing.',
    'twss!',
    'twhs!',
    'twts!',
    'TWHS!',
    'TWTS!',
    'heuheuhuheuheuhe',
    "ohlol, that's what she said!",
    "ohlol, that's what he said!",
    "ohlol, that's what they said!",
    'ew! you guys are sick!',
    'if you know what I mean.',
    'go on...'
  ]

  if (!store.msgs) {
    store.msgs = {}
    store.spokenTwsses = {}
  }

  to = to || 'notsupported'

  if (!store.spokenTwsses[proto]) {
    store.spokenTwsses[proto] = {}
    store.msgs[proto] = {}
  }

  if (!store.msgs[proto][to]) {
    store.msgs[proto][to] = []
  }

  if (!store.spokenTwsses[proto][to]) {
    store.spokenTwsses[proto][to] = []
  }

  store.msgs[proto][to].push(msg)

  if (!helper.isRelevant(msg) || msg === helper.botname + ': no') {
    if (store.msgs[proto][to].length > 10) {
      store.msgs[proto][to].shift()
    }

    if (store.spokenTwsses[proto][to].length > 10) {
      store.spokenTwsses[proto][to].shift()
    }

    if (!store.bays) {
      store.bays = new helper.classifier.Bayesian({
        error: function (e) {
          console.log('classifier error!', e)
        },
        backend: {
          type: 'Redis',
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
      })
    }

    try {
      store.bays.classify(msg, function (cat) {
        if (msg.match(/^twss$/i) || msg === helper.botname + ': yes') {
          if (store.msgs[proto][to].length > 1) {
            store.bays.train(store.msgs[proto][to][ store.msgs[proto][to].length - 2 ], 'funny', function () {
              store.spokenTwsses[proto][to].push(store.msgs[proto][to][ store.msgs[proto][to].length - 2 ])
              resp = 'Added funny: "' + store.msgs[proto][to][ store.msgs[proto][to].length - 2 ] + '"'
              cb(to, from, resp, proto)
            })
          } else {
            cb(to, from, 'que?', proto)
          }
        } if (msg === helper.botname + ': no') {
	  console.log('received no', proto, store.msgs)
          if (store.spokenTwsses[proto][to].length > 0) {
            store.bays.train(store.spokenTwsses[proto][to][ store.spokenTwsses[proto][to].length - 1 ], 'notfunny', function () {
              resp = 'Sorry: "' + store.spokenTwsses[proto][to][ store.spokenTwsses[proto][to].length - 1 ] + '"'
              cb(to, from, resp, proto)
            })
          } else {
            cb(to, from, 'que?', proto)
          }
        } if (msg.match(/^twss\?$/i)) {
          if (cat !== 'funny') {
            resp = 'no.'
            cb(to, from, resp, proto)
          }
        } else {
          if (cat === 'funny') {
            store.spokenTwsses[proto][to].push(msg)
            resp = responses[ helper.rand(responses.length) ]
            if (from !== 'dbtid') {
              cb(to, from, resp, proto)
            }
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
}
