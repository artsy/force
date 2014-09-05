Backbone = require 'backbone'
analytics = require '../../../../lib/analytics.coffee'
template = -> require('./template.jade') arguments...

module.exports = class PartnerPhoneNumberView extends Backbone.View
  events:
    'click .show-phone-number': 'showPhoneNumber'

  initialize: (options = {}) ->
    @locations = @collection.filter (location) -> location.get('phone')?.length
    if @locations.length then @render() else @remove()

  showPhoneNumber: (e) ->
    e.preventDefault()
    @$('.show-phone-number').remove()
    @$('.partner-phone-numbers').show()

  render: ->
    @$el.html template(artwork: @model, locations: @locations)
    analytics.track.funnel "Displayed 'show phone number' button"
    this
