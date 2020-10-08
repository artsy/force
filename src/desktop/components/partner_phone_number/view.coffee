_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...

logOnce = _.once (locations) ->
  window.analytics.track("Displayed 'show phone number' button", {
    nonInteraction: 1,
  }) if locations.length

module.exports = class PartnerPhoneNumberView extends Backbone.View
  events:
    'click .show-phone-number': 'showPhoneNumber'

  initialize: ->
    @listenTo @collection, 'sync', @render

  showPhoneNumber: (e) ->
    e.preventDefault()

    @$('.show-phone-number').remove()
    @$('.partner-phone-numbers').show()

  locations: ->
    @collection.filter (location) ->
      location.get('phone')?.length

  render: ->
    @$el.html template
      artwork: @model
      locations: locations = @locations()

    logOnce locations

    this
