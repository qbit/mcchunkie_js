// Desc: be polite
exports.fn = function (helper, to, from, msg, store, cb, proto) {
  'use strict'
  var resp
  if (helper.isRelevant(msg)) {
    msg = msg.trim()
    if (msg === helper.botname + ': thanks' ||
      msg === 'thanks ' + helper.botname) {
      resp = from + ', you are welcome!'
    }
  }

  cb(to, from, resp, proto)
}
