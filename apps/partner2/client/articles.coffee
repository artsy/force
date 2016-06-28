ArticlesGridView = require '../../../components/articles_grid/view.coffee'
Articles = require '../../../collections/articles.coffee'
sd = require('sharify').data

module.exports = class ArticlesAdapter
  constructor: ({ profile, partner, cache, el }) ->
    collection = new Articles
    collection.url = "#{collection.url}/?partner_id=#{partner.get('_id')}&published=true&limit=12&sort=-published_at"
    view = new ArticlesGridView el: el, collection: collection
    el.html '<div class="loading-spinner"></div>'
    collection.fetch()
    view
