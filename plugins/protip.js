// Desc: return random protips
exports.fn = function (helper, to, from, msg, store, cb, proto) {
  'use strict'

  if (!store.rclient) {
    var redis = redis || require('redis')
    store.rclient = redis.createClient()
    store.authed = false
    if (process.env.REDIS_PASS) {
      store.rclient.auth(process.env.REDIS_PASS, function () {
        store.authed = true
        console.log('protip authed')
      })
    } else {
      store.authed = true
    }
  }

  var id
  function getID (i) {
    return i.replace(/\+\+.*$/, '').replace(/--.*$/, '')
  }

  if (msg.match(/^\d+\+\+/)) {
    id = getID(msg)
    store.rclient.hincrby('protip_votes', id, 1, function () {})
  }

  if (msg.match(/^\d+--/)) {
    id = getID(msg)
    store.rclient.hincrby('protip_votes', id, -1, function () {})
  }

  function getByIDX (idx, fn) {
    store.rclient.lindex('l_protips', idx, function (e, d) {
      if (d) {
        d = d.replace(/^\s+/, '')
      }

      store.rclient.hget('protip_votes', idx, function (e, count) {
        if (count === null) {
          d = '(0:' + idx + ') ' + d
          fn(d)
        } else {
          d = '(' + count + ':' + idx + ') ' + d
          fn(d)
        }
      })
    })
  }

  if (msg.match(/^getpt:\d+$/)) {
    id = msg.replace('getpt:', '')
    getByIDX(id, function (s) {
      cb(to, from, s, proto)
    })
  }

  if (msg.match(/^\/[pb]rotip\?|^brotip\?|^protip\?|^pro-tip\?/i)) {
    if (store.authed) {
      store.rclient.llen('l_protips', function (e, max) {
        var idx = helper.rand(parseInt(Math.ceil(max), 10))
        getByIDX(idx, function (s) {
          cb(to, from, s, proto)
        })
      })
    }
  }

  if (msg.match(/^\/[pb]rotip:|^brotip:|^protip:|^pro-tip:/i)) {
    if (store.authed) {
      msg = msg.replace(/\/[pb]rotip|^brotip: |^protip: |^pro-tip: /i, '')
      store.rclient.rpush('l_protips', msg)
    }
  }
}
