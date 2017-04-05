StepView = require './step'
Form = require '../../form/index'
LocationSearch = require '../../location_search/index'
template = -> require('../templates/basic_info.jade') arguments...

module.exports = class BasicInfo extends StepView
  template: -> template arguments...

  __events__:
    'click button': 'serialize'

  serialize: (e) ->
    e.preventDefault()

    form = new Form model: @user, $form: @$('form')
    return unless form.isReady()

    form.state 'loading'

    @user.set form.data()
    @user.unset('location') unless @user.has('location')

    @user.save null,
      success: => @next()
      error: form.error.bind form

  postRender: ->
    @locationSearch = new LocationSearch
      el: @$('.js-location-search')
      autofocus: false
      required: @artwork.related().partner.get('pre_qualify')

    @locationSearch.render @user.location()?.cityStateCountry()

    @listenTo @locationSearch, 'location:update', (location) ->
      @user.setLocation location

  remove: ->
    @locationSearch?.remove()
    super
