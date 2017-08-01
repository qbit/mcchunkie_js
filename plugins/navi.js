// Desc: HEY LOOK!!!!! AHHHHHHHH!
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var resp

  if (msg.match(/ navi /i)) {
    resp = 'DIAF NAVI!!!'
  }

  cb(to, from, resp, proto)
  return {}
}
