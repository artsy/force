routes =
  '/order2': require('../apps/order2/client').init

for path, init of routes
  $(init) if location.pathname.match path
