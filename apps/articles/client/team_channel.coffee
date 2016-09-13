Backbone = require 'backbone'
_ = require 'underscore'
Articles = require '../../../collections/articles.coffee'
Channel = require '../../../models/channel.coffee'
ArticlesGridView = require '../../../components/articles_grid/view.coffee'
initCarousel = require '../../../components/merry_go_round/horizontal_nav_mgr.coffee'
sd = require('sharify').data

module.exports.TeamChannelView = class TeamChannelView extends Backbone.View

  events: ->
    'click .js-team-channel-toggle-hamburger' : 'toggleHamburgerNav'

  initialize: ->
    @$body = $('body')
    @channel = new Channel sd.CHANNEL
    @gridArticles = new Articles
    @gridArticles.url = "#{@gridArticles.url}/?&published=true&limit=12&sort=-published_at&channel_id=#{@channel.get('id')}"
    @renderGrid()
    @renderFeatured()
    @setupStickyNav()
    $(window).resize @windowResized

  renderGrid: ->
    $el = $('.team-channel-grid')
    @gridView = new ArticlesGridView
      el: $el
      collection: @gridArticles
      header: 'Latest Articles'
    @gridArticles.fetch()

  renderFeatured: ->
    $el = $('.team-channel-featured')
    @carousel = initCarousel $el,
      advanceBy: 2
      wrapAround: true
    @windowResized()

  setupStickyNav: ->
    $('.team-channel-header').waypoint (direction) =>
      if direction is 'down'
        @$body.addClass 'is-sticky'
      else
        @$body.removeClass 'is-sticky'
    , { offset: -400 }

  windowResized: =>
    # Advance by 1 for smaller screens
    if window.matchMedia('(max-width: 900px)').matches
      @$body.addClass 'is-small'
      @carousel.navigation.advanceBy = 1
    else
      @$body.removeClass 'is-small'
      @carousel.navigation.advanceBy = 2

  toggleHamburgerNav: ->
    if @$body.hasClass 'is-open'
      @$body.removeClass 'is-open'
      $('.team-channel-body').css 'transform', "translate3d(0, 0, 0)"
    else
      withHeader = if $('body.is-sticky').length > 0 then 0 else 92
      height = $('.team-channel-nav__links a').length * 50 + withHeader
      @$body.addClass 'is-open'
      $('.team-channel-body').css 'transform', "translate3d(0, #{height}px, 0)"

module.exports.init = ->
  new TeamChannelView
    el: $('body')