sd = require('sharify').data
require('backbone').$ = $
if location.pathname is '/articles'
  $ require('../apps/articles/client/articles.coffee').init
else if location.pathname.match '/article/.*'
  $ require('../apps/articles/client/show.coffee').init
else if location.pathname.match(sd.VERTICAL?.slug or null)
  $ require('../apps/articles/client/vertical.coffee').init
