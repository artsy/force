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
    new FilterArtworksView
      el: $ '#tag-filter'
      artworksUrl: "#{ARTSY_URL}/api/v1/search/filtered/tag/#{@model.get 'id'}"
      paramsUrl: "#{ARTSY_URL}/api/v1/search/filtered/tag/#{@model.get 'id'}/suggest"
    @$('.filter-artworks-nav-allworks').click()

module.exports.init = ->
  new TagView
    el: $ 'body'
    model: new Tag TAG