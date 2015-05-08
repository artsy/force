require '../lib/analytics_hooks.coffee'
$ -> analytics.ready ->
  require '../analytics/snowplow.js'
  require '../analytics/main_layout.js'
  require '../analytics/articles.js'
  require '../analytics/gallery_partnerships.js'