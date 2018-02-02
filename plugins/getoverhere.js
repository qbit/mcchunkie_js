// Desc: mortal kombat style ~~~~~~>
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var resp

  if (proto !== 'irc') {
    return
  }

  if (msg.match(/^getoverhere: (.*)$/i)) {
    msg = msg.replace(/^getoverhere: /, '')
    var str = '~~~~>' + msg
    var count = setInterval(function () {
      str = str.replace(/~/, '')

      if (str.match(/~/)) {
          // client.say(to || from, str)
        cb(to, from, str, proto)
      } else {
          // client.say(to || from, str)
        cb(to, from, str, proto)
          // client.say(to || from, 'FINISHTHEM!!!')
        cb(to, from, 'FINISHTHEM!!!', proto)
        clearInterval(count)
      }
    }, 1000)
  }

  cb(to, from, resp, proto)
  return {}
}
