Backbone = require 'backbone'
Article = require '../models/article.coffee'
sd = require('sharify').data

module.exports = class Articles extends Backbone.Collection

  url: "#{sd.POSITRON_URL}/api/articles"

  model: Article

  parse: (data = {}) ->
    { @total, @count } = data
    data.results

  featured: ->
    @where(tier: 1).slice(0, 5)

  feed: ->
    @reject (a) => a in @featured()

  orderByIds: (ids) ->
    @reset ids.map ((id) -> @get(id)), @

  sync: (method, model, options) ->
    options.headers = 'X-Access-Token': ''
    super
