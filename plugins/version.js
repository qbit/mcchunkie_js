// Desc: print version information
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var resp
  var os = require('os')

  if (!store.ucFirst) {
    store.ucFirst = function (a) {
      a = a + ''
      return a.charAt(0).toUpperCase() + a.substr(1)
    }
  }

  if (msg === helper.botname + ': version') {
    resp = 'I am running on Node.JS ' + process.version + ' (' + process.versions.openssl + ') on ' + store.ucFirst(process.platform).replace('bsd', 'BSD') + ' ' + os.release() + '.'
    if (process.platform !== 'openbsd') {
      resp += '\n:('
    }
    if (process.platform === 'openbsd') {
      resp += ' o/'
    }
    cb(to, from, resp, proto)
  }
}
