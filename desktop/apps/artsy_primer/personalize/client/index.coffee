_ = require 'underscore'
_s = require 'underscore.string'
qs = require 'qs'
Backbone = require 'backbone'
PersonalizeState = require './state.coffee'
mediator = require '../../../../lib/mediator.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
Transition = require '../../../../components/mixins/transition.coffee'
analyticsHooks = require '../../../../lib/analytics_hooks.coffee'
Cookies = require 'cookies-js'
views =
  CollectView: require './views/collect.coffee'
  ArtistsView: require './views/artists.coffee'
  PriceRangeView: require './views/price_range.coffee'
  CategoriesView: require './views/categories.coffee'
  BookmarksView: require './views/bookmarks.coffee'
  FavoritesView: require './views/favorites.coffee'

module.exports.PersonalizeRouter = class PersonalizeRouter extends Backbone.Router
  routes:
    'artsy-primer-personalize/:step': 'step'

  initialize: ({ @user, @reonboarding, @force }) ->
    @$el = $('#artsy-primer-personalize-page')
    $('.artsy-primer-next-step').click => @view.advance?()

    @state = new PersonalizeState user: @user, reonboarding: @reonboarding
    @state.set 'current_step', @force, silent: true if @force?

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

      @view = new views["#{_s.classify(step)}View"] state: @state, user: @user
      @$el.html @view.render().$el

  next: ->
    @navigate "/artsy-primer-personalize/#{@state.get('current_step')}", trigger: true

  done: ->
    analyticsHooks.trigger 'personalize:finished', label: "User:#{@user.id}"
    @user.save()
    # Thank you page
    alert 'done thanks'

module.exports.init = ->
  { force, reonboarding } = qs.parse location.search.slice(1)
  unless user = CurrentUser.orNull()
    mediator.trigger 'open:auth', mode: 'login'
  else
    user.approximateLocation success: -> user.save()
    new PersonalizeRouter user: user, reonboarding: reonboarding?, force: force
    Backbone.history.start pushState: true
    require('./analytics.coffee')(user)
