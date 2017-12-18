require('backbone').$ = $

routes =
  '''
  /categories$
  /category$
  /gene$
  ''': require('../apps/categories/client.js').default

  '''
  /tag
  ''': require('../apps/tag/client.js').default.setupTagPage

  '''
  /gene/.*
  ''': require('../apps/gene/client.js').default.setupGenePage

for paths, init of routes
  for path in paths.split('\n')
    $(init) if location.pathname.match path
