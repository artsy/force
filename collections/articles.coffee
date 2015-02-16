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
    @where(tier: 1).slice(0, 4)

  feed: ->
    @reject (a) => a in @featured()