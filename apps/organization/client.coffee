ArticlesFeedView = require '../../components/articles_feed/view.coffee'
Articles = require '../../collections/articles.coffee'

module.exports.init = ->
  articlesView = new ArticlesFeedView
    el: $('#organization-feed')
    collection: new Articles sd.ARTICLES
  articlesView.render()
