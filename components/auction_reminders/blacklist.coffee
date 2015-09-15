blacklist = require '../../lib/blacklist.coffee'

module.exports =
  patterns: [
    '^/personalize'
    '^/user/edit'
    '^/sale/.*'
    '^/auction/.*'
  ]

  check: ->
    blacklist(@patterns).check()
