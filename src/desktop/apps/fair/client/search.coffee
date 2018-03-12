Backbone = require 'backbone'

module.exports = class SearchResults extends Backbone.View

  initialize: (options) ->
    @targetBlankLinks()

  # Links that take out out of the fair microsite open in a new window
  targetBlankLinks: ->
    @$('.artsy-search-results a').attr target: "_blank"
