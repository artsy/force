require('backbone').$ = $

routes =
  '''
  /categories$
  /category$
  /gene$
  ''': require('../apps/categories/client').init

  '''
  /categories2
  ''': require('../apps/categories2/client/index').init

  '''
  /tag
  ''': require('../apps/tag/client').init

  '''
  /gene/.*
  ''': require('../apps/gene/client').init

for paths, init of routes
  for path in paths.split('\n')
    $(init) if location.pathname.match path
