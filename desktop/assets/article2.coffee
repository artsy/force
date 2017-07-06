require('backbone').$ = $

routes =
  '''
  /article2/
  ''': require('../apps/article2/client.js').default

for paths, init of routes
  for path in paths.split('\n')
    $(init) if location.pathname.match path
