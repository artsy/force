sd = require('sharify').data
require('backbone').$ = $

$ ->
  if location.pathname is '/articles'
    require('../apps/articles/client/magazine.coffee').init()
  else if location.pathname is '/' + sd.SECTION?.slug
    require('../apps/articles/client/section.coffee').init()
  else if location.pathname.match '/article/.*'
    require('../apps/articles/client/article.coffee').init()
