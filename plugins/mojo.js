// Desc: I got my mojo workin!
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var resp

  if (msg.match(/i got my mojo working/i)) {
    setTimeout(function () {
      resp = 'I GOT MY MOJO WORKING!'
      cb(to, from, resp, proto)
    }, 3000)
  }
  return {}
}
