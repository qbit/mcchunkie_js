// Desc: pull a sweet CSI move
exports.fn = function (helper, to, from, msg, store, cb, proto) {
  'use strict'
  var resp = ''
  if (helper.isRelevant(msg)) {
    if (msg.match('CSI')) {
      resp += '( •_•)\n'
      resp += '( •_•)>⌐■-■\n'
      resp += '(⌐■_■)'

      setTimeout(function () {
        resp = 'YEEEAAAAAAHHHHHH!'
        cb(to, from, resp, proto)
      }, 5000)
    }
  }
  cb(to, from, resp, proto)
}
