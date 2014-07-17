_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Cookies = require 'cookies-js'
Post = require '../../models/post.coffee'
CurrentUser = require '../../models/current_user.coffee'
mediator = require '../../lib/mediator.coffee'
analytics = require '../../lib/analytics.coffee'

module.exports = class AddToPostButton extends Backbone.View

  events:
    'click .related-posts-add-button': 'addPost'

  initialize: (options) ->
    @modelName = options.modelName

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
          success: success
          error: success
      error: success
