// Desc: print version information
exports.fn = function (helper, to, from, msg, store, cb, proto) {
  'use strict'
  var resp
  var os = require('os')

  if (!'asdf'.ucFirst) {
    String.prototype.ucFirst = function () {
      return this.charAt(0).toUpperCase() + this.substr(1)
    }
  }

  if (msg === helper.botname + ': version') {
    resp = 'I am running on Node.JS ' + process.version + ' (' + process.versions.openssl + ') on ' + process.platform.ucFirst().replace('bsd', 'BSD') + ' ' + os.release() + '.'
    if (process.platform !== 'openbsd') {
      resp += '\n:('
    }
    if (process.platform === 'openbsd') {
      resp += ' \o/'
    }
    cb(to, from, resp, proto)
  }
}
