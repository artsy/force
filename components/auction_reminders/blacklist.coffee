blacklist = require '../../lib/blacklist.coffee'

module.exports =
  patterns: [
    '^/personalize'
    '^/user/edit'
    '^/sale/.*'
    '^/auction/.*'
    '^/dev$'
    '^/inquiry/.*'
    '^/jobs'
    '^/job/.*'
  ]

  check: ->
    blacklist(@patterns).check()
