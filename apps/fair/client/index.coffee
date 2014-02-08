Backbone          = require 'backbone'
sd                = require('sharify').data
SearchBarView     = require '../../../components/search_bar/view.coffee'
Profile           = require '../../../models/profile.coffee'
Fair              = require '../../../models/fair.coffee'
FairInfoView      = require './info.coffee'

module.exports.FairView = class FairView extends Backbone.View

  sectionHash:
    info: FairInfoView

  initialize: (options) ->
    @setupSearch()

    if @sectionHash[options.currentSection]
      new @sectionHash[options.currentSection]
        model: @model
        fair: options.fair
        el: @$('.fair-page-content')

  setupSearch: ->
    @searchBarView ||= new SearchBarView
      el:        @$('#fair-search-container')
      $input:    @$('#fair-search-input')

module.exports.init = ->
  new FairView
    model: new Profile sd.PROFILE
    fair : new Fair sd.FAIR
    el   : $('#fair-page')
    currentSection: sd.SECTION
