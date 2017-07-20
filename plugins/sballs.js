// Desc: do you know SpaceBalls?
exports.fn = function (helper, to, from, msg, store, cb, proto) {
  'use strict'
  var resp
  if (msg.match(/when does this happen in the movie\?/i)) {
    resp = 'Now, you are looking at now, sir.  Everything that happenes now happened now.'
  }

  if (msg.match(/what happened to then\?/i)) {
    resp = 'we passed it.'
    setTimeout(function () {
      cb(to, from, 'just then.')
    }, 3000)
  }

  cb(to, from, resp, proto)
}
