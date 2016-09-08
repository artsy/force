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

  setupStickyNav: ->
    $('.team-channel-header').waypoint (direction) ->
      if direction is 'down'
        $('.team-channel-nav').addClass 'is-sticky'
      else
        $('.team-channel-nav').removeClass 'is-sticky'
    , { offset: -400 }

  windowResized: ->
    # Advance by 1 for smaller screens
    if window.matchMedia('(max-width: 900px)').matches
      @carousel.navigation.advanceBy = 1
      $('.team-channel-nav').addClass 'is-small'
    else
      $('.team-channel-nav').removeClass 'is-small'
      @carousel.navigation.advanceBy = 2

  toggleHamburgerNav: ->
    if $('.team-channel-nav').hasClass 'is-open'
      $('.team-channel-nav').removeClass 'is-open'
      @$body.css 'transform', "translate3d(0, #{@height}px, 0)"
    else
      $('.team-channel-nav').addClass 'is-open'

module.exports.init = ->
  new TeamChannelView
    el: $('body')