Backbone = require 'backbone'
{ invoke } = require 'underscore'
User = require '../../models/user'
masonry = require './index'
BrickView = require '../artwork_brick/view'
template = -> require('./index.jade') arguments...
columnTemplate = -> require('./column.jade') arguments...

module.exports = class ArtworkMasonryView extends Backbone.View
  subViews: []

  initialize: ({ @artworks = [], @context_page, @context_module }) ->
    @user = User.instantiate()

  postRender: (artworks) ->
    artworks ?= @artworks
    @subViews.push artworks.map ({ id }) =>
      $el = @$(".js-artwork-brick[data-id='#{id}']")

      view = new BrickView
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

    @$columns = @$(".artwork-masonry__column")
    @postRender()
    this

  appendArtworks: (artworks) ->
    @artworks.concat artworks
    { columns, @heights } = masonry artworks, @heights
    _.each columns, (column, i) =>
      $(@$columns[i]).append columnTemplate { column }
    @postRender artworks

  remove: ->
    invoke @subViews, 'remove'
    super
