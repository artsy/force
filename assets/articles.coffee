require('backbone').$ = $
unless location.pathname is '/articles'
  require '../apps/articles/client/analytics.coffee'
  $ require('../apps/articles/client/show.coffee').init