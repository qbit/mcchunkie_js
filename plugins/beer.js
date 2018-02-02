// Desc: query brewerydb for delicious delicious beer
exports.fn = function (helper, to, from, msg, store, pstore, cb, proto) {
  'use strict'
  var resp
  var url

  if (msg.match(/^\/help$|^help:$/)) {
    if (proto === 'telegram') {
      resp = '/bdb [beer] - Returns BreweryDB info fora given beer.'
    } else {
      resp = 'bdb: [beer] - Returns BreweryDB info fora given beer.'
    }

    cb(to, from, resp, proto)
    return
  }

  try {
    if (!store.url) {
      url = 'http://api.brewerydb.com/v2/search?key=' + store.token + '&withBreweries=Y&type=beer'
    }

    // TODO get glass info and store it .. or make a second request to get
    // glass data

    if (!store.get) {
      store.get = function (u, t, f, p) {
        helper.httpGet(u, {}, function (err, data) {
          var result
          var res
          var name
          var abv
          var ibu
          var desc
          var year
          var bname
          var burl
          if (err) {
            cb(t, f, err, p)
            return
          }
          if (data) {
            try {
              result = JSON.parse(data)
            } catch (e) {
              result = {}
              result.errorMessage = e
            }
            if (result.errorMessage) {
              res = result.errorMessage
            }

            if (result.status === 'success' && result.data) {
              res = ''

              name = result.data[0].name
              abv = result.data[0].abv || '?'
              ibu = result.data[0].ibu || '?'
              desc = result.data[0].description || ':('

              if (result.data[0].breweries) {
                year = result.data[0].breweries[0].established || '?'
                bname = result.data[0].breweries[0].name || '?'
                burl = result.data[0].breweries[0].website || '?'
                res += bname + ' (' + year + ' : ' + burl + ' ) '
              }
              res += name
              res += ' ( ABV: ' + abv + ' IBU: ' + ibu + ' ) - '
              res += desc
                  .replace(/\n/, ' ')
                  .replace(/\n/g, '')
                  .replace(/\r/g, '')
            }

            cb(t, f, res, p)
          }
        })
      }
    }

    if (msg.match(/^bdb:|^\/bdb/)) {
      msg = msg.replace(/^bdb:/, '')
      msg = msg.replace(/^\/bdb /, '')
      msg = msg.replace(/^\//, '')
      url += '&q=' + msg
      try {
        store.get(url, to, from, proto)
      } catch (e) {
        resp = 'oh shit...'
        cb(to, from, resp, proto)
      }
    }
  } catch (e) {
    console.log(e)
  }
}
