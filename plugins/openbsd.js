// Desc: uses the pubsub / storage features and an external app ( openbsd_mon to keep track of openbsd snapshot releases.
exports.fn = function (helper, to, from, msg, store, cb, proto) {
  'use strict'

  if (msg.match(/^openbsd: /i)) {
    var snapURL = 'https://ftp3.usa.openbsd.org/pub/OpenBSD/snapshots/%A/BUILDINFO'
    var pkgURL = 'https://ftp3.usa.openbsd.org/pub/OpenBSD/snapshots/packages/%A/SHA256'

    msg = msg.replace(':', '')
    msg = msg.replace(/^\//, '')
    msg = msg.trim()

    var parts = msg.split(' ')
    var arch = parts[1]

    var pkgMap = {
      alpha: 'alpha',
      amd64: 'amd64',
      arm64: 'aarch64',
      armish: 'arm',
      armv7: 'arm',
      hppa: '',
      i386: 'i386',
      landisk: '',
      loongson: '',
      luna88k: '',
      macppc: 'powerpc',
      octeon: '',
      sgi: '',
      socppc: '',
      sparc: '',
      sparc64: 'sparc64',
      zaurus: ''
    }

    if (typeof pkgMap[arch] === 'undefined') {
      cb(to, from, 'That\'s not a real arch!', proto)
      return
    }

    snapURL = snapURL.replace('%A', arch)
    pkgURL = pkgURL.replace('%A', pkgMap[arch])

    var resp = []
    helper.httpGet(snapURL, {}, function (err, data, res) {
      if (err) {
        cb(to, from, err, proto)
        return
      }
      var setDate = new Date(data.replace(/Build date:\s\d+\s-\s/, ''))
      resp.push('sets ->')
      resp.push(setDate)

      if (pkgMap[arch] !== '') {
        helper.httpGet(pkgURL, {}, function (err, data, res) {
          if (err) {
            cb(to, from, err, proto)
            return
          }

          var pkgDate = new Date(res.headers['last-modified'])
          resp.push('packages ->')
          resp.push(pkgDate)

          if (pkgDate > setDate) {
            resp.unshift('✓ :')
          } else {
            resp.unshift('✗ :')
          }
          cb(to, from, resp.join(' '), proto)
        })
      } else {
        resp.push(': no packages for ' + arch)
        cb(to, from, resp.join(' '), proto)
      }
    })
  }
}
