blacklist = require '../../lib/blacklist.coffee'
{ TEAM_BLOGS } = require('sharify').data

module.exports =
  patterns: [
    '^/personalize'
    '^/artsy-primer'
    '^/collect-art'
    '^/signup'
    '^/login'
    '^/user/edit'
    '^/sale/.*'
    '^/auction/.*'
    '^/dev$'
    '^/inquiry/.*'
    '^/artwork/.*/checkout'
    '^/artwork/.*/thank-you'
    '^/jobs'
    '^/job/.*'
    TEAM_BLOGS or '^/test'
    '^/2016-year-in-art'
    '^/artist/.*'
    '^/venice-biennale/.*'
  ]

  check: ->
    blacklist(@patterns).check()
