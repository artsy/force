blacklist = require '../../lib/blacklist.coffee'

module.exports =
  patterns: [
    '^/personalize'
    '^/user/edit'
    '^/sale/.*'
    '^/auction/.*'
    '^/dev$'
  ]

  check: ->
    blacklist(@patterns).check()
