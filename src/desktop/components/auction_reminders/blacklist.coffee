blacklist = require '../../lib/blacklist.coffee'
{ TEAM_BLOGS } = require('sharify').data

module.exports =
  patterns: [
    '^/personalize'
    '^/artsy-primer'
    '^/collect-art'
    '^/consign'
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
    '^/venice-biennale.*'
    '^/gender-equality.*'
    '^/gallery-partnerships.*'
    '^/article/.*'
    '^/news/.*'
    '^/news'
    '^/series/.*'
    '^/spring-art-fairs'
    '^/video/.*'
    '^/artsy-in-miami'
    '^/armory-week'
    '^/order'
    '^/order2'
  ]

  check: ->
    blacklist(@patterns).check()
