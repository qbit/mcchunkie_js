// Desc: respond to people who love us
(function (helper, to, from, msg, store, sh_store, cb, proto) {
  'use strict'
  var resp, phrases = [
      'I am not ready for this kind of relationship!',
      'ಠ_ಠ',
      'I love you too! HAVE MY BABBY!!',
      '(╯‵Д′)╯彡┻━┻',
      'hawkard!'
    ]
  if (helper.isRelevant(msg)) {
    if (msg.match(/i love you/i)) {
      from = from || to
      resp = from + ', ' + phrases[ helper.rand(phrases.length) ]
    }
  }
  cb.call(null, to, from, resp, proto)
})
