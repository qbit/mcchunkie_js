exports.fn = function (helper, to, from, msg, store, cb, proto) {
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

  if (!store.ba) {
    store.ba = require('beer-advocate-api')
  }

  function pretty (rev, url, proto) {
    var map = {
      beer_name: 'Name',
      beer_style: 'Style',
      beer_abv: 'ABV',
      brewery_name: 'Brewery',
      brewery_state: 'State',
      brewery_country: 'Country',
      ba_score: 'BA Score',
      ba_rating: 'BA Rating',
      bros_score: 'Bros Score'
    }
    var i
    var o = []

    function f (p) {
      var a = ''
      if (p === 'telegram') {
        a = a + '\n'
      }
      if (p === 'matrix') {
        a = a + '<br />'
      }
      return a
    }

    function g (a, p) {
      if (p === 'telegram') {
        a = '*' + a + '*'
      }
      if (p === 'matrix') {
        a = '<b>' + a + '</b>'
      }

      return a
    }

    if (rev) {
      for (i in rev) {
        if (map.hasOwnProperty(i) && rev.hasOwnProperty(i)) {
          o.push(g(map[i], proto) + ': ' + rev[i].replace('\n', '') || '?' + f(proto))
        }
      }
    }

    o = o.sort()

    if (proto === 'irc') {
      o = o.join(', ') + ' - ' + 'http://www.beeradvocate.com' + url
    }
    if (proto === 'telegram') {
      o = o.join(',\n') + '\n' + 'http://www.beeradvocate.com' + url
    }
    if (proto === 'matrix') {
      o = o.join(',<br />') + '<br />' + 'http://www.beeradvocate.com' + url
    }

    return o
  }

  if (msg.match(/^beer:|^\/beer /)) {
    msg = msg.replace(/^beer:/, '')
    msg = msg.replace(/^\/beer /, '')
    store.ba.beerSearch(msg, function (beers) {
      if (beers[0] && beers[0].beer_url) {
        store.ba.beerPage(beers[0].beer_url, function (reviews) {
          if (reviews.length >= 1) {
            cb(to, from, pretty(reviews[0], beers[0].beer_url, proto), proto)
          }
        })
      }
    })
  }
}
