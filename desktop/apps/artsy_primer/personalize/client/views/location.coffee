_ = require 'underscore'
StepView = require './step'
LocationSearchView = require '../../../../../components/location_search/index'
template = -> require('../../templates/location.jade') arguments...

module.exports = class LocationView extends StepView

  update: (location) ->
    @user.setLocation location
    @advance()

  remove: ->
    @locationSearchView.remove()
    super

  render: ->
    @$el.html template(state: @state)
    @postRender()
    this

  postRender: ->
    @locationSearchView = new LocationSearchView el: @$('#artsy-primer-personalize-location-search')
    @locationSearchView.render @user.location()?.cityStateCountry()
    @listenTo @locationSearchView, 'location:update', @update
