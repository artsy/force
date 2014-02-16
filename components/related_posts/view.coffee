_           = require 'underscore'
sd          = require('sharify').data
Backbone    = require 'backbone'
Post        = require '../../models/post.coffee'
CurrentUser = require '../../models/current_user.coffee'
mediator    = require '../../lib/mediator.coffee'
analytics   = require '../../lib/analytics.coffee'

template      = -> require('./templates/index.jade') arguments...
noneTemplate  = -> require('./templates/none.jade') arguments...

module.exports = class RelatedPostsView extends Backbone.View
  events:
    'click .related-posts-show-all'   : 'showAll'
    'click .related-posts-add-button' : 'addPost'

  initialize: (options) ->
    { @model, @numToShow } = options

    throw 'Model must implement #fetchRelatedPosts' unless _.isFunction(@model.fetchRelatedPosts)

    @model.fetchRelatedPosts()
    @listenTo @model.relatedPosts, 'sync', @render

  render: ->
    if @model.relatedPosts.length > 0
      @$el.html template
        model: @model
        posts: @model.relatedPosts.first @numToShow
        remaining: Math.max((@model.relatedPosts.length - @numToShow), 0)
    else
      @$el.html noneTemplate(model: @model)

    _.defer =>
      @$('.related-posts').addClass 'is-complete'

  showAll: (e) ->
    e.preventDefault()
    @numToShow = @model.relatedPosts.length
    @render()

  addPost: (e) =>
    @currentUser ||= CurrentUser.orNull()
    unless @currentUser
      e.preventDefault()
      mediator.trigger 'open:auth', mode: 'register', copy: 'Sign up to post on Artsy.net'
    else
      e.preventDefault()
      analytics.track.click "Added #{@model.constructor.name.toLowerCase()} to post, via #{@model.constructor.name.toLowerCase()} info"
      @addToPost (-> location.href = "/post" )

  addToPost: (success) ->
    @currentUser ||= CurrentUser.orNull()
    @currentUser.unpublishedPost
      success: (post) =>
        post.isNew = -> true
        post.url = "#{post.url()}/#{post.get('id')}/artwork/#{@model.get('id')}"
        post.save null,
          success: success
          error: success
      error: success
