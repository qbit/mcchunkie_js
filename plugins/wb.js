// Desc: respond to welcom backs
(function (helper, to, from, msg, store, sh_store, cb, proto) {
  'use strict'
  var resp
  if (helper.isRelevant(msg)) {
    msg = msg.trim()
    if (msg.match(/wb/)) {
	    resp = 'thanks ' + from + '!'
    }
  }

  cb.call(null, to, from, resp, proto)
})
