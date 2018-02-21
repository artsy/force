blacklist = require '../../lib/blacklist.coffee'

module.exports =
  patterns: [
    '^/gallery-partnerships'
    '^/institution-partnerships'
    '^/auction-partnerships'
    '^/artsy-education'
    '^/life-at-artsy'
    '^/gallery-insights'
    '^/about/jobs'
    '^/press'
    '^/contact'
    '^/consign'
    '^/professional-buyer'
    '^/2016-year-in-art'
    '^/article/.*'
    '^/feature/.*'
    '^/artwork/.*/checkout'
    '^/artwork/.*/thank-you'
  ]

  check: ->
    blacklist(@patterns).check()
