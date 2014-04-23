_                 = require 'underscore'
Backbone          = require 'backbone'
PersonalizeState  = require './state.coffee'
CurrentUser       = require '../../../models/current_user.coffee'
Transition        = require '../../../components/mixins/transition.coffee'
track             = require('../../../lib/analytics.coffee').track

{ readCookie, deleteCookie } = require '../../../components/util/cookie.coffee'

views =
  CollectView      : require './views/collect.coffee'
  LocationView     : require './views/location.coffee'
  ArtistsView      : require './views/artists.coffee'
  GalleriesView    : require './views/galleries.coffee'
  InstitutionsView : require './views/institutions.coffee'
  PriceRangeView   : require './views/price_range.coffee'
  CategoriesView   : require './views/categories.coffee'

_.mixin(require 'underscore.string')

module.exports.PersonalizeRouter = class PersonalizeRouter extends Backbone.Router
  routes:
    'personalize/:step': 'step'

  initialize: (options) ->
    { @user }   = options
    @state      = new PersonalizeState
    @$el        = $('#personalize-page')

    @listenTo @state, 'transition:next', @next
    @listenTo @state, 'done', @done

    track.funnel 'Landed on personalize page', { label: "User:#{@user.id}" }

  step: (step) ->
    Transition.fade @$el, out: =>
      @view?.remove()
      @state.setStep step

      track.funnel "Starting Personalize #{@state.currentStepLabel()}", { label: "User:#{@user.id}" }

      @view = new views["#{_.classify(step)}View"] state: @state, user: @user
      @$el.html @view.render().$el

  next: ->
    @navigate "/personalize/#{@state.get('current_step')}", trigger: true

  # Check the cookie for a possible post-sign up destination;
  # ensure the cookie is cleared; return a location to redirect to
  #
  # @return {String} destination or root path
  redirectLocation: ->
    destination = readCookie 'destination'
    deleteCookie 'destination' if destination
    destination or '/'

  done: ->
    track.funnel 'Finished personalize', { label: "User:#{@user.id}" }

    @$el.attr 'data-state', 'loading'

    $.when.apply(null, [
      @user.save()
      $.post('/flash', message: 'Thank you for personalizing your profile')
    ]).always =>
      window.location = @redirectLocation()

module.exports.init = ->
  $ ->
    user = CurrentUser.orNull()
    return unless user

    user.geoLocate
      accuracy: 'low'
      success: (geo) =>
        if _.isEmpty user.get('location')?.coordinates
          user.setGeo geo

    router = new PersonalizeRouter(user: user)
    Backbone.history.start pushState: true
