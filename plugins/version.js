// Desc: print version information
(function (helper, to, from, msg, store, sh_store, cb, proto) {
  'use strict'
  var resp

  if (!'asdf'.ucFirst) {
    String.prototype.ucFirst = function () {
      return this.charAt(0).toUpperCase() + this.substr(1)
    }
    if (!os) {
      os = require('os')
    }
  }

  if (msg.match(/^version:|^\/version$/)) {
    resp = 'I am running on Node.JS ' + process.version + ' (' + process.versions.openssl + ') on ' + process.platform.ucFirst().replace('bsd', 'BSD') + ' ' + os.release() + '.'
    if (process.platform !== 'openbsd') {
	  resp += '\n:('
    }
    if (process.platform === 'openbsd') {
	  resp += ' \o/'
    }
  }
  cb.call(null, to, from, resp, proto)
})
