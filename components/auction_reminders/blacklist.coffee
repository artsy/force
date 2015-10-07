blacklist = require '../../lib/blacklist.coffee'

module.exports =
  patterns: [
    '^/personalize'
    '^/user/edit'
    '^/sale/.*'
    '^/auction/.*'
    '^/dev$'
    '^/inquiry/.*'
  ]

  check: ->
    blacklist(@patterns).check()
