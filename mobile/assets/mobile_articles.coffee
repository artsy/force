require 'jquery'
require('backbone').$ = $
articleIndex = require '../apps/articles/client/articles.coffee'
sectionView = require '../apps/articles/client/section.coffee'
ArticleView = require '../components/article/client/view.coffee'

$ ->
  if location.pathname is '/articles'
    articleIndex.init()
  else if location.pathname is '/venice-biennale-2015'
    sectionView.init()
  else if location.pathname.match '/article/'
    new ArticleView
