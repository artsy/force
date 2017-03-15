require('backbone').$ = $

routes =
  '/signup': require('../apps/auth/client/auth.coffee').init

  '/login': require('../apps/auth/client/auth.coffee').init

for path, init of routes
  $(init) if location.pathname.match path
