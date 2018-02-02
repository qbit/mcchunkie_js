exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var resp = ''
  var d = new Date()
  if (msg.match(/tgif/i)) {
    if (d.getDay() === 5) {
      if (proto === 'irc' || proto === 'telegram') {
        resp += '\n____________ ___________  _____   __\n'
        resp += '|  ___| ___ \\_   _|  _  \\/ _ \\ \\ / /\n'
        resp += '| |_  | |_/ / | | | | | / /_\\ \\ V / \n'
        resp += '|  _| |    /  | | | | | |  _  |\\ /  \n'
        resp += '| |   | |\\ \\ _| |_| |/ /| | | || |\n'
        resp += '\\_|   \\_| \\_|\\___/|___/ \\_| |_/\\_/\n'
      }
      if (proto === 'matrix') {
        resp += '<br />____________ ___________  _____   __<br />'
        resp += '|  ___| ___ \\_   _|  _  \\/ _ \\ \\ / /<br />'
        resp += '| |_  | |_/ / | | | | | / /_\\ \\ V / <br />'
        resp += '|  _| |    /  | | | | | |  _  |\\ /  <br />'
        resp += '| |   | |\\ \\ _| |_| |/ /| | | || |<br />'
        resp += '\\_|   \\_| \\_|\\___/|___/ \\_| |_/\\_/<br />'
      }
    } else {
      resp = ":'("
    }
  }
  cb(to, from, resp, proto)
}
