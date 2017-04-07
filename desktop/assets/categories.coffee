require('backbone').$ = $

routes =
  '''
  /categories$
  /category$
  /gene$
  ''': require('../apps/categories/client.coffee').init

  '''
  /categories2
  ''': require('../apps/categories2/client/index.coffee').init

  '''
  /tag
  ''': require('../apps/tag/client.js').default

  '''
  /gene/.*
  ''': require('../apps/gene/client.coffee').init

for paths, init of routes
  for path in paths.split('\n')
    $(init) if location.pathname.match path
