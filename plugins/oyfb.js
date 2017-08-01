// Desc: respond randomly to ooyfb
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var resp
  var resps = [
    'reporting for dootie!',
    '? = 33',
    '28c',
    '1003f',
    'probably potato',
    '....',
    'um.'
  ]
  if (msg.match(/@oneofyoufuckingbots/)) {
    resp = resps[ helper.rand(resps.length) ]
  }

  cb(to, from, resp, proto)
  return {}
}
