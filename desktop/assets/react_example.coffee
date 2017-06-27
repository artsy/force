require('backbone').$ = $

routes =
  '''
  /react-example/
  ''': require('../apps/react_example/client.js').default

for paths, init of routes
  for path in paths.split('\n')
    $(init) if location.pathname.match path
