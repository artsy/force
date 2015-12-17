Backbone = require 'backbone'
sd = require('sharify').data
BlurbView = require '../../../components/blurb/view.coffee'

module.exports = class FairInfoEvents extends Backbone.View

  initialize: (options) ->
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
