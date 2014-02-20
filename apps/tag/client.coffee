{ ARTSY_URL, TAG } = require('sharify').data
Tag = require '../../models/tag.coffee'
Backbone = require 'backbone'
FilterArtworksView = require '../../components/filter/artworks/view.coffee'

module.exports.TagView = class TagView extends Backbone.View

  initialize: ->
    @filterView = new FilterArtworksView
      el: $ '#tag-filter'
      artworksUrl: "#{ARTSY_URL}/api/v1/search/filtered/tag/#{@model.get 'id'}"
      countsUrl: "#{ARTSY_URL}/api/v1/search/filtered/tag/#{@model.get 'id'}/suggest"
      urlRoot: "gene/#{@model.id}"
    @filterView.reset()

module.exports.init = ->
  new TagView
    el: $ 'body'
    model: tag = new Tag TAG
  Backbone.history.start pushState: true