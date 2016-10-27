blacklist = require '../../lib/blacklist.coffee'
sd = require('sharify').data

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
    sd.TEAM_BLOGS
  ]

  check: ->
    blacklist(@patterns).check()
