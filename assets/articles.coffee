sd = require('sharify').data
require('backbone').$ = $
$ require('../apps/articles/client/index.coffee').init
if location.pathname is '/articles'
  $ require('../apps/articles/client/articles.coffee').init
else if location.pathname.match '/article/.*'
  $ require('../apps/articles/client/show.coffee').init