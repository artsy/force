ArticlesFeedView = require '../../../components/articles_feed/view.coffee'
Articles = require '../../../collections/articles.coffee'
sd = require('sharify').data

module.exports = class ArticlesAdapter
  constructor: ({ profile, partner, cache, el }) ->
    collection = new Articles
    collection.url = "https://writer.artsy.net/api/articles/?partner_id=#{partner.get('_id')}&published=true&limit=5&sort=-published_at"
    view = new ArticlesFeedView el: el, collection: collection
    el.html '<div class="loading-spinner"></div>'
    el.addClass view.className
    collection.fetch()
    view

# TODO: Better way to toggle the articles tab
# $ ->
#   $.ajax
#     url: "https://writer.artsy.net/api/articles"
#     data:
#       sort: '-published_at'
#       partner_id: sd.PROFILE && sd.PROFILE.owner._id
#       published: true
#       limit: 1
#     success: (res) ->
#       return if res.count is 0
#       $('.partner-tabs [href*=articles]').prev().show()
#       $('.partner-tabs [href*=articles]').show()
