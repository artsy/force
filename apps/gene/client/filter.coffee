{ ARTSY_URL } = require('sharify').data
_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../components/filter/mediator.coffee'
FilterArtworksNav = require '../../../components/filter/artworks_nav/view.coffee'
FilterFixedHeader = require '../../../components/filter/fixed_header/view.coffee'
FilterArtworksView = require '../../../components/filter/artworks/view.coffee'

module.exports = class GeneFilter extends Backbone.View

  initialize: ->
    new FilterArtworksNav
      el: $ '#gene-filter-artworks-nav'
    new FilterFixedHeader
      el: $ '#gene-filter-nav'
    new FilterArtworksView
      el: $ '#gene-artworks-container'
      url: "#{ARTSY_URL}/api/v1/search/filtered/gene/#{@model.get 'id'}"
    mediator.on 'filter', @renderCounts
    mediator.on 'filter', @artworksMode
    @$('.filter-artworks-nav-allworks').click() if @model.isSubjectMatter()

  artworksMode: =>
    @$el.attr 'data-state', 'artworks'
    @$('#gene-filter-all-artists').removeClass 'is-active'

  renderCounts: (params) =>
    @model.fetchFilterSuggest params, success: (m, res) =>
      mediator.trigger 'counts', res
      @$('#gene-filter-nav-left-num').html " &mdash; #{res.total} Works"

  events:
    'click #gene-filter-all-artists': 'artistMode'

  artistMode: ->
    @$el.attr 'data-state', ''
    @$('#gene-filter-all-artists').addClass 'is-active'
    @$('#gene-filter-artworks-nav .is-active').removeClass 'is-active'