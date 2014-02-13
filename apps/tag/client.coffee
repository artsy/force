{ ARTSY_URL, TAG } = require('sharify').data
Tag = require '../../models/tag.coffee'
_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../components/filter/mediator.coffee'
FilterArtworksNav = require '../../components/filter/artworks_nav/view.coffee'
FilterFixedHeader = require '../../components/filter/fixed_header/view.coffee'
FilterArtworksView = require '../../components/filter/artworks/view.coffee'

module.exports.TagView = class TagView extends Backbone.View

  initialize: ->
    new FilterFixedHeader
      el: $ '#tag-filter-nav'
    new FilterArtworksNav
      el: $ '#tag-filter-artworks-nav'
    new FilterArtworksView
      el: $ '#tag-artworks-container'
      url: "#{ARTSY_URL}/api/v1/search/filtered/tag/#{@model.get 'id'}"
    mediator.on 'filter', @renderCounts
    @$('.filter-artworks-nav-allworks').click()

  renderCounts: (params) =>
    @model.fetchFilterSuggest params, success: (m, res) =>
      mediator.trigger 'counts', res
      @$('#tag-filter-nav-left-num').html " &mdash; #{res.total} Works"

module.exports.init = ->
  new TagView
    el: $ 'body'
    model: new Tag TAG