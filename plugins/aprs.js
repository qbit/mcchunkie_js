// Desc: query the FCC license database for license info. *requires api key for aprs.fi*
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var resp
  var what
  var who
  var parts = msg.split(' ')

  if (msg.match(/^\/help$|^help:$/)) {
    if (proto === 'telegram') {
      resp = '/aprs [loc,wx] [callsign] - Return the last APRS entry for a given callsign. It can return callsigns with a suffix as well.'
    } else {
      resp = 'aprs: [loc,wx] [callsign] - Return the last APRS entry for a given callsign. It can return callsigns with a suffix as well.'
    }

    cb(to, from, resp, proto)
    return
  }

  if (!store.aprs) {
    store.aprs = {}
    store.aprs.url = 'http://api.aprs.fi/api/get?'
    store.aprs.qs = require('querystring')
    store.aprs_options = {
      format: 'json',
      apikey: store.token,
      what: '',
      name: ''
    }
    store.aprs.parseEntry = function (entry) {
      var l
      var text = []
      var u
      for (l in entry) {
        if (entry.hasOwnProperty(l)) {
          if (l.match(/time/)) {
            entry[l] = new Date(parseInt(entry[l], 10) * 1000)
            // Units
          } else if (l.match(/speed/)) {
            entry[l] = entry[l] + 'kph'
          } else if (l.match(/altitude/)) {
            entry[l] = entry[l] + 'm'
          }
          text.push(l + ': ' + entry[l])
        }
      }

      if (entry.lng && entry.lat) {
        u = 'http://aprs.fi/?call=' + entry.name
        text.push(u)
      }

      console.log(text)
      return text.join(', ')
    }
    store.aprs.buildList = function (entries) {
      var r
      if (entries.length > 1) {
        r = 'I found %d entries (from http://aprs.fi), here is the first: %l'
      } else {
        r = '%l'
      }

      r = r.replace('%d', entries.length)
      r = r.replace('%l', store.aprs.parseEntry(entries[0]))
      return r
    }
    store.aprs.whats = {
      loc: true,
      wx: true
    }
    store.aprs.get = function (what, who, t, frm, prot) {
      var aprsURL = store.aprs.url
      var options = {
        headers: {
          'User-Agent': 'mcchunkie/1.0.0 (+http://github.com/qbit/mcchunkie)'
        }
      }

      store.aprs_options.what = what
      store.aprs_options.name = who

      aprsURL += store.aprs.qs.stringify(store.aprs_options)

      helper.httpGet(aprsURL, options, function (err, data) {
        if (err) {
          cb(t, frm, err, prot)
          return
        }

        store.aprs_options.what = ''
        store.aprs_options.name = ''

        data = JSON.parse(data)
        if (data.result === 'ok' && data.found > 0) {
          resp = store.aprs.buildList(data.entries)
          cb(t, frm, resp, prot)
        } else {
          cb(t, frm, 'I got nothin.', prot)
        }
      })
    }
  }

  if (msg.match(/^aprs: |^\/aprs /)) {
    msg = msg.replace(/^aprs: /, '')
    msg = msg.replace(/^\/aprs /, '')
    parts = msg.split(' ')
    what = parts[0]
    who = parts[1]
    if (store.aprs.whats[what]) {
      store.aprs.get(what, who, to, from, proto)
    }
  }
  return {}
}
