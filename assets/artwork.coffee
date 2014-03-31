require '../components/main_layout/client.coffee'
require('../lib/analytics.coffee').load ->
  $ require('../apps/artwork/client/index.coffee').init