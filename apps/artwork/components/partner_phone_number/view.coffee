_ = require 'underscore'
Backbone = require 'backbone'
analytics = require '../../../../lib/analytics.coffee'
template = -> require('./template.jade') arguments...

logOnce = _.once (locations) ->
  analytics.track.funnel "Displayed 'show phone number' button" if locations.length

module.exports = class PartnerPhoneNumberView extends Backbone.View
  events:
    'click .show-phone-number': 'showPhoneNumber'

  initialize: ->
    @listenTo @collection, 'sync', @render

  showPhoneNumber: (e) ->
    e.preventDefault()

    analytics.snowplowStruct 'phone_number', 'click', @model.get('_id'), 'artwork'

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
