Backbone = require 'backbone'
{ invoke } = require 'underscore'
User = require '../../models/user.coffee'
masonry = require './index.coffee'
BrickView =
  artwork: require '../artwork_brick/view.coffee'
  auction_artwork: require '../auction_artwork_brick/view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class ArtworkMasonryView extends Backbone.View
  subViews: []

  initialize: ({ @artworks }) ->
    @user = User.instantiate()

  postRender: ->
    @subViews = @artworks.map ({ id }) =>
      $el = @$(".js-artwork-brick[data-id='#{id}']")

      view = new BrickView[$el.data('type') or 'artwork']
        el: $el, id: id, user: @user

      view.postRender()
      view

    @user.related().savedArtworks
      .check @artworks.map ({ id }) -> id

  reset: (artworks) ->
    invoke @subViews, 'remove'
    @artworks = artworks
    this

  render: ->
    @$el.html template
      columns: masonry @artworks
    @postRender()
    this

  remove: ->
    invoke @subViews, 'remove'
