// Desc: do you know SpaceBalls?
(function (helper, to, from, msg, store, sh_store, cb, proto) {
  'use strict'
  var resp
  // if ( helper.isRelevant( msg ) ) {
  // }
  if (msg.match(/when does this happen in the movie\?/i)) {
    resp = 'Now, you are looking at now, sir.  Everything that happenes now happened now.'
  }

  if (msg.match(/what happened to then\?/i)) {
    resp = 'we passed it.'
    setTimeout(function () {
      cb.call(null, to, from, 'just then.')
    }, 3000)
  }

  // if ( msg === helper.botname + ': help' ) {
  // }

  cb.call(null, to, from, resp, proto)
})
