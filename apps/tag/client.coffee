{ API_URL, TAG } = require('sharify').data
Tag = require '../../models/tag.coffee'
Backbone = require 'backbone'
FilterArtworksView = require '../../components/filter/artworks/view.coffee'
scrollFrame = require 'scroll-frame'

module.exports.TagView = class TagView extends Backbone.View

  initialize: ->
    @filterView = new FilterArtworksView
      el: $ '#tag-filter'
      artworksUrl: "#{API_URL}/api/v1/search/filtered/tag/#{@model.get 'id'}"
      countsUrl: "#{API_URL}/api/v1/search/filtered/tag/#{@model.get 'id'}/suggest"
      urlRoot: "tag/#{@model.id}"
      title: "Artwork related to \"#{@model.get('name')}\""
    @filterView.reset()

module.exports.init = ->
  new TagView
    el: $ 'body'
    model: tag = new Tag TAG
  Backbone.history.start pushState: true
  scrollFrame '#tag-filter a'