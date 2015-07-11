require '../lib/analytics_hooks.coffee'
setupSplitTests = require '../components/split_test/setup.coffee'
$ -> analytics.ready ->
  setupSplitTests()
  require '../analytics/main_layout.js'
  require '../analytics/articles.js'
  require '../analytics/gallery_partnerships.js'
  require '../analytics/artworks_filter.js'
  require '../analytics/artist_page.js'
  require '../analytics/home.js'
  require '../analytics/show_page.js'
