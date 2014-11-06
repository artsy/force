require('backbone').$ = $
require('../lib/analytics.coffee').load ->
  $ require('../apps/partner_application/client/index.coffee').init
