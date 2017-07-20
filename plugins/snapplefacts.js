// Desc: return random snapplefacts
exports.fn = function (helper, to, from, msg, store, cb, proto) {
  'use strict'

  if (!store.rclient) {
    var redis = redis || require('redis')
    store.rclient = redis.createClient()
    store.authed = false
    if (process.env.REDIS_PASS) {
      store.rclient.auth(process.env.REDIS_PASS, function () {
        store.authed = true
        console.log('snapplefact authed')
      })
    } else {
      store.authed = true
    }
  }

  if (msg.match(/^snapplefact\?/i)) {
    if (store.authed) {
      store.rclient.srandmember('snapplefacts', function (e, d) {
        cb(to, from, d, proto)
      })
    }
  }
}
