// Desc: return random TMNT quotes (really hard to find good ones!)
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var resp

  if (!store.phrases) {
    store.phrases = [
      'Yee haw! Ninja cowboy!',
      "A true Ninja is a master of himself and his environment, so don't forget: We're turtles!",
      'The rat is the cleanest one.',
      'Yeah, remind me to drop a line to Ralph Nader!',
      "Boy, whatever happened to 'service with a smile'?",
      'TECHNODROME!!',
      'Hardcore crazy!',
      'Yeah, pizza.',
      'Yeah! Turtles!',
      'SHREDDER!'
    ]
  }

  if (msg.match(/tmnt/i)) {
    resp = store.phrases[ Math.floor(Math.random() * store.phrases.length) ]
  }

  cb(to, from, resp, proto)
  return {}
}
