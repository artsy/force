require('backbone').$ = $
require('../lib/analytics.coffee').load ->
  $ require('../apps/apply/client/index.coffee').init
