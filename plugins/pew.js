// Desc: get shot with LASERS!
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var pews = [
    'pewpew',
    'le pew',
    'omg.. you got me!',
    'pewpewpwepwepwpwpewpe',
    '=.='
  ]
  var resp = ''
  if (helper.isRelevant(msg)) {
    if (msg.match('pew')) {
      resp = pews[ helper.rand(pews.length) ]
    }
  }
  cb(to, from, resp, proto)
  return {}
}
