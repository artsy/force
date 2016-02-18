ArticlesFeedView = require '../../../components/articles_feed/view.coffee'
Articles = require '../../../collections/articles.coffee'
sd = require('sharify').data

module.exports = class ArticlesAdapter
  constructor: ({ profile, partner, cache, el }) ->
    collection = new Articles
    collection.url = "#{collection.url}/?partner_id=#{partner.get('_id')}&published=true&limit=5&sort=-published_at"
    view = new ArticlesFeedView el: el, collection: collection
    el.html '<div class="loading-spinner"></div>'
    el.addClass view.className
    collection.fetch()
    view