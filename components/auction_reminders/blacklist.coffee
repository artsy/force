blacklist = require '../../lib/blacklist.coffee'
{ TEAM_BLOGS } = require('sharify').data

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
    TEAM_BLOGS or '^/test'
  ]

  check: ->
    blacklist(@patterns).check()
