// Desc: get shot with LASERS!
(function (helper, to, from, msg, store, sh_store, cb, proto) {
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
  cb.call(null, to, from, resp, proto)
})
