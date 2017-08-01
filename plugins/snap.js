exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var resp
  if (msg.match(/^snap:/)) {
    resp = 'untrusted comment: github.com/qbit/snap public key\nRWQVGN6sUjQQA5uYpANGLLKQMAERZ43otLePFSVqNFGGtf/qBez7G1WU'
  }

  cb(to, from, resp, proto)
  return {}
}
