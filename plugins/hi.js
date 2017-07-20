// Desc: hi
exports.fn = function (helper, to, from, msg, store, cb, proto) {
  'use strict'
  var resp
  if (helper.isRelevant(msg)) {
    if (msg.match(/hi$/i)) {
      from = from || to
      resp = 'hi ' + from + '!'
    }
  }
  cb(to, from, resp, proto)
}
