StepView = require './step.coffee'
LocationSearch = require '../../../components/location_search/index.coffee'
template = -> require('../templates/basic_info.jade') arguments...

module.exports = class BasicInfo extends StepView
  template: template

  events:
    'click button': 'serialize'

  serialize: (e) ->
    e.preventDefault()
    @user.set @serializeForm()
    @next()

  postRender: ->
    @locationSearch = new LocationSearch el: @$('.js-location-search'), autofocus: false
    @locationSearch.render @user.location()?.cityStateCountry()
    @listenTo @locationSearch, 'location:update', (location) ->
      @user.setLocation location

  remove: ->
    @locationSearch.remove()
    super
