_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...

module.exports = class RelatedPostsView extends Backbone.View
  events:
    'click .related-posts-show-all': 'showAll'

  defaults:
    numToShow: 4

  initialize: (options = {}) ->
    { @numToShow } = _.defaults options, @defaults
    @listenTo @collection, 'sync', @render
    @collection.fetch success: @filterPosts

  filterPosts: (collection, response, options) =>
    xs = collection.filter (post) ->
      # Remove posts without images
      post.defaultImage()?.imageUrlForMaxSize()?
    @collection.reset xs

  showAll: (e) ->
    e.preventDefault()
    @numToShow = @collection.length
    @render()

  render: ->
    if @collection.length
      @$el.html template
        posts: @collection.take(@numToShow)
        remaining: Math.max((@collection.length - @numToShow), 0)
      this
    else
      @remove()
