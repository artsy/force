Backbone          = require 'backbone'
sd                = require('sharify').data
SearchBarView     = require '../../../components/search_bar/view.coffee'
Profile           = require '../../../models/profile.coffee'
Fair              = require '../../../models/fair.coffee'
FairInfoView      = require './info.coffee'
FairPostsView     = require './posts.coffee'
FairSearchView    = require './search.coffee'
analytics         = require '../../../lib/analytics.coffee'

module.exports.FairView = class FairView extends Backbone.View

  sectionHash:
    info   : FairInfoView
    posts  : FairPostsView
    search : FairSearchView

  initialize: (options) ->
    @fair = options.fair
    @setupSearch @model, @fair

    if @sectionHash[options.currentSection]
      new @sectionHash[options.currentSection]
        model: @model
        fair : @fair
        el   : @$('.fair-page-content')

  setupSearch: (profile, fair) ->
    @searchBarView ||= new SearchBarView
      el     : @$('#fair-search-container')
      $input : @$('#fair-search-input')
      fairId : @fair.get('id')
    @searchBarView.on 'search:entered', (term) => window.location = "#{@model.href()}/search?q=#{term}"
    @searchBarView.on 'search:selected', (e, model) ->
      return false unless model
      model.updateForFair fair
      analytics.track.click "Selected item from fair search", { label: analytics.modelNameAndIdToLabel(model.get('display_model'), model.get('id')), query: @query }
      @selected = true
      window.location = model.get('location')

module.exports.init = ->
  new FairView
    model: new Profile sd.PROFILE
    fair : new Fair sd.FAIR
    el   : $('#fair-page')
    currentSection: sd.SECTION
