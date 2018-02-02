// Desc: feed the bot!
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var resp = ''
  if (msg.match(/^\/help$|^help:$/)) {
    resp = 'botname: botsnack - give mcchunkie a snack!'

    cb(to, from, resp, proto)
    return
  }

  var snacks = [
    'omm nom nom nom',
    '*puke*',
    'MOAR!',
    '=.='
  ]
  if (helper.isRelevant(msg)) {
    if (msg.match('botsnack')) {
      resp = snacks[ helper.rand(snacks.length) ]
    }
  }
  cb(to, from, resp, proto)
}
