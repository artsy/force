_                 = require 'underscore'
Backbone          = require 'backbone'
PersonalizeState  = require './state.coffee'
CurrentUser       = require '../../../models/current_user.coffee'
Transition        = require '../../../components/mixins/transition.coffee'

views =
  CollectView:    require './views/collect.coffee'
  LocationView:   require './views/location.coffee'
  ArtistsView:    require './views/artists.coffee'
  PriceRangeView: require './views/price_range.coffee'

module.exports.PersonalizeRouter = class PersonalizeRouter extends Backbone.Router
  redirectLocation: '/'

  routes:
    'personalize/:step': 'step'

  initialize: (options) ->
    @state  = new PersonalizeState
    @user   = CurrentUser.orNull()
    @$el    = $('#personalize-page')

    @listenTo @state, 'transition:next', @next
    @listenTo @state, 'done', @done

  step: (step) ->
    Transition.fade @$el, out: =>
      @view?.remove()
      @state.setStep(step)
      klass   = "#{_.classify(step)}View"
      @view   = new views[klass](state: @state, user: @user)
      @$el.html @view.render().$el

  next: ->
    @navigate "/personalize/#{@state.get('current_step')}", trigger: true

  done: ->
    @$el.attr 'data-state', 'loading'
    @user.save null,
      complete: =>
        window.location = @redirectLocation

module.exports.init = ->
  $ ->
    router = new PersonalizeRouter
    Backbone.history.start pushState: true
