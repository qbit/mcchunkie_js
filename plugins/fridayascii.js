(function(helper, to, from, msg, store, sh_store, cb, proto) {
  'use strict';
  var resp = "";
  if (helper.isRelevant(msg)) {
    if (msg.match(/tgif/i)) {
      if (proto === "telegram") {
        resp += "```\n"
      }
      resp += "____________ ___________  _____   __\n"
      resp += "|  ___| ___ \\_   _|  _  \\/ _ \\ \\ / /\n"
      resp += "| |_  | |_/ / | | | | | / /_\\ \\ V / \n"
      resp += "|  _| |    /  | | | | | |  _  |\\ /  \n"
      resp += "| |   | |\\ \\ _| |_| |/ /| | | || |\n"
      resp += "\\_|   \\_| \\_|\\___/|___/ \\_| |_/\\_/\n"
      if (proto === "telegram") {
        resp += "```\n"
      }

      setTimeout(function() {
        resp = '(It really is, somewhere)';
        cb.call(null, to, from, resp, proto);
      }, 5000);
    }
  }
  cb.call(null, to, from, resp, proto);
});
