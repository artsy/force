require('backbone').$ = $

routes =
  '/artist/.*': require('../apps/artist/client/index').init

  '/artists': require('../apps/artists/client/index').init

  '/artwork': ->
    if location.pathname.match 'checkout'
      require('../apps/artwork_purchase/client/index').init()
    else
      require('../apps/artwork/client/index').init()

  '/collect': require('../apps/collect/client').init

  '/inquiry': require('../apps/inquiry/client/index')

  '/order': require('../apps/order/client/index').init

for path, init of routes
  $(init) if location.pathname.match path
