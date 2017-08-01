// Desc: reverse a string
exports.fn = function (helpers, to, from, msg, storage, pstore, cb, proto) {
  // Plugin to reverse every msg that is passed in.
  'use strict'
  if (msg.indexOf('reverse:') > -1) {
    msg = msg.replace(helpers.botname, '')
    msg = msg.replace(':', '')
    msg = msg.replace('reverse', '')

    var resp = msg.split('').reverse().join('')
    cb(to, from, resp, proto)
  }
  return {}
}
