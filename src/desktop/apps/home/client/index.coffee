Backbone = require 'backbone'
Cookies = require 'cookies-js'
CurrentUser = require '../../../models/current_user.coffee'
HeroUnitView = require './hero_unit_view.coffee'
JumpView = require '../../../components/jump/view.coffee'
SearchBarView = require '../../../components/search_bar/view.coffee'
setupHomePageModules = require './setup_home_page_modules.coffee'
maybeShowBubble = require '../components/new_for_you/index.coffee'
setupArtistsToFollow = require '../components/artists_to_follow/index.coffee'
Articles = require '../../../collections/articles'
Items = require '../../../collections/items'
featuredArticlesTemplate = -> require('../templates/featured_articles.jade') arguments...
featuredShowsTemplate = -> require('../templates/featured_shows.jade') arguments...
{ resize } = require '../../../components/resizer/index.coffee'
sd = require('sharify').data
_ = require 'underscore'
_s = require 'underscore.string'

module.exports.HomeView = class HomeView extends Backbone.View

  initialize: () ->
    Backbone.history.start pushState: true

    # Render Featured Sections
    @setupHeroUnits()
    @setupFeaturedShows()
    @setupFeaturedArticles()

  setupHeroUnits: ->
    new HeroUnitView
      el: @$el
      $mainHeader: $('#main-layout-header')

  setupFeaturedShows: ->
    featuredShows = new Items [], id: '530ebe92139b21efd6000071', item_type: 'PartnerShow'
    featuredShows.fetch().then (results) ->
      $("#js-home-featured-shows").html featuredShowsTemplate
        featuredShows: featuredShows
        resize: resize

  setupFeaturedArticles: ->
    featuredArticles = new Articles
    featuredArticles.fetch(
      data:
        published: true
        featured: true
        sort: '-published_at'
    ).then (results) ->
      $("#js-home-featured-articles").html featuredArticlesTemplate
        featuredArticles: featuredArticles
        resize: resize

module.exports.init = ->
  user = CurrentUser.orNull()
  new HomeView el: $('body')

  setupHomePageModules()
  setupArtistsToFollow user
  maybeShowBubble user
