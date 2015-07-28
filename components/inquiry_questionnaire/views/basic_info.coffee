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

    @user.set form.data()

    # Temporary hack around API bug surrounding valid hash fields...
    collectorProfile = @user.related().collectorProfile
    id = collectorProfile.id
    collectorProfile.clear()
    collectorProfile.set _.extend id: id, @user.pick(collectorProfile.validHashFields)

    $.when.apply(null, [
      @user.save()
      collectorProfile.save()
    ])
      .always => @next()

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
