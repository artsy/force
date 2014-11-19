Backbone = require 'backbone'
Article = require '../models/artist.coffee'
sd = require('sharify').data

module.exports = class Articles extends Backbone.Collection

  url: "#{sd.POSITRON_URL}/api/articles"

  model: Article

  parse: (data) ->
    { @total, @count } = data
    data.results