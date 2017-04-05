Q = require 'bluebird-q'
Backbone = require 'backbone'
Cookies = require 'cookies-js'
metaphysics = require '../../../../lib/metaphysics'
mediator = require '../../../lib/mediator'
CurrentUser = require '../../../models/current_user'
HeroUnitView = require './hero_unit_view'
HomeAuthRouter = require './auth_router'
JumpView = require '../../../components/jump/view'
setupHomePageModules = require './setup_home_page_modules'
maybeShowBubble = require '../components/new_for_you/index'
setupArtistsToFollow = require '../components/artists_to_follow/index'

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
