_ = require 'underscore'
Backbone = require 'backbone'
FilterArtworksView = require '../../../components/filter/artworks/view.coffee'
{ ARTSY_URL } = require('sharify').data

module.exports = class FairFilterView extends Backbone.View

  initialize: ->
    @filterView = new FilterArtworksView
      el: $ '#fair-filter'
      artworksUrl: "#{ARTSY_URL}/api/v1/search/filtered/fair/#{@model.get 'id'}"
      countsUrl: "#{ARTSY_URL}/api/v1/search/filtered/fair/#{@model.get 'id'}/suggest"