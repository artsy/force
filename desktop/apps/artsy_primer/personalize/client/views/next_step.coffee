_ = require 'underscore'
StepView = require './step.coffee'
LocationSearchView = require '../../../../../components/location_search/index.coffee'
template = -> require('../../templates/location.jade') arguments...

module.exports = class NextStepView extends StepView

  events:
    'click .artsy-primer-next-step-button': 'advance'

  initialize: ({ @state, @view }) =>

  advance: ->
    @$('.artsy-primer-next-step-progress-inner').width @state.percentDone()
    @view.advance?()
