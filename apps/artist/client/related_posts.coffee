Backbone = require 'backbone'
_ = require 'underscore'
Post = require '../../../models/post.coffee'
relatedPostsTemplate = ->   require('../templates/related_posts.jade') arguments...

module.exports = class RelatedPostsView extends Backbone.View

  initialize: (options) ->
    { @numToShow } = options
    @noPosts = options.noPosts
    @model.fetchRelatedPosts success: (posts) =>
      @render()

  render: ->
    return @noPosts(@$el) if @model.relatedPosts.length == 0
    @$el.html relatedPostsTemplate posts: _.first(@model.relatedPosts.models, @numToShow), remaining: @model.relatedPosts.length - @numToShow

  events:
    'click .artist-related-post-show-all'  :  'showAll'

  showAll: (e) ->
    e.preventDefault()
    @numToShow = @model.relatedPosts.length
    @render()
