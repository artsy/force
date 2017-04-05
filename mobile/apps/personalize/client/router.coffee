_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
bootstrap = require '../../../components/layout/bootstrap'
PersonalizeState = require './personalize_state'
CurrentUser = require '../../../models/current_user'
analyticsHooks = require '../../../lib/analytics_hooks'

views =
  CollectView: require('./collect_view').CollectView
  LocationView: require('./location_view').LocationView
  ArtistsView: require('./artists_view').ArtistsView
  PriceRangeView: require('./price_range_view').PriceRangeView

PersonalizeRouter = class PersonalizeRouter extends Backbone.Router
  routes:
    'personalize/:step': 'step'

  initialize: (options) ->
    @$el = $('#personalize-page')
    @state = new PersonalizeState
    { @user } = options

    analyticsHooks.trigger 'track', 'Landed on personalize page', { label: "User:#{@user.id}" }

    @listenTo @state, 'transition:next', @next
    @listenTo @state, 'done', @done

  step: (step) ->
    @teardown()

    @state.setStep(step)
    analyticsHooks.trigger 'track', "Starting #{step}", { label: "User:#{@user.id}" }

    klass = _s.classify(step) + 'View'
    @view = new views[klass](state: @state, user: @user)
    @$el.html @view.render().$el

  teardown: ->
    @view?.remove()

  next: ->
    @navigate "/personalize/#{@state.get('current_step')}", trigger: true

  done: ->
    @teardown()
    @$el.html '<div class="loading-spinner"></div>'

    analyticsHooks.trigger 'track', 'Finished personalize', { label: "User:#{@user.id}" }

    @user.save null,
      complete: -> window.location.href = '/'

module.exports.PersonalizeRouter = PersonalizeRouter

module.exports.init = ->
  bootstrap()
  new PersonalizeRouter(user: CurrentUser.orNull())
  Backbone.history.start(pushState: true)
