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
    @featuredArticles = new Articles sd.FEATURED_ARTICLES
    @articles = new Articles
    @articles.url = "#{@articles.url}/?&published=true&limit=12&sort=-published_at&channel_id=#{@channel.get('id')}"
    @renderGrid()
    @renderFeatured()

  renderGrid: ->
    $el = $('.team-channel-grid')
    gridView = new ArticlesGridView
      el: $el
      collection: @articles
      header: 'Latest Articles'
    $el.html '<div class="loading-spinner"></div>'
    @articles.fetch()

  renderFeatured: ->
    $el = $('.team-channel-featured')
    initCarousel $el,
      advanceBy: 2

module.exports.init = ->
  new TeamChannel
    el: $('body')