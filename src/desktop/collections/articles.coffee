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
    # TODO: REMOVE WHEN NEWS LAUNCHES
    isAdmin = sd.CURRENT_USER && sd.CURRENT_USER.type is 'Admin'
    sliced = if isAdmin then 1 else 4

    @where(tier: 1).slice(0, sliced)

  feed: ->
    featured = @featured()
    @reject (a) ->
      a in featured

  biography: ->
    @select((article) -> article.get('biography_for_artist_id'))?[0]

  orderByIds: (ids) ->
    @reset ids.map ((id) -> @get(id)), @

  sync: (method, model, options) ->
    options.headers = 'X-Access-Token': ''
    super
