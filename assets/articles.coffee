require('backbone').$ = $
if location.pathname is '/magazine'
  $ require('../apps/articles/client/magazine.coffee').init
else
  require '../apps/articles/client/analytics.coffee'
  $ require('../apps/articles/client/show.coffee').init