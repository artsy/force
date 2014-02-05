_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
Partner       = require '../../../models/partner.coffee'
PartnerLocations = require '../../../collections/partner_locations.coffee'
template      = -> require('../templates/contact.jade') arguments...

module.exports = class PartnerContactView extends Backbone.View
  initialize: (options) ->
    @render()

  fetchLocations: ->
    partner = new Partner @model.get('owner')
    @locations = new PartnerLocations()
    @locations.url = "#{partner.url()}/locations"
    @locations.fetchUntilEnd # probably don't need pagination here
      success: => @render()

  render: ->
    return @fetchLocations() unless @locations
    @$el.html $( template locations: @locations.models)
