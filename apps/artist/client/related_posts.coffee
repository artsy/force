Backbone             = require 'backbone'
_                    = require 'underscore'
Post                 = require '../../../models/post.coffee'
relatedPostsTemplate = -> require('../templates/related_posts.jade') arguments...
noPostsTemplate       = -> require('../templates/no_posts.jade') arguments...

module.exports = class RelatedPostsView extends Backbone.View

  initialize: (options) ->
    { @numToShow } = options
    @model.fetchRelatedPosts success: (posts) =>
      @render()

  render: ->
    if @model.relatedPosts?.length > 0
      @$el.html relatedPostsTemplate posts: _.first(@model.relatedPosts.models, @numToShow), remaining: @model.relatedPosts.length - @numToShow
    else
      @$el.html noPostsTemplate

  events:
    'click .artist-related-post-show-all'  :  'showAll'

  showAll: (e) ->
    e.preventDefault()
    @numToShow = @model.relatedPosts.length
    @render()
