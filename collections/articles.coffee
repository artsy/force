Backbone = require 'backbone'
sd = require('sharify').data
Article = require '../models/article.coffee'

module.exports = class Articles extends Backbone.Collection
  url: "#{sd.POSITRON_URL}/api/articles"

  model: Article

  parse: (data = {}) ->
    { @total, @count } = data
    data.results

  featured: ->
    @where(tier: 1).slice(0, 4)

  featuredToVertical: (vertical) ->
    @select (article) ->
      if vertical.get('featured_article_ids')
        article.get('id') in vertical.get('featured_article_ids')

  feed: ->
    featured = @featured()
    @reject (a) ->
      a in featured

  sync: (method, model, options) ->
    options.headers = 'X-Access-Token': ''
    super
