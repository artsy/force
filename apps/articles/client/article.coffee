sd = require('sharify').data
Article = require '../../../models/article.coffee'
Articles = require '../../../collections/articles.coffee'
ArticleView = require '../../../components/article/view.coffee'

module.exports.init = ->
  article = new Article sd.ARTICLE
  new ArticleView
    el: $('body')
    article: article
