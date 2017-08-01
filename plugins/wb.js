// Desc: respond to welcom backs
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var resp
  if (helper.isRelevant(msg)) {
    msg = msg.trim()
    if (msg.match(/wb/)) {
      resp = 'thanks ' + from + '!'
    }
  }

  cb(to, from, resp, proto)
  return {}
}
