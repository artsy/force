require('backbone').$ = $

routes =
  '/react-example': require('../apps/react_example/client.js').default()

for path, init of routes
  $(init) if location.pathname.match path
