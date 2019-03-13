require('backbone').$ = $

routes =
  '/artists': require('../apps/artists/client/index.coffee').init

  '/inquiry': require('../apps/inquiry/client/index.coffee')

for path, init of routes
  $(init) if location.pathname.match path
