denylist = require '../../lib/denylist.coffee'

module.exports =
  patterns: [
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
    denylist(@patterns).check()
