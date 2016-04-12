_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
template = -> require('./templates/image_set.jade') arguments...
{ Following, FollowButton } = Follow = require '../follow_button/index.coffee'
imagesLoaded = require 'imagesloaded'
{ resize } = require '../resizer/index.coffee'

module.exports = class ImageSetView extends Backbone.View

  events:
    'click .image-set-modal-js__left': 'previous'
    'click .image-set-modal-js__right': 'next'

  initialize: (options) ->
    { @collection, @user, @startIndex } = options
    @length = @collection.length
    @currentIndex = @startIndex
    $(window).on 'keyup.modalize', @onKeyUp
    @following = new Following(null, kind: 'artist') if @user?
    @setupFollowButtons()

  render: ->
    @$el.html template
      item: @collection[@currentIndex]
      resize: resize
      length: @length
      index: @currentIndex + 1
    @$('.image-set-modal').imagesLoaded =>
      @$('.loading-spinner').remove()
      @$('.image-set-modal').attr 'data-state', 'loaded'
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
    _.where(@collection, type: 'artwork').map (work) =>
      @artists.push id: work.artist?.slug
    @following.syncFollows(_.pluck @artists, 'id') if @user?

  addFollowButton: ->
    item = @collection[@currentIndex]
    return unless item.artist?.slug
    artist = id: item.artist.slug
    new FollowButton
      el: @$(".artist-follow[data-id='#{artist.id}']")
      following: @following
      modelName: 'artist'
      model: artist
      analyticsFollowMessage: 'Followed artist, via image set modal'
      analyticsUnfollowMessage: 'Unfollowed artist, via image set modal'
      href: sd.APP_URL + sd.CURRENT_PATH
