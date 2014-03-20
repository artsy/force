_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
Partner       = require '../../../models/partner.coffee'
PartnerLocations = require '../../../collections/partner_locations.coffee'
template      = -> require('../templates/contact.jade') arguments...

module.exports = class PartnerContactView extends Backbone.View
  initialize: (options) ->
    { @profile, @partner } = options
    @render()

  fetchLocations: ->
    @locations = new PartnerLocations()
    @locations.url = "#{@partner.url()}/locations"
    @locations.fetchUntilEnd success: => @render()

  render: ->
    return @fetchLocations() unless @locations
    @$el.html template profile: @profile, partner: @partner, locationGroups: @locations.groupBy('city')
