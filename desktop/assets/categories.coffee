require('backbone').$ = $

routes =
  '''
  /categories$
  /category$
  /gene$
  ''': require('../apps/categories/client.coffee').init

  '''
  /categories2
  ''': -> require('../apps/categories2/client.js').default

  '''
  /tag
  ''': require('../apps/tag/client.coffee').init

  '''
  /gene/.*
  ''': require('../apps/gene/client.coffee').init


for paths, init of routes
  for path in paths.split('\n')
    $(init) if location.pathname.match path
