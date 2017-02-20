Q = require 'bluebird-q'
Backbone = require 'backbone'
Cookies = require 'cookies-js'
metaphysics = require '../../../lib/metaphysics.coffee'
mediator = require '../../../lib/mediator.coffee'
CurrentUser = require '../../../models/current_user.coffee'
HeroUnitView = require './hero_unit_view.coffee'
HomeAuthRouter = require './auth_router.coffee'
JumpView = require '../../../components/jump/view.coffee'
setupHomePageModules = require './setup_home_page_modules.coffee'
maybeShowBubble = require '../components/new_for_you/index.coffee'
setupArtistsToFollow = require '../components/artists_to_follow/index.coffee'

module.exports.HomeView = class HomeView extends Backbone.View
  initialize: ->
    # Set up a router for the /log_in /sign_up and /forgot routes
    new HomeAuthRouter
    Backbone.history.start pushState: true

    # Render Featured Sections
    @setupHeroUnits()

  setupHeroUnits: ->
    new HeroUnitView
      el: @$el
      $mainHeader: $('#main-layout-header')

module.exports.init = ->
  user = CurrentUser.orNull()

  new HomeView el: $('body')

  setupHomePageModules()
  setupArtistsToFollow user
  maybeShowBubble user
