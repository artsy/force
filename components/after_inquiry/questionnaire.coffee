_                   = require 'underscore'
Backbone            = require 'backbone'
ModalView           = require '../modal/view.coffee'
LocationSearchView  = require '../location_search/index.coffee'
GeoFormatter        = require 'geoformatter'
Form                = require '../mixins/form.coffee'
mediator            = require '../../lib/mediator.coffee'
analytics           = require '../../lib/analytics.coffee'
BookmarksView       = require '../bookmarks/view.coffee'
Introduction        = require './introduction.coffee'

templateMap =
  initial       : -> require('./templates/initial.jade') arguments...
  questionnaire : -> require('./templates/questionnaire.jade') arguments...
  signup        : -> require('./templates/signup.jade') arguments...
  login         : -> require('./templates/login.jade') arguments...

stateEventMap =
  initial       : 'Viewed after inquiry initial step'
  questionnaire : 'Viewed after inquiry questionnaire step'
  signup        : 'Viewed after inquiry signup form'
  login         : 'Viewed after inquiry login form'

module.exports = class Questionnaire extends ModalView
  _.extend @prototype, Form

  className: 'after-inquiry'

  template: ->
    templateMap[@state.get 'mode'] arguments...

  events: -> _.extend super,
    # Prevents clicks on the backdrop from closing the contact form
    'click.handler .modal-backdrop'             : undefined
    'click a[data-mode]'                        : 'toggleMode'
    'click .after-inquiry-initial-submit'       : 'advance'
    'submit #after-inquiry-questionnaire-form'  : 'done'
    'click #after-inquiry-questionnaire-submit' : 'done'
    'submit #after-inquiry-auth-form'           : 'auth'
    'click #after-inquiry-auth-submit'          : 'auth'
    'click #auth-skip'                          : 'skip'

  initialize: (options) ->
    { @user, @inquiry } = options

    @user.approximateLocation()
    @templateData = user: @user

    @state = new Backbone.Model mode: 'initial'
    @listenTo @state, 'change:mode', @reRender
    @listenTo @state, 'change:mode', @logState

    @logState()

    super

  skip: (e) ->
    e.preventDefault()
    analytics.track.funnel 'Declined authentication during after inquiry flow'
    @close()

  advance: (e) ->
    collectorLevel = parseInt($(e.currentTarget).data 'value')
    @user.set collector_level: collectorLevel
    analytics.track.funnel "Set collector level to #{collectorLevel} during after inquiry flow"
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

    unless @user.id?
      @inquiry.set
        introduction: new Introduction(@user, @bookmarksView?.bookmarks).blurb()

    mediator.trigger 'inquiry:send'

    # Logged in:
    if @user.id?
      @user.save null,
        error: => @close()
        success: =>
          @user.refresh()
          @close() # And we're done...
    # Logged out:
    else
      @inquiry.on 'sync error', =>
        @$el.attr 'data-state', 'closed'
        period = 1600
        # Wait for modal to close before re-rendering
        _.delay (=> @state.set mode: 'signup'), (period / 2)
        # Wait for re-render before re-opening
        _.delay (=> @$el.attr 'data-state', 'open'), period
      , this

    analytics.track.funnel 'Submitted questionnaire during after inquiry flow'

  auth: (e) ->
    return unless @validateForm()

    e.preventDefault()

    @$('button').attr 'data-state', 'loading'

    @user.set @serializeForm()
    @user[@state.get 'mode'] success: @authSuccess, error: @authError

  authError: (model, response, options) =>
    @$('button').attr 'data-state', 'error'
    @$('.auth-errors').text(@errorMessage response)
    analytics.track.funnel "Unsuccessful #{@state.get('mode')} during after inquiry flow"

  authSuccess: (model, response, options) =>
    attrs = _.omit model.get('user'), @user.keys()...
    @user.set attrs
    @user.unset 'password'
    @user.needsOnboarding = false # Disable onboarding for new users, for now
    analytics.track.funnel "Successful #{@state.get('mode')} during after inquiry flow"
    # Save the new attributes
    @user.save null,
      error: => @close()
      success: =>
        $.when.apply(null, _.compact([
          @user.refresh()
          @bookmarksView?.saveAll?()
        ])).then =>
          @close() # And we're done...

  toggleMode: (e) ->
    e.preventDefault()
    @state.set 'mode', $(e.target).data('mode')

  logState: ->
    analytics.track.funnel stateEventMap[@state.get 'mode']

  reRender: ->
    @$el.attr 'data-mode', (mode = @state.get 'mode')

    if mode is 'questionnaire'
      @once 'rerendered', =>
        @attachBookmarksView() if @user.isCollector()
        @attachLocationSearch()

    super

  attachBookmarksView: ->
    @bookmarksView = new BookmarksView
      el: @$('#after-inquiry-bookmark-artists')
      $collection: @$('#after-inquiry-bookmark-artists-results')
      limit: 2
      persist: @user.id?
    # Height changes on render so recenter the modal
    @bookmarksView.on 'render:collection', @updatePosition

  attachLocationSearch: ->
    @locationSearchView = new LocationSearchView el: @$('#after-inquiry-collector-location'), autofocus: false
    @locationSearchView.render @user.location()?.cityStateCountry()
    @listenTo @locationSearchView, 'location:update', (location) =>
      @user.setGeo(new GeoFormatter location)

  remove: ->
    mediator.off null, null, this
    @inquiry.off null, null, this
    @locationSearchView?.remove()
    @bookmarksView?.remove()
    super
