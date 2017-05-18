// Desc: quiz players on Extra, General and Tech exams for Ham Radio.
(function (helper, to, from, msg, store, sh_store, cb, proto) {
  'use strict'
  var resp

  if (msg.match(/^\/help$|^help:$/)) {
    if (proto === 'telegram') {
      resp = '/thq - Ask ham radio test questions from the Technician question pool.\n'
	    resp += '/ghq - Ask ham radio test questions from the General question pool.\n'
	    resp += '/ehq - Ask ham radio test questions from the Extra question pool.\n'
    } else {
      resp = 'thq: - Ask ham radio test questions from the Technician question pool.\n'
	    resp += 'ghq: - Ask ham radio test questions from the General question pool.\n'
	    resp += 'ehq: - Ask ham radio test questions from the Extra question pool.\n'
    }

    cb.call(null, to, from, resp, proto)
    return
  }

  if (!store.t && !store.g && !store.e) {
    store.t = {}
    store.t.db = redis.createClient()
    store.t.db.select(2)

    store.t.takers = {}
    store.t.curr = ''

    store.g = {}
    store.g.db = redis.createClient()
    store.g.db.select(3)

    store.g.takers = {}
    store.g.curr = ''

    store.e = {}
    store.e.db = redis.createClient()
    store.e.db.select(4)

    store.e.takers = {}
    store.e.curr = ''

    store.randFromTest = function (id, t, frm, fn, prot) {
	    store[id].db.randomkey(function (e, d) {
      store[id].curr = d
      store[id].db.hget(d, 'question', function (e, q) {
		    cb.call(null, t, frm, '(' + store[id].curr + ') ' + q, prot)
		    if (fn) {
      fn.call(null, q)
		    }
      })
	    })
    }

    store.calcRes = function (frm, taker, just_pct) {
	    var pct = Math.floor(taker.correct / taker.total * 100),
      resp = ''

	    if (!just_pct) {
      if (pct < 74) {
		    resp = 'Better luck next time, ' + frm + '. you got ' + pct + '%'
      } else {
		    resp = frm + ', congrats! :D - ' + pct + '%'
      }
	    } else {
      resp = taker.correct + ' / ' + taker.total
	    }

	    return resp
    }

    store.processAns = function (ans, id, t, frm, prot) {
	    if (!store[id].takers[frm]) {
      store[id].takers[frm] = {}
      store[id].takers[frm].correct = 0
      store[id].takers[frm].total = 0
      store[id].takers[frm].q = ''
	    }
	    if (ans.match(store[id].curr + ': ') || ans.match(/^[a-e]$/i)) {
      ans = ans.replace(store[id].curr + ': ', '')
      store[id].db.hget(store[id].curr, 'answer', function (e, a) {
		    if (a) {
      if (store[id].takers[frm].q !== store[id].curr) {
			    store[id].takers[frm].total++
			    store[id].takers[frm].q = ''
      }

      if (a.toLowerCase() === ans.toLowerCase()) {
			    if (store[id].takers[frm].q !== store[id].curr || store[id].takers[frm].q === '') {
      store[id].takers[frm].correct++
			    }
			    resp = 'Correct! ' + store[id].curr + ' is "' + a.toUpperCase() + '", good job ' + frm + '. ' + store.calcRes(frm, store[id].takers[frm], true)
			    store[id].curr = ''
      } else {
			    resp = 'Incorrect answer for ' + store[id].curr + ', ' + frm + '. ' + store.calcRes(frm, store[id].takers[frm], true)
			    store[id].takers[frm].q = store[id].curr
      }
      cb.call(null, t, frm, resp, prot)

      if (store[id].takers[frm] && store[id].takers[frm].total) {
			    if (store[id].takers[frm].total === 35 || store[id].takers[frm].total - store[id].takers[frm].correct >= 9) {
      cb.call(null, t, frm, store.calcRes(frm, store[id].takers[frm]), prot)
      store[id].takers[frm].total = 0
      store[id].takers[frm].correct = 0
			    }
      }
		    }
      })
	    }
    }
  }

  if (msg.match(/^THQ:|^\/THQ$/i)) {
    store.randFromTest('t', to, from, null, proto)
  }

  if (msg.match(/^GHQ:|^\/GHQ$/i)) {
    store.randFromTest('g', to, from, null, proto)
  }

  if (msg.match(/^EHQ:|^\/EHQ$/i)) {
    store.randFromTest('e', to, from, null, proto)
  }

  if (store.t.curr !== '') {
    store.processAns(msg, 't', to, from, proto)
  }

  if (store.g.curr !== '') {
    store.processAns(msg, 'g', to, from, proto)
  }

  if (store.e.curr !== '') {
    store.processAns(msg, 'e', to, from, proto)
  }
})
