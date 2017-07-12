(function (helper, to, from, msg, store, sh_store, cb, proto) {
  'use strict'
  var resp

  if (!store.loading && !store.markov) {
    var markov = require('markov')
    console.log('reloading markov stuff..')
    store.markov = markov()
    store.loading = true
    fs.readFile(__dirname + '/../misc.markov', function (err, data) {
      if (err) { throw err }
      store.markov.seed(data.toString(), function () {
        console.log('markov chain loaded!')
        store.loading = false
      })
    })
  }

  if (msg.match(/misckov/i)) {
    msg = msg.replace(/misckov/i, '')
    msg = msg.replace(/\s+/, ' ')
    msg = msg.replace(/^\s+/, '')
    msg = msg.replace(/\s+$/, '')

    var s = msg.split(' ')
    var rword = s[helper.rand(s.length)]
    var k = store.markov.search(rword)
    resp = store.markov.forward(k, 30).join(' ')
    console.log(k, resp, s)
    cb.call(null, to, from, resp, proto)
  }
})
