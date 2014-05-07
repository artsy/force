{ API_URL, TAG } = require('sharify').data
Tag = require '../../models/tag.coffee'
Backbone = require 'backbone'
FilterArtworksView = require '../../components/filter/artworks/view.coffee'
iframePopover = require '../../components/iframe_popover/index.coffee'

module.exports.TagView = class TagView extends Backbone.View

  initialize: ->
    @filterView = new FilterArtworksView
      el: $ '#tag-filter'
      artworksUrl: "#{API_URL}/api/v1/search/filtered/tag/#{@model.get 'id'}"
      countsUrl: "#{API_URL}/api/v1/search/filtered/tag/#{@model.get 'id'}/suggest"
      urlRoot: "tag/#{@model.id}"
    @filterView.reset()

module.exports.init = ->
  new TagView
    el: $ 'body'
    model: tag = new Tag TAG
  Backbone.history.start pushState: true
  iframePopover $('#tag-filter')
