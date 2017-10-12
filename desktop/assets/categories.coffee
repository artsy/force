require('backbone').$ = $

routes =
  '''
  /categories$
  /category$
  /gene$
  ''': require('../apps/categories/client.coffee').init

  '''
  /tag
  ''': require('../apps/tag/client.js').default.init

  '''
  /gene/.*
  ''': require('../apps/gene/client.js').default.setupGenePage

for paths, init of routes
  for path in paths.split('\n')
    $(init) if location.pathname.match path
