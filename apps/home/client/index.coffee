Q = require 'bluebird-q'
Backbone = require 'backbone'
Cookies = require 'cookies-js'
metaphysics = require '../../../lib/metaphysics.coffee'
mediator = require '../../../lib/mediator.coffee'
CurrentUser = require '../../../models/current_user.coffee'
HeroUnitView = require './hero_unit_view.coffee'
HomeAuthRouter = require './auth_router.coffee'
HomeTopRailView = require '../components/top_rail/view.coffee'
splitTest = require '../../../components/split_test/index.coffee'
JumpView = require '../../../components/jump/view.coffee'
myActiveBidsQuery = require '../../../components/my_active_bids/query.coffee'
myActiveBidsTemplate = -> require('../../../components/my_active_bids/template.jade') arguments...

module.exports.HomeView = class HomeView extends Backbone.View
  initialize: (options) ->
    @user = CurrentUser.orNull()

    # Set up a router for the /log_in /sign_up and /forgot routes
    new HomeAuthRouter
    Backbone.history.start pushState: true

    # Render Featured Sections
    @setupHeroUnits()
    new HomeTopRailView user: @user, el: @$('#home-top-rail-section')

  setupHeroUnits: ->
    new HeroUnitView el: @$el, $mainHeader: $('#main-layout-header')

module.exports.init = ->
  new HomeView el: $('body')
