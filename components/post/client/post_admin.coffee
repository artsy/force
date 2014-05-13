_                  = require 'underscore'
Backbone           = require 'backbone'
sd                 = require('sharify').data
featuredByTemplate = -> require('../templates/featured_by.jade') arguments...
PostFeatureDialog  = require('./posts_feature_dialog.coffee')
Cookies            = require 'cookies-js'

module.exports = class PostAdmin extends Backbone.View

  events:
    'click a.post-remove'              : 'removePostClick'
    'click a.post-edit'                : 'editPostClick'
    'click a.post-feature'             : 'featurePostClick'
    'click a.post-unfeature'           : 'unfeaturePostClick'
    'click a.post-repost'              : 'repostPostClick'
    'click a.post-unrepost'            : 'unrepostPostClick'
    'click a.post-flag'                : 'flagPostClick'
    'click a.post-flagged'             : 'unflagPostClick'
    'click a.post-show-feature-dialog' : 'showPostsFeatureDialog'

  initialize: (options) ->
    throw 'requires currentUser' unless options.currentUser

    @currentUser = options.currentUser
    @parent = options.parent
    @isMe = options.isMe

    @model.ensureRepostsFetched @showOrHideRepostControls
    @reposts = @model.reposts()

    @reposts.on 'all', @renderFeaturedBy, @
    @reposts.on 'all', @showOrHideRepostControls, @

  editPostClick: (event) =>
    Cookies.set 'current_post', @model.get('id'), expires: 60 * 24
    window.location = "/post"
    false

  showPostsFeatureDialog: ->
    @postsFeatureDialog ||= new PostFeatureDialog
      el   : @$el
      model: @model
    @postsFeatureDialog.show()
    false

  removePost: =>
    return false unless @isMe || @currentUser.isAdmin()
    @parent.feedItems.remove @model
    post = @model
    post.destroy()
    @$el.slideUp =>
      @$el.remove()
      @parent.recomputeEachShowHeight()

  featurePost: =>
    @model.feature()
    alert("Post has been featured.")
    @$('a.post-feature').addClass('unfeature').removeClass('feature').text('unfeature')

  unfeaturePost: =>
    @model.unfeature()
    alert("Post has been unfeatured.")
    @$('a.post-unfeature').addClass('feature').removeClass('unfeature').text('feature')

  repostPost: =>
    @model.repost()

  unrepostPost: =>
    return unless @myRepost
    @model.repost?() ? @model.unrepost(@myRepost)

  renderFeaturedBy: =>
    @$('.featured-by').html featuredByTemplate(post: @model)

  setMyRepost: ->
    @myRepost = @reposts?.detect (repost) ->
      repost.isMine()

  showOrHideRepostControls: =>
    @setMyRepost()
    if @myRepost
      @$('a.post-unrepost').show() if @myRepost.get('id')
      @$('a.post-repost').hide()
    else
      @$('a.post-unrepost').hide()
      @$('a.post-repost').show()

  removePostClick: (event) ->
    return false unless confirm("Are you sure you want to delete this post?")
    @removePost()
    false

  featurePostClick: (event) ->
    return false unless confirm("Are you sure you want to feature this post?")
    @featurePost()
    false

  unfeaturePostClick: (event) ->
    return false unless confirm("Are you sure you want to unfeature this post?")
    @unfeaturePost()
    false

  flagPostClick: (event) ->
    return false unless @currentUser.isAdmin() && confirm("Are you sure you want to flag this post?")
    @flagPost()
    false

  unflagPostClick: (event) ->
    return false unless @currentUser.isAdmin() && confirm("Are you sure you want to unflag this post?")
    @unflagPost()
    false

  flagPost: ->
    @model.flag()
    @$('a.post-flag').addClass('flagged').removeClass('flag').text('Flagged')

  unflagPost: ->
    @model.unflag()
    @$('a.post-flagged').addClass('flag').removeClass('flagged').text('Flag')

  repostPostClick: (event) ->
    @repostPost()
    false

  unrepostPostClick: (event) ->
    @unrepostPost()
    false
