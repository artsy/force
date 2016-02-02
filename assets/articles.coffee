sd = require('sharify').data
require('backbone').$ = $
articleIndex = require '../apps/articles/client/articles.coffee'
articleShow = require '../apps/articles/client/article.coffee'

$ ->
  if location.pathname is '/articles'
    articleIndex.init()
  else if location.pathname.match '/article/.*'
    articleShow.init()
