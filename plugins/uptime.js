// Desc: print bot's uptime
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var resp
  var minutes = 0
  if (msg === helper.botname + ': uptime') {
    minutes = Math.floor(process.uptime() / 60)
    if (minutes === 1) {
      resp = 'I have been running for one minute.'
    } else {
      resp = 'I have been running for M minutes.'.replace('M', minutes)
    }
  }

  cb(to, from, resp, proto)
  return {}
}
