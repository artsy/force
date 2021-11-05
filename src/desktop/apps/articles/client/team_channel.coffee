Backbone = require 'backbone'
_ = require 'underscore'
{ Articles } = require '../../../collections/articles'
{ Channel } = require '../../../models/channel'
ArticlesGridView = require '../../../components/articles_grid/view.coffee'
TeamChannelNavView = require '../../../components/channel_nav/view.coffee'
initCarousel = require '../../../components/merry_go_round/horizontal_nav_mgr.coffee'
sd = require('sharify').data

module.exports.TeamChannelView = class TeamChannelView extends Backbone.View

  initialize: ->
    @$body = $('body')
    @channel = new Channel sd.CHANNEL
    @gridArticles = new Articles
    @gridArticles.url = "#{@gridArticles.url}/?&published=true&limit=12&sort=-published_at&channel_id=#{@channel.get('id')}&count=true"
    @renderGrid()
    @renderFeatured()
    @nav = new TeamChannelNavView
      $waypointEl: $('.team-channel-header')
      $content: $('.team-channel-body')
      offset: -400
      el: $('body')
    $(window).on('resize', _.throttle(@windowResized, 200));

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
    @windowResized() if @carousel

  windowResized: =>
    # Advance by 1 for smaller screens
    if window.matchMedia('(max-width: 900px)').matches
      @carousel.navigation.advanceBy = 1
    else
      @carousel.navigation.advanceBy = 2

module.exports.init = ->
  new TeamChannelView
    el: $('body')
