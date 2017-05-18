// Desc: print bot's uptime
(function (helper, to, from, msg, store, sh_store, cb, proto) {
  'use strict'
  var resp, minutes = 0
  if (msg === helper.botname + ': uptime') {
    minutes = Math.floor(process.uptime() / 60)
    if (minutes === 1) {
      resp = 'I have been running for one minute.'
    } else {
      resp = 'I have been running for M minutes.'.replace('M', minutes)
    }
  }

  cb.call(null, to, from, resp, proto)
})
