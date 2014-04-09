_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
Partner       = require '../../../models/partner.coffee'
PartnerLocations  = require '../../../collections/partner_locations.coffee'
template          = -> require('../templates/contact.jade') arguments...
locationTemplate  = -> require('../templates/location.jade') arguments...
contactTemplate   = -> require('../templates/contact_info.jade') arguments...

module.exports = class PartnerContactView extends Backbone.View
  initialize: (options) ->
    { @profile, @partner } = options
    @locations = new PartnerLocations()
    @listenTo @partner, 'sync', @renderAdditionalInfo
    @fetchLocations()
    @render()

  fetchLocations: ->
    @locations.url = "#{@partner.url()}/locations"
    @locations.fetchUntilEnd success: => @renderLocations()

  render: ->
    @$el.html template profile: @profile, partner: @partner

  renderLocations: ->
    locationStrings = []
    _.each @locations.groupBy('city'), (locations, city) ->
      _.each locations, (location) ->
        locationStrings.push locationTemplate(location: location)
    @$('.partner-locations').html locationStrings.join("")

  renderAdditionalInfo: ->
    @$('.partner-contact-info').html contactTemplate(profile: @profile, partner: @partner)
