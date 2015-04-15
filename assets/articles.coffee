require('backbone').$ = $
if location.pathname is '/articles'
  $ require('../apps/articles/client/articles.coffee').init
else
  $ require('../apps/articles/client/show.coffee').init