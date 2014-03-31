require '../components/main_layout/client.coffee'
require('../lib/analytics.coffee').load ->
  console.log 'loaded'
  $ require('../apps/artwork/client/index.coffee').init