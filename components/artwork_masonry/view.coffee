Backbone = require 'backbone'
{ invoke } = require 'underscore'
User = require '../../models/user.coffee'
masonry = require './index.coffee'
ArtworkSaveView = require '../artwork_save/view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class ArtworkMasonryView extends Backbone.View
  subViews: []

  initialize: ({ @artworks }) ->
    @user = User.instantiate()
    { @savedArtworks } = @user.related()

  postRender: ->
    @subViews = @artworks.map ({ id }) =>
      view = new ArtworkSaveView id: id, user: @user
      @$(".js-artwork-brick-save-controls[data-id='#{id}']")
        .html view.render().$el
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
