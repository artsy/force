_                   = require 'underscore'
Backbone            = require 'backbone'
ModalView           = require '../modal/view.coffee'
LocationSearchView  = require '../location_search/index.coffee'
GeoFormatter        = require 'geoformatter'
Form                = require '../mixins/form.coffee'
mediator            = require '../../lib/mediator.coffee'

templateMap =
  initial       : -> require('./templates/initial.jade') arguments...
  questionnaire : -> require('./templates/questionnaire.jade') arguments...
  signup        : -> require('./templates/signup.jade') arguments...
  login         : -> require('./templates/login.jade') arguments...

module.exports = class Questionnaire extends ModalView
  _.extend @prototype, Form

  className: 'after-inquiry'

  template: ->
    templateMap[@state.get 'mode'] arguments...

  events: -> _.extend super,
    'click a[data-mode]'                        : 'toggleMode'
    'click .after-inquiry-initial-submit'       : 'advance'
    'submit #after-inquiry-questionnaire-form'  : 'done'
    'click #after-inquiry-questionnaire-submit' : 'done'
    'submit #after-inquiry-auth-form'           : 'auth'
    'click #after-inquiry-auth-submit'          : 'auth'

  initialize: (options) ->
    { @user } = options

    @user.approximateLocation()

    @state = new Backbone.Model mode: 'initial'

    @templateData = user: @user

    @listenTo @state, 'change:mode', @reRender

    super

  advance: (e) ->
    @user.set collector_level: parseInt($(e.currentTarget).data 'value')
    @state.set mode: 'questionnaire'

  # Done with the questionnaire:
  # If the user is logged in then send the inquiry and save their information
  # If the user is not logged in then send the inquiry and proceed to the auth step
  #
  # Note that we don't want to use the actual transitionEnd events here
  # because they aren't always accurate.
  done: (e) ->
    return unless @validateForm()

    e.preventDefault()

    @user.set @serializeForm()
    @$('button').attr 'data-state', 'loading'

    # Logged in
    if @user.id
      mediator.trigger 'inquiry:send'
      # If the user is logged in then just save the data and close the modal
      @user.save null, success: =>
        @$el.attr 'data-state', 'closed'
        # Wait for a moment before closing completely
        _.delay (=> @close()), 1000
        # And we're done...
    # Logged out
    else
      mediator.trigger 'inquiry:send'
      mediator.on 'inquiry:error', =>
        @$el.attr 'data-state', 'closed'
        _.delay (=> @close()), 1000
        # And we're done...
      , this
      mediator.on 'inquiry:success', =>
        @$el.attr 'data-state', 'closed'
        # Wait for modal to close before re-rendering
        _.delay (=> @state.set mode: 'signup'), 800
        # Wait for re-render before re-opening
        _.delay (=> @$el.attr 'data-state', 'open'), 1600
      , this

  auth: (e) ->
    return unless @validateForm()

    e.preventDefault()

    @$('button').attr 'data-state', 'loading'

    @user.set @serializeForm()
    # Signup or login
    @user[@state.get 'mode']
      success : @authSuccess
      error   : @authError

  authError: (model, response, options) =>
    @$('button').attr 'data-state', 'error'
    @$('.auth-errors').text(@errorMessage response)

  authSuccess: (model, response, options) =>
    attrs = _.omit model.get('user'), @user.keys()...
    @user.set attrs
    @user.unset 'password'
    # We have to save because you cannot
    # login or signup with extra attributes
    @user.save null, success: =>
      @user.refresh success: -> location.reload()
      # And we're done...

  toggleMode: (e) ->
    e.preventDefault()
    @state.set 'mode', $(e.target).data('mode')

  reRender: ->
    @$el.attr 'data-mode', (mode = @state.get 'mode')

    if mode is 'questionnaire'
      @once 'rerendered', =>
        @attachLocationSearch()

    super

  attachLocationSearch: ->
    @locationSearchView = new LocationSearchView el: @$('#after-inquiry-collector-location'), autofocus: false
    @locationSearchView.render @user.location()?.cityStateCountry()
    @listenTo @locationSearchView, 'location:update', (location) =>
      @user.setGeo(new GeoFormatter location)

  remove: ->
    mediator.off null, null, this
    @locationSearchView?.remove()
    super
