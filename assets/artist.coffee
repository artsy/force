require('backbone').$ = $
require('../lib/analytics.coffee').load ->
  $ require('../apps/artist/client/index.coffee').init