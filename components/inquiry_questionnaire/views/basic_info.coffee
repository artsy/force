StepView = require './step.coffee'
Serializer = require '../../form/serializer.coffee'
LocationSearch = require '../../location_search/index.coffee'
template = -> require('../templates/basic_info.jade') arguments...

module.exports = class BasicInfo extends StepView
  template: template

  __events__:
    'click button': 'serialize'

  serialize: (e) ->
    e.preventDefault()
    serializer = new Serializer @$('form')
    @user.save serializer.data()
    @next()

  postRender: ->
    @locationSearch = new LocationSearch el: @$('.js-location-search'), autofocus: false
    @locationSearch.render @user.location()?.cityStateCountry()
    @listenTo @locationSearch, 'location:update', (location) ->
      @user.setLocation location

  remove: ->
    @locationSearch?.remove()
    super
