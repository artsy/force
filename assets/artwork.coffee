require('backbone').$  = $
require('../lib/analytics.coffee').load ->
  $ require('../apps/artwork/client/index.coffee').init