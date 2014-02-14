{ ARTSY_URL } = require('sharify').data
_ = require 'underscore'
Backbone = require 'backbone'
FilterArtworksView = require '../../../components/filter/artworks/view.coffee'

module.exports = class GeneFilter extends Backbone.View

  initialize: ->
    new FilterArtworksView
      el: $ '#gene-filter'
      artworksUrl: "#{ARTSY_URL}/api/v1/search/filtered/gene/#{@model.get 'id'}"
      countsUrl: "#{ARTSY_URL}/api/v1/search/filtered/gene/#{@model.get 'id'}/suggest"
    @$('.filter-artworks-nav-allworks').click() if @model.isSubjectMatter()

  events:
    'click #gene-filter-all-artists': 'artistMode'
    'click #gene-filter-artworks-nav': 'artworksMode'

  artistMode: ->
    @$el.attr 'data-state', ''
    @$('#gene-filter-all-artists').addClass 'is-active'
    @$('#gene-filter-artworks-nav .is-active').removeClass 'is-active'

  artworksMode: =>
    @$el.attr 'data-state', 'artworks'
    @$('#gene-filter-all-artists').removeClass 'is-active'