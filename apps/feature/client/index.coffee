_              = require 'underscore'
sd             = require('sharify').data
Backbone       = require 'backbone'
Feature        = require '../../../models/feature.coffee'
artworkColumns = -> require('../../../components/artwork_columns/template.jade') arguments...
setsTemplate   = -> require('../templates/sets.jade') arguments...

module.exports.FeatureView = class FeatureView extends Backbone.View

  initialize: (options) ->
    @model.fetchSets
      success: (sets) =>
        @$('.feature-content').append setsTemplate { sets: sets }
      error: (error) ->
        console.log "error: #{error}"

module.exports.init = ->

  new FeatureView
    el   : $('#feature')
    model: new Feature sd.FEATURE
