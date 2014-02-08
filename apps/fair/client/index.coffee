Backbone          = require 'backbone'
sd                = require('sharify').data
SearchBarView     = require '../../../components/search_bar/view.coffee'
Profile           = require '../../../models/profile.coffee'
Fair              = require '../../../models/fair.coffee'

module.exports.FairView = class FairView extends Backbone.View

  initialize: ->
    @setupSearch()

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
