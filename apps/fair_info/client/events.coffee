Backbone = require 'backbone'
sd = require('sharify').data
BlurbView = require '../../../components/blurb/view.coffee'
geo = require '../../../components/geo/index.coffee'
openMapModal = require '../../../components/map_modal/index.coffee'
FairEvents = require '../../../collections/fair_events.coffee'
template = -> require('../templates/map_modal.jade') arguments...

module.exports = class FairInfoEvents extends Backbone.View
  events:
    'click .js-open-fair-events': 'initializeModal'

  initialize: (options) ->
    @events = new FairEvents sd.FAIREVENTS, {fairId: sd.FAIR.id}
    @initializeBlurb()

  initializeBlurb: ->
    if $('.fair-info-event-item').length > 0
      $.each($('.fair-info-event-item'), (index, value) ->
        new BlurbView
          el: $('.fair-info-event-item-details__description')[index]
          updateOnResize: true
          lineCount: 3
          resizeHeight: '100%'
        )

  initializeModal: (e) ->
    e.preventDefault()
    event = @events.get $(e.currentTarget).attr('data-id')

    if event.get('venue_address')
      geo.lookUpAddress event.get('venue_address'), (result) ->
        openMapModal({model: event, latlng: result, template: template, location: event.get('venue_address'), element: '.js-map-modal-fair-event-map' })
