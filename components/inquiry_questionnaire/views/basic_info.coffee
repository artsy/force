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
    return unless form.start()
    e.preventDefault()
    form.state 'loading'

    @user.save(form.data())
      .always => @next()

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
