_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Show = require '../models/show.coffee'

module.exports = class ShowsFeed extends Backbone.Collection

  model: Show

  url: ->  "#{sd.API_URL}/api/v1/shows/feed"

  parse: (res) ->
    @lastCursor = @nextCursor
    @nextCursor = res.next
    res.results

  nextPage: (options = {}) =>
    return false if @lastCursor? and (not @nextCursor? or @lastCursor is @nextCursor)
    @fetch _.extend options,
      data: _.extend({ cursor: @nextCursor }, options.data)
      remove: false
