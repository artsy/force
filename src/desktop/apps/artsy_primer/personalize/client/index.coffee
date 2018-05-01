_ = require 'underscore'
_s = require 'underscore.string'
qs = require 'qs'
Q = require 'bluebird-q'
Backbone = require 'backbone'
PersonalizeState = require './state.coffee'
mediator = require '../../../../lib/mediator.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
Transition = require '../../../../components/mixins/transition.coffee'
analyticsHooks = require '../../../../lib/analytics_hooks.coffee'
Cookies = require 'cookies-js'
NextStepView = require './views/next_step.coffee'

views =
  CollectView: require './views/collect.coffee'
  ArtistsView: require './views/artists.coffee'
  PriceRangeView: require './views/price_range.coffee'
  CategoriesView: require './views/categories.coffee'
  BookmarksView: require './views/bookmarks.coffee'
  FavoritesView: require './views/favorites.coffee'
  ThankYouView: require './views/thank_you.coffee'

module.exports.PersonalizeRouter = class PersonalizeRouter extends Backbone.Router
  routes:
    'artsy-primer-personalize/:step': 'step'

  initialize: ({ @user, @reonboarding, @force }) ->
    @$el = $('#artsy-primer-personalize-page')

    @state = new PersonalizeState user: @user, reonboarding: @reonboarding
    @state.set 'current_step', @force, silent: true if @force?

    @nextStep = new NextStepView
      el: '.artsy-primer-next-step'
      state: @state
      user: @user
    @nextStep.on 'advance', => @view.advance?()

    @listenTo @state, 'transition:next', @next
    @listenTo @state, 'done', @done

    analyticsHooks.trigger 'personalize:impression', label: "User:#{@user.id}"
    analyticsHooks.trigger('personalize:reonboarding') if @reonboarding

    _.defer => @next()

  step: (step) ->
    Transition.fade @$el, out: =>
      @view?.remove()
      @state.set 'current_step', step

      analyticsHooks.trigger 'personalize:step',
        message: "Starting Personalize #{@state.currentStepLabel()}"
        label: "User:#{@user.id}"

      @view = new views["#{_s.classify(step)}View"]
        state: @state
        user: @user

      @$el.html(@view.render().$el)

  next: ->
    @navigate "/artsy-primer-personalize/#{@state.get('current_step')}", trigger: true

  # Check the cookie for a possible post-sign up destination;
  # ensure the cookie is cleared; return a location to redirect to
  #
  # @return {String} destination or root path
  redirectLocation: ->
    destination = Cookies.get 'destination'
    Cookies.expire 'destination' if destination
    destination or '/'

  done: ->
    analyticsHooks.trigger 'personalize:finished', label: "User:#{@user.id}"

    @$el.attr 'data-state', 'loading'

    Q($.post('/artsy-primer/set-sailthru'))
    .then => @user.save()
    .finally => location.assign @redirectLocation()

module.exports.init = ->
  { force, reonboarding, email, name } = qs.parse location.search.slice(1)

  # If there's no user, open the auth modal
  unless user = CurrentUser.orNull()
    mediator.once 'modal:opened', -> _.defer ->

      # Prefill the email and name query params
      $('.auth-register [name=email]').val email if email
      $('.auth-register [name=name]').val name if name

      # Don't let the user close out by hacking the close points
      $('.modal-close').hide()
      $('.modal-backdrop').click (e) -> e.stopPropagation()

    mediator.trigger 'open:auth',
      mode: 'register'
      destination: location.href
      width: 500

  # Init the personalize flow
  else
    user.approximateLocation success: -> user.save()
    user.set receive_personalized_email: false
    new PersonalizeRouter
      user: user
      reonboarding: reonboarding?
      force: force
    Backbone.history.start pushState: true
    require('./analytics.coffee')(user)
