// Desc: Daaayum Daaayyyyuuummm DAAAAAAYYYYUUUUMMMMMMMM
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var resp

  if (msg.match(/^\/help$|^help:$/)) {
    if (proto === 'telegram') {
      resp = '/beer [beer] - get BeerAdvocate information for [beer].'
    } else {
      resp = 'beer: [beer] - get BeerAdvocate information for [beer].'
    }

    cb(to, from, resp, proto)
    return
  }

  if (msg.match(/cheese burger/i)) {
    resp = 'Dayum DAYum DAAAAAYUUUUUMMMMM!!!!'
  }
  if (msg.match(/5 guys/i)) {
    resp = 'Dayum DAYum DAAAAAYUUUUUMMMMM!!!!'
  }

  cb(to, from, resp, proto)
  return {}
}
