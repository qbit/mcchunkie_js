// Desc: respond randomly to ooyfb
(function (helper, to, from, msg, store, sh_store, cb, proto) {
  'use strict'
  var resp,
    resps = [
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

  cb.call(null, to, from, resp, proto)
})
