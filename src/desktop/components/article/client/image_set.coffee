_ = require 'underscore'
Backbone = require 'backbone'
Artist = require '../../../models/artist'
template = -> require('../templates/image_set.jade') arguments...
{ Following, FollowButton } = Follow = require '../../follow_button/index'
imagesLoaded = require 'imagesloaded'
{ resize } = require '../../resizer/index.coffee'
initCarousel = require '../../merry_go_round/horizontal_nav_mgr.coffee'

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
    @renderTemplate()

  renderTemplate: ->
    @$el.html template
      items: @items
      resize: resize
      length: @length
      index: @currentIndex + 1
    $set = @$('.image-set-modal')
    $set.imagesLoaded =>
      $set.attr 'data-state', 'loaded'
      @$('.loading-spinner').remove()
      @carousel = initCarousel $set,
        wrapAround: true
        advanceBy: 1
      @carousel.navigation.flickity.select(@startIndex)
    @addFollowButtons()

  next: ->
    @carousel.navigation.flickity.next()

  previous: ->
    @carousel.navigation.flickity.previous()

  onKeyUp: (e) =>
    if e.keyCode is 37
      @previous()
    else if e.keyCode is 39
      @next()

  addFollowButtons: ->
    @artists = []
    _.where(@items, type: 'artwork').map (work) =>
      id = work.artist?.slug
      @artists.push id: id
      artist = new Artist id: id
      new FollowButton
        el: @$(".artist-follow[data-id='#{artist.id}']")
        following: @following
        modelName: 'artist'
        model: artist
        context_page: "Article page"
        context_module: 'article_image_set'
    @following.syncFollows(_.pluck @artists, 'id') if @user?
