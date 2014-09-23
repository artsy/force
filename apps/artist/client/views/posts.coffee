_ = require 'underscore'
Backbone = require 'backbone'
RelatedPostsView = require '../../../../components/related_posts/view.coffee'
template = -> require('../../templates/sections/posts.jade') arguments...

module.exports = class PostsView extends Backbone.View
  initialize: ->
    @collection = @model.relatedPosts

  postRender: ->
    if @collection.fetched
      @renderSubView()
    else
      @collection.fetch
        data: size: 20
        success: @renderSubView

  renderSubView: =>
    @collection.fetched = true
    @subView = new RelatedPostsView collection: @collection, numToShow: 20
    @$('#artist-page-content-section').html @subView.render().$el

  render: ->
    @$el.html template()
    _.defer => @postRender()
    this

  remove: ->
    @subView?.remove()
