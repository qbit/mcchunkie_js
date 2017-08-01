// Desc: Bueller!!
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var resp

  if (!store.count) {
    store.count = 0
  }

  if (msg.match(/bueller/i)) {
    store.count++
    if (store.count > 4) {
      resp = "I'm sorry I can't come to the door right now. I'm very ill and I'm afraid that in my weakened condition, I could take a nasty spill down the stairs and subject myself to further school absences."
      store.count = 0
    }
  }
  cb(to, from, resp, proto)
  return {}
}
