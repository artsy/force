require('backbone').$ = $

routes =
  '/artists': require('../apps/artists/client/index.coffee').init

  '/artwork': ->
    require('../apps/artwork/client/index.coffee').init()
    require('../apps/artwork/components/artists/market_insights.js').default.setupMarketInsights()

  '/collect': require('../apps/collect/client.coffee').init

  '/inquiry': require('../apps/inquiry/client/index.coffee')

  '/order': require('../apps/order/client/index.coffee').init

for path, init of routes
  $(init) if location.pathname.match path
