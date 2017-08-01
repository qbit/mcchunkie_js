// Desc: no one is as free as 'Merika!
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var resp

  if (msg === 'freedom') {
    resp = 'MERIKA!'
  }

  cb(to, from, resp, proto)
  return {}
}
