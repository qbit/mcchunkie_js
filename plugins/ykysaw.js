// Desc: you know you're South African when
(function (helper, to, from, msg, store, sh_store, cb, proto) {
  'use strict'
  var resp

  if (!store.phrases) {
    store.phrases = [
		  '"oh, your nation anthem only has one language?"',
		  'your national football team sucks and you have no hope for them, but you still love them.',
		  'Everyone you know and love has had a facebook clone.',
		  'ProNutro and mielie pap are the best cereals on earth.',
		  "You tell people you're South African and their reaction is, 'if you're from Africa, why are you white?!'",
		  "You put 'man' at the end of everything.",
		  'You call a bathing suit a cozzie.',
		  'Anything below 16 degrees celsius is artic weather.',
		  'Iced zoos and jolly jammers',
		  "We have braais because 'bbq' is a chip flavour.",
		  "When the lights go off and you immediately say 'ESKOM!'",
		  "You call a van a 'combie'",
		  'Ja no definately',
		  'Wimpy',
		  'Eish boet...',
		  'You can shop in your car at a robot.',
		  "Everything is described as 'lekker'",
		  'Australians piss you off because you know, Australia!'
	  ]
  }
  if (msg.match(/^ykysaw?/i)) {
    resp = "You Know You're a South African When: " + store.phrases[ helper.rand(store.phrases.length) ]
  }
  cb.call(null, to, from, resp, proto)
})
