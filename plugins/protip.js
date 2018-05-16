// Desc: return random protips
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
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
    getByIDX(id, function(e, d) {
      if (e === null && d !== null) {
        store.rclient.hincrby('protip_votes', d, 1, function () {})
      }
    })
  }

  if (msg.match(/^\d+--/)) {
    id = getID(msg)
    getByIDX(id, function(e, d) {
      if (e === null && d !== null) {
        store.rclient.hincrby('protip_votes', id, -1, function () {})
      }
    })
  }

  function getByIDX (idx, fn) {
    store.rclient.lindex('l_protips', idx, function (e, d) {
      if (e !== null || d === null) {
        e = e || "Invalid tip!"
        fn(null, e)
        return
      }
      if (d) {
        d = d.replace(/^\s+/, '')
      }

      store.rclient.hget('protip_votes', idx, function (e, count) {
        if (count === null) {
          d = '(0:' + idx + ') ' + d
          fn(d)
          return
        } else {
          d = '(' + count + ':' + idx + ') ' + d
          fn(d)
          return
        }
      })
    })
  }

  if (msg.match(/^getpt:\d+$/)) {
    var ix = msg.replace('getpt:', '')
    getByIDX(ix, function (s, e) {
      if (e) {
        s = e
      }
      cb(to, from, s, proto)
      return
    })
  }

  if (msg.match(/^\/[pb]rotip\?|^brotip\?|^protip\?|^pro-tip\?/i)) {
    if (store.authed) {
      store.rclient.llen('l_protips', function (e, max) {
        var idx = helper.rand(parseInt(Math.ceil(max), 10))
        getByIDX(idx, function (s, e) {
          if (e) {
            s = e
          }
          cb(to, from, s, proto)
          return
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
  return {}
}
