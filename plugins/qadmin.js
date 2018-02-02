// Desc: how many admin points does qbit need to make it!
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'

  if (!store.util) {
    store.util = require('util')
  }
  
  var count = parseInt(pstore.getItem('qbitadmin'), 10) || 2**31

  if (msg.match(/^qbit\+\+/)) {
    count--
  }

  if (msg.match(/^qbit--/)) {
    count++
  }

  if (msg.match(/qbit/i) && msg.match(/sys/i) && msg.match(/admin/i)) {
    var d = parseInt(count, 10)
    d = store.util.format('qbit has %d more SysAdmin points to go.', d)
    cb(to, from, d, proto)
  }

  pstore.setItem('qbitadmin', count)

  return {}
}
