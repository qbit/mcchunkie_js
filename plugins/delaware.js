// Desc: ride the joly train on xmas!
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var resp
  if (msg.match(/^Delaware/i)) {
    resp = "hi, i'm in Delaware."
  }

  cb(to, from, resp, proto)
}
