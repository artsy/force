_           = require 'underscore'
sd          = require('sharify').data
Backbone    = require 'backbone'
Cookies     = require 'cookies-js'
Post        = require '../../models/post.coffee'
CurrentUser = require '../../models/current_user.coffee'
mediator    = require '../../lib/mediator.coffee'
analytics   = require '../../lib/analytics.coffee'

templates =
  empty    : -> require('./templates/empty.jade') arguments...
  list     : -> require('./templates/list.jade') arguments...
  grid     : -> require('./templates/grid.jade') arguments...
  extended : -> require('./templates/extended.jade') arguments...

module.exports = class RelatedPostsView extends Backbone.View
  events:
    'click .related-posts-show-all'   : 'showAll'
    'click .related-posts-add-button' : 'addPost'

  initialize: (options = {}) ->
    { @model, @numToShow, @modelName, @mode, @canBeEmpty } = _.defaults(options, mode: 'list', canBeEmpty: true)

    throw new Error('Model must implement #fetchRelatedPosts') unless _.isFunction @model.fetchRelatedPosts
    throw new Error('Requires @modelName') unless @modelName

    @model.fetchRelatedPosts()
    @listenTo @model.relatedPosts, 'sync', @render

  render: ->
    templateData =
      model      : @model
      modelName  : @modelName
      mode       : @mode
      entityName : @entityName()

    if @model.relatedPosts.length
      @$el.html templates[@mode] _.extend templateData,
        posts      : @model.relatedPosts.first @numToShow
        remaining  : Math.max (@model.relatedPosts.length - @numToShow), 0
    else
      if @canBeEmpty
        @$el.html templates.empty templateData
      else
        @remove()

    _.defer =>
      if not @__rendered__
        @$('.related-posts').addClass 'is-fade-in'
        @__rendered__ = true
      else
        @$('.related-posts').addClass 'is-rendered'

  entityName: ->
    @model.get('name') or "this #{@modelName}"

  showAll: (e) ->
    e.preventDefault()
    @numToShow = @model.relatedPosts.length
    @render()

  addPost: (e) =>
    @currentUser ?= CurrentUser.orNull()

    unless @currentUser
      e.preventDefault()
      mediator.trigger 'open:auth', mode: 'register', copy: 'Sign up to post on Artsy.net'
    else
      e.preventDefault()
      analytics.track.click "Added #{@modelName.toLowerCase()} to post, via #{@modelName.toLowerCase()} info"
      @addToPost (-> location.href = "/post" )

  unpublishedPost: (options) ->
    if (postId = Cookies.get("current_post"))
      options.success(new Post(id: postId))
    else
      posts = new Backbone.Collection
      posts.fetch
        url: "#{sd.API_URL}/api/v1/profile/#{@currentUser.get('default_profile_id')}/posts/unpublished"
        success: (response) ->
          post = response.models?[0]?.get('results')?[0]
          if post
            options.success(new Post(post))
          else
            options.error
        error: options.error

  addToPost: (success) ->
    @currentUser ?= CurrentUser.orNull()
    @unpublishedPost
      success: (post) =>
        post.isNew = -> true
        post.url = "#{post.url()}/#{post.id}/artwork/#{@model.id}"
        post.save null,
          success : success
          error   : success
      error: success
