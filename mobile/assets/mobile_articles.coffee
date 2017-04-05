require 'jquery'
require('backbone').$ = $
articleIndex = require '../apps/articles/client/articles'
ArticleView = require '../components/article/client/view'

$ ->
  if location.pathname is '/articles'
    articleIndex.init()
  else if location.pathname.match '/article/'
    new ArticleView
