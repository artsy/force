Backbone = require 'backbone'
{ invoke } = require 'underscore'
User = require '../../models/user.coffee'
masonry = require './index.coffee'
BrickView =
  artwork: require '../artwork_brick/view.coffee'
  auction_artwork: require '../auction_artwork_brick/view.coffee'
template = -> require('./index.jade') arguments...
columnTemplate = -> require('./column.jade') arguments...

module.exports = class ArtworkMasonryView extends Backbone.View
  subViews: []

  initialize: ({ @artworks = [], @context_page, @context_module }) ->
    @user = User.instantiate()

  postRender: (artworks) ->
    artworks ?= @artworks
    @subViews = artworks.map ({ id }) =>
      $el = @$(".js-artwork-brick[data-id='#{id}']")

      view = new BrickView[$el.data('type') or 'artwork']
        el: $el
        id: id
        user: @user
        context_page: @context_page
        context_module: @context_module

      view.postRender()
      view

    @user.related().savedArtworks
      .check @artworks.map ({ id }) -> id

  reset: (artworks) ->
    invoke @subViews, 'remove'
    @artworks = artworks
    this

  render: ->
    { columns, @heights } = masonry @artworks
    @$el.html template
      columns: columns
    @postRender()
    this

  appendArtworks: (artworks) ->
    console.log template, columnTemplate
    @artworks.concat artworks
    { columns, @heights } = masonry artworks, @heights
    _.each columns, (column, i) =>
      $(@$(".artwork-masonry__column")[i]).append columnTemplate { column }
    @postRender artworks

  remove: ->
    invoke @subViews, 'remove'
