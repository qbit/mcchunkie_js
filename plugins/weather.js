(function(helper, to, from, msg, store, sh_store, cb, proto) {
  'use strict';
  var resp;

  if (!store.users) {
    store.users = {}
  }

  if (msg.match(/^weather:/)) {
    var baseURL = "http://api.openweathermap.org/data/2.5/weather?APPID=%T"
    var location = msg.replace('weather:', '').trim()

    if (location === "") {
      location = store.users[from]
    }

    var url = ""
    var store_location = location
    if (location.match(/^\d+(,\w{2})?$/)) {
      url = baseURL + "&zip=%S"
    } else if (location.match(/^id:\d+/)) {
      url = baseURL + "&id=%S"
      store_location = location
      location = location.replace('id:', '').trim()
    } else if (location.match(/^\w+/)) {
      url = baseURL + "&q=%S"
    }

    if (location === "") {
      cb.call(null, to, from, 'gimme a location!', proto);
    }

    store.users[from] = store_location

    url = url.replace("%T", store.token)
    url = url.replace("%S", escape(location))

    console.log(url);
    helper.httpGet(url, {}, function (err, data) {
      if (!err) {
        data = JSON.parse(data)
        if (data.cod === 200) {
          var o = []
          o.push(data.name)
          o.push(':')
          o.push(' ')
          o.push(Math.ceil((data.main.temp - 273.15)*1.8000+32.00))
          o.push('°F ')
          o.push('(')
          o.push(Math.ceil(data.main.temp - 273.15))
          o.push('°C), ')
          o.push('Humidity: ')
          o.push(data.main.humidity)
          o.push('%, ')

          var i
          var l = data.weather.length
          var desc = []

          for (i = 0; i < l; i++) {
            desc.push(data.weather[i].description)
          }
          o.push(desc.join(', '))

          if (data.id) {
            o.push(' (http://openweathermap.org/city/' + data.id + ')')
          }

          resp = o.join('')
        } else {
          resp = data.message
        }
      } else {
        resp = err
      }

      cb.call(null, to, from, resp, proto);
    })
  }
});
