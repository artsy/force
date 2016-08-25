Backbone = require 'backbone'
_ = require 'underscore'
Articles = require '../../../collections/articles.coffee'
Channel = require '../../../models/channel.coffee'
ArticlesGridView = require '../../../components/articles_grid/view.coffee'
initCarousel = require '../../../components/merry_go_round/horizontal_nav_mgr.coffee'
sd = require('sharify').data

module.exports.TeamChannel = class TeamChannel extends Backbone.View

  initialize: ->
    @channel = new Channel sd.CHANNEL
    @gridArticles = new Articles
    @gridArticles.url = "#{@gridArticles.url}/?&published=true&limit=12&sort=-published_at&channel_id=#{@channel.get('id')}"
    @renderGrid()
    @renderFeatured()
    @setupStickyNav()

  renderGrid: ->
    $el = $('.team-channel-grid')
    gridView = new ArticlesGridView
      el: $el
      collection: @gridArticles
      header: 'Latest Articles'
    @gridArticles.fetch()

  renderFeatured: ->
    $el = $('.team-channel-featured')
    initCarousel $el,
      advanceBy: 2
      wrapAround: true

  setupStickyNav: ->
    $('.team-channel-header').waypoint (direction) ->
      if direction is 'down'
        $('.team-channel-nav').addClass 'is-sticky'
      else
        $('.team-channel-nav').removeClass 'is-sticky'
    , { offset: -400 }

module.exports.init = ->
  new TeamChannel
    el: $('body')