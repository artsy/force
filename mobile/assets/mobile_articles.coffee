require 'jquery'
require('backbone').$ = $
articleIndex = require '../apps/articles/client/articles.coffee'
ArticleView = require '../components/article/client/view.coffee'

$ ->
  if location.pathname is '/articles'
    articleIndex.init()
  else if location.pathname.match '/article/'
    new ArticleView
