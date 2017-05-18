(function (helper, to, from, msg, store, sh_store, cb, proto) {
  'use strict'
  var resp = ''
  if (helper.isRelevant(msg)) {
    var d = new Date()
    if (msg.match(/tgif/i)) {
	    if (d.getDay() === 5) {
      resp += '____________ ___________  _____   __\n'
      resp += '|  ___| ___ \\_   _|  _  \\/ _ \\ \\ / /\n'
      resp += '| |_  | |_/ / | | | | | / /_\\ \\ V / \n'
      resp += '|  _| |    /  | | | | | |  _  |\\ /  \n'
      resp += '| |   | |\\ \\ _| |_| |/ /| | | || |\n'
      resp += '\\_|   \\_| \\_|\\___/|___/ \\_| |_/\\_/\n'
	    } else {
      resp = ":'("
	    }
    }
  }
  cb.call(null, to, from, resp, proto)
})
