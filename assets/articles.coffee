require('backbone').$ = $
if location.pathname is '/articles'
  $ require('../apps/articles/client/articles.coffee').init
else if location.pathname.match '/article/.*'
  $ require('../apps/articles/client/show.coffee').init