require('backbone').$ = $

routes =
  '/artists': require('../apps/artists/client/index.coffee').init

  '/artwork': require('../apps/artwork/client/index.coffee').init

  '/collect': require('../apps/collect/client.coffee').init

  '/inquiry': require('../apps/inquiry/client/index.coffee')

for path, init of routes
  $(init) if location.pathname.match path
