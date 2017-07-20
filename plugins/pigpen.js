// Desc: translate text to pigpen
exports.fn = function (helper, to, from, msg, store, cb, proto) {
  'use strict'
  var resp
  var i

  if (!store.chars) {
    store.chars = {
      b: '␣',
      c: '∟',
      e: '☐',
      n: '☒'
    }
  }

  if (msg.match(/^pigpen: /)) {
    msg = msg.replace(/^pigpen: /, '')
    for (i in store.chars) {
      if (store.chars.hasOwnProperty(i)) {
        msg = msg.replace(new RegExp(i, 'g'), store.chars[i])
      }
    }
    resp = msg
  }

  cb(to, from, resp, proto)
}
