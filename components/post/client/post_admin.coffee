_                  = require 'underscore'
Backbone           = require 'backbone'
sd                 = require('sharify').data
featuredByTemplate = -> require('../templates/featured_by.jade') arguments...

module.exports = class PostAdmin extends Backbone.View

  events:
    'click a.remove'              : 'removePostClick'
    'click a.edit'                : 'editPostClick'
    'click a.feature'             : 'featurePostClick'
    'click a.unfeature'           : 'unfeaturePostClick'
    'click a.repost'              : 'repostPostClick'
    'click a.unrepost'            : 'unrepostPostClick'
    'click a.flag'                : 'flagPostClick'
    'click a.flagged'             : 'unflagPostClick'
    'click a.toggle'              : 'showPostsFeatureDialog'

  initialize: (options) ->
    throw 'requires currentUser' unless options.currentUser

    @currentUser = options.currentUser
    @parent = options.parent
    @isMe = options.isMe

    @model.ensureRepostsFetched @showOrHideRepostControls
    @reposts = @model.reposts()
    @reposts.on 'all', @renderFeaturedBy, @
    @reposts.on 'all', @showOrHideRepostControls, @

  editPostClick: (event) ->
    # TODO
    window.location = "/post"
    false

  showPostsFeatureDialog: ->
    @postsFeatureDialog ||= new PostsFeatureDialog
      el: @$el
      model: @model
    @postsFeatureDialog.show()
    false

  removePost: =>
    return false unless @isMe || @currentUser.canAdministerContent()
    @parent.feedItems.remove @model
    post = @model
    post.destroy()
    @$el.slideUp =>
      @$el.remove()
      @parent.recomputeEachShowHeight()

  featurePost: =>
    @model.feature()
    alert("Post has been featured.")
    @$('a.feature').addClass('unfeature').removeClass('feature').text('unfeature')

  unfeaturePost: =>
    @model.unfeature()
    alert("Post has been unfeatured.")
    @$('a.unfeature').addClass('feature').removeClass('unfeature').text('feature')

  repostPost: =>
    @model.repost?() ? @model.repost()

  unrepostPost: =>
    return unless @myRepost
    @model.repost?() ? @model.unrepost(@myRepost)

  renderFeaturedBy: =>
    @$('.featured_by').html featuredByTemplate(post: @model)

  setMyRepost: ->
    @myRepost = @reposts?.detect (repost) ->
      repost.isMine()

  showOrHideRepostControls: =>
    @setMyRepost()
    if @myRepost
      @$('a.unrepost').show() if @myRepost.get('id')
      @$('a.repost').hide()
    else
      @$('a.unrepost').hide()
      @$('a.repost').show()

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
    return false unless @currentUser.canAdministerContent() && confirm("Are you sure you want to flag this post?")
    @flagPost()
    false

  unflagPostClick: (event) ->
    return false unless @currentUser.canAdministerContent() && confirm("Are you sure you want to unflag this post?")
    @unflagPost()
    false

  flagPost: ->
    @model.flag()
    @$('a.flag').addClass('flagged').removeClass('flag').text('Flagged')

  unflagPost: ->
    @model.unflag()
    @$('a.flagged').addClass('flag').removeClass('flagged').text('Flag')

  repostPostClick: (event) ->
    @repostPost()
    false

  unrepostPostClick: (event) ->
    @unrepostPost()
    false
