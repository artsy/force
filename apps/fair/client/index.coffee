_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
{ FavoritesView } = require '../../../components/favorites/client/favorites.coffee'
{ FollowsView } = require '../../../components/favorites/client/follows.coffee'
# initFairLayout = require '../../../components/fair_layout/client/index.coffee'
FairBrowseRouter = require '../components/browse/router.coffee'
FairInfoView = require './info.coffee'
FairArticlesView = require './articles.coffee'
FairSearchView = require './search.coffee'
ForYouView = require './for_you.coffee'
OverviewView = require './overview.coffee'
FairFooter = require './footer.coffee'
Profile = require '../../../models/profile.coffee'
Fair = require '../../../models/fair.coffee'
CurrentUser = require '../../../models/current_user.coffee'
scrollFrame = require 'scroll-frame'

module.exports.FairView = class FairView extends Backbone.View

  sectionHash:
    info: FairInfoView
    posts: FairArticlesView
    search: FairSearchView
    browse: FairBrowseRouter
    favorites: FavoritesView
    follows: FollowsView
    forYou: ForYouView
    overview: OverviewView

  footerRoutes: ['forYou', 'posts', 'search', 'info', 'favorites', 'follows']

  initialize: (options) ->
    initFairLayout(options)
    @fair = options.fair
    @user = options.user

    # Instantiate sub views including the fair header and the view pertaining
    # to the current section.
    return if options.currentSection is 'browse'
    if @sectionHash[options.currentSection]
      el = if options.currentSection == 'overview' then @$el else @$('.fair-page-content')
      new @sectionHash[options.currentSection]
        model: @model
        fair: @fair
        el: el
        user: @user

      if options.currentSection == 'follows' or options.currentSection == 'favorites'
        @fixFavoritesFollowingTabs @model

      if options.currentSection in @footerRoutes
        new FairFooter
          el: @$('.fair-page-footer')
          fair: @fair
          model: @model

  # Kinda hacky
  fixFavoritesFollowingTabs: (profile) ->
    @$('.follows-tabs.garamond-tablist a').each ->
      $(@).attr href: "#{profile.href()}#{$(@).attr('href')}"

module.exports.init = ->
  fair = new Fair sd.FAIR
  user = CurrentUser.orNull()
  profile = new Profile sd.PROFILE
  new FairView
    model: profile
    fair: fair
    user: user
    el: $('.fair-layout-container')
    currentSection: sd.SECTION

  if sd.SECTION in ['overview', 'browse']
    new FairBrowseRouter
      fair: fair
      profile: profile

    # Links in the browse section keep your scroll position
    # unless the browser is Eigen
    scrollFrame('#fair-browse a') unless sd.EIGEN

  # Checks to see if the href is an internal link to:
  # an artwork, artist, show, or post
  #
  # return {Boolean}
  isOutbound = (href) ->
    pattern = /^\/((artwork\/.*$)|(artist\/.*$)|(show\/.*$)|(post\/.*$))/
    href.match(pattern)?

  # Global click handler
  $('body').on 'click', 'a[href]', ->
    href = ($this = $(this)).attr 'href'
    if href and isOutbound href
      $this.attr 'href',
        href +
          '?microsite=1' +
          "&profile_id=#{profile.id}" +
          "&fair_id=#{fair.id}" +
          "&fair_name=#{fair.get('name')}"
