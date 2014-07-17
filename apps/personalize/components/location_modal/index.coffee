_ = require 'underscore'
ModalView = require '../../../../components/modal/view.coffee'
LocationSearchView = require '../../../../components/location_search/index.coffee'

template = -> require('./template.jade') arguments...

module.exports = class LocationModalView extends ModalView
  className: 'personalize-location-modal'

  template: ->
    template arguments...

  events: -> _.extend super,
    'submit form': 'submit'
    'click button': 'submit'

  initialize: (options = {}) ->
    { @user } = options
    throw new Error 'Requires a user model' unless @user?
    super

  submit: (e) ->
    e.preventDefault()
    @close()

  update: (location) ->
    @user.setLocation location
    @user.save null, success: => @close()
    @$('button').
      attr('data-state', 'loading').
      prop('disabled', true)

  remove: ->
    @locationSearchView.remove()
    super

  postRender: ->
    @locationSearchView = new LocationSearchView el: @$('#personalize-location-search')
    @locationSearchView.render @user.location()?.cityStateCountry()
    @listenTo @locationSearchView, 'location:update', @update
