StepView = require './step.coffee'
Form = require '../../form/index.coffee'
LocationSearch = require '../../location_search/index.coffee'
template = -> require('../templates/basic_info.jade') arguments...

module.exports = class BasicInfo extends StepView
  template: template

  __events__:
    'click button': 'serialize'

  serialize: (e) ->
    form = new Form model: @user, $form: @$('form')

    return unless form.start()

    e.preventDefault()

    form.submit e, {}, 'set' # Remove `set` once anon session is fixed
    @next() # Remove, ibid

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
