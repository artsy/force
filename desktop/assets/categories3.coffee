require('backbone').$ = $

routes =
  '''
  /categories3/
  ''': require('../apps/categories3/client.js').default

for paths, init of routes
  for path in paths.split('\n')
    $(init) if location.pathname.match path
