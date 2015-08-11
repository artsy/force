StepView = require './step.coffee'
Form = require '../../form/index.coffee'
LocationSearch = require '../../location_search/index.coffee'
template = -> require('../templates/basic_info.jade') arguments...

module.exports = class BasicInfo extends StepView
  template: -> template arguments...

  __events__:
    'click button': 'serialize'

  serialize: (e) ->
    form = new Form model: @user, $form: @$('form')
    form.submit e, success: =>
      @next()

  postRender: ->
    @locationSearch = new LocationSearch
      el: @$('.js-location-search')
      autofocus: false
      required: !@user.get('prequalified')

    @locationSearch.render @user.location()?.cityStateCountry()

    @listenTo @locationSearch, 'location:update', (location) ->
      @user.setLocation location

  remove: ->
    @locationSearch?.remove()
    super
