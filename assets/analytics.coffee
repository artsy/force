require '../lib/analytics_hooks.coffee'
$ -> analytics.ready ->
  require '../analytics/articles.js'
  require '../analytics/main_layout.js'
  require '../analytics/snowplow.js'