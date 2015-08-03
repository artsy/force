ArticlesFeedView = require '../../components/articles_feed/view.coffee'
Articles = require '../../collections/articles.coffee'

module.exports.init = ->
  articles = new Articles sd.ARTICLES
  articles.url = "#{articles.url}?organization_id=#{sd.ORGANIZTION.id}&published=true"
  articlesView = new ArticlesFeedView
    el: $('.organization-feed')
    collection: articles
  articles.fetch()
