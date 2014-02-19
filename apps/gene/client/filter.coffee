{ ARTSY_URL } = require('sharify').data
_ = require 'underscore'
Backbone = require 'backbone'
FilterArtworksView = require '../../../components/filter/artworks/view.coffee'

module.exports = class GeneFilter extends Backbone.View

  initialize: ->
    @$body = $ 'body'
    @$window = $ window
    @document = document.documentElement
    @mainHeaderHeight = $('#main-layout-header').height()
    @filterView = new FilterArtworksView
      el: $ '#gene-filter'
      artworksUrl: "#{ARTSY_URL}/api/v1/search/filtered/gene/#{@model.get 'id'}"
      countsUrl: "#{ARTSY_URL}/api/v1/search/filtered/gene/#{@model.get 'id'}/suggest"
    @artworksMode() if @model.isSubjectMatter() or location.pathname.match('/artworks')

  events:
    'click #gene-filter-all-artists': 'artistMode'
    'click #gene-filter-artworks-nav': 'artworksMode'

  artistMode: ->
    @$body.removeClass 'body-infinite-scroll'
    @$el.attr 'data-state', 'artists'
    @$('#gene-filter-artworks-nav .is-active').removeClass 'is-active'
    return unless @$window.scrollTop() > @$el.offset().top
    _.defer => @document.scrollTop = @$('#gene-artists').offset().top - @mainHeaderHeight - 50

  artworksMode: =>
    @$body.addClass 'body-infinite-scroll'
    @$el.attr 'data-state', 'artworks'
    return unless @$window.scrollTop() > @$el.offset().top
    _.defer => @document.scrollTop = @$('#gene-artworks').offset().top - @mainHeaderHeight - 50