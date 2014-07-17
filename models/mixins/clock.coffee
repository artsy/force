Backbone = require 'backbone'
moment = require 'moment'
sd = require('sharify').data

module.exports =
  calculateOffsetTimes: (options = {}) ->
    model = new Backbone.Model()
    model.url = "#{sd.API_URL}/api/v1/system/time"
    model.fetch
      success: (response) =>
        offset = moment().diff(response.get('time'))
        @set('offsetStartAtMoment', moment(@get 'start_at').add(offset))
        @set('offsetEndAtMoment', moment(@get 'end_at').add(offset))
        @updateState()
        options.success() if options?.success?
      error: options?.error

  updateState: ->
    @set('auctionState', (
      if moment().isAfter(@get 'offsetEndAtMoment')
        'closed'
      else if moment().isAfter(@get 'offsetStartAtMoment') and moment().isBefore(@get 'offsetEndAtMoment')
        'open'
      else if moment().isBefore(@get 'offsetStartAtMoment')
        'preview'
    ))
