// Desc: once a table has been fliped, politely put it back
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var resp

  if (msg.match(/@tableflip/)) {
    resp = '┬──┬﻿ ¯\_(ツ)'
  }

  setTimeout(function () {
    cb(to, from, resp, proto)
  }, Math.ceil(Math.random() * 10000))
  return {}
}
