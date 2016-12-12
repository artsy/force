_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Artist = require '../../../models/artist.coffee'
template = -> require('../templates/image_set.jade') arguments...
{ Following, FollowButton } = Follow = require '../../follow_button/index.coffee'
imagesLoaded = require 'imagesloaded'
{ resize } = require '../../resizer/index.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
initCarousel = require '../../merry_go_round/bottom_nav_mgr.coffee'

module.exports = class ImageSetView extends Backbone.View

  events:
    'click .image-set-modal-js__left': 'previous'
    'click .image-set-modal-js__right': 'next'

  initialize: (options) ->
    { @items, @user, @startIndex } = options
    @length = @items?.length
    @currentIndex = @startIndex
    $(window).on 'keyup.modalize', @onKeyUp
    @following = new Following(null, kind: 'artist') if @user?
    @setupFollowButtons()
    @preload()

  render: ->
    @$el.html template
      item: @items[@currentIndex]
      resize: resize
      length: @length
      index: @currentIndex + 1
    $set = @$('.image-set-modal')
    $set.imagesLoaded =>
      $set.attr 'data-state', 'loaded'
      @$('.loading-spinner').remove()
    @addFollowButton()
    this

  next: ->
    @currentIndex = if @currentIndex is @length - 1 then 0 else @currentIndex + 1
    @render()

  previous: ->
    @currentIndex = if @currentIndex is 0 then @length - 1 else @currentIndex - 1
    @render()

  onKeyUp: (e) =>
    if e.keyCode is 37
      @previous()
    else if e.keyCode is 39
      @next()

  setupFollowButtons: ->
    @artists = []
    _.where(@items, type: 'artwork').map (work) =>
      @artists.push id: work.artist?.slug
    @following.syncFollows(_.pluck @artists, 'id') if @user?

  addFollowButton: ->
    item = @items[@currentIndex]
    return unless item.artist?.slug
    artist = new Artist id: item.artist.slug
    analyticsHooks.trigger 'view:image-set-item'
    new FollowButton
      el: @$(".artist-follow[data-id='#{artist.id}']")
      following: @following
      modelName: 'artist'
      model: artist
      context_page: "Article page"
      context_module: 'article_image_set'
      href: sd.APP_URL + sd.CURRENT_PATH

  preload: ->
    initCarousel $('.image-set-modal'),
      advanceBy: 1

    for item in @items
      url = item.url or item.image
      image = new Image()
      image.src = resize(url, { height: 900 } )
