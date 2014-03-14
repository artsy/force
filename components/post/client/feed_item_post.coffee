_                       = require 'underscore'
Backbone                = require 'backbone'
sd                      = require('sharify').data
analytics               = require('../../../lib/analytics.coffee')
ShareView               = require '../../share/view.coffee'
PostAdmin               = require('./post_admin.coffee')
PostVideoLink           = require('./post_video_link.coffee')
Attachments             = require('../collections/post_attachments.coffee')

module.exports.FeedItemPost = class FeedItemPost extends Backbone.View

  lineHeight: 25
  bodyPadding: 150
  minHeight: 240

  initialize: (options) ->
    throw 'requires a model' unless @model

    @parent = options.parent
    @post = @model.toChildModel()

    @setupShareButtons()
    @initializePostLinks()

    if options.currentUser
      isMe = @isMe()
      if isMe or options.currentUser.isAdmin()
        new PostAdmin
          el         : @el
          isMe       : isMe
          model      : @post
          parent     : @parent
          currentUser: options.currentUser

    if options.limitPostBodyHeight
      _.defer(=> @sizeBody())

  isMe: -> @post.profile()?.isMe()

  setupShareButtons: ->
    new ShareView el: @$('.feed-item-share-section')

  sizeBody: ->
    $body = @$('.feed-left-column .body')
    @bodyHeight = $body.height() # for animation

    # right column max height
    topSectionHeight = @$('.feed-item-post-label').height()

    rightColumnHeight = @$('.feed-right-column').height() or 0
    rightColumnMaxHeight = rightColumnHeight - topSectionHeight - (@bodyPadding / 2)

    maxHeight = @parent.windowHeight - @bodyPadding - topSectionHeight
    maxHeight = if rightColumnMaxHeight > 0 and rightColumnMaxHeight < maxHeight then rightColumnMaxHeight else maxHeight
    maxHeight = @minHeight if maxHeight < @minHeight

    if @bodyHeight > maxHeight
      maxHeight = Math.floor(maxHeight / @lineHeight) * @lineHeight - (Math.floor(@lineHeight/2))
      $body.css 'max-height': "#{maxHeight}px"
      @$('.see-post').show()

      @parent.recomputeItem @$el

  initializePostLinks: ->
    @$('.video-link').each (index, item) =>
      attachments = new Attachments(@post.get('attachments'))
      model = attachments.get($(item).data('attachment'))
      view = new PostVideoLink
        el    : item
        model : model
        onPlay: => @parent.recomputeEachShowHeight()

  events:
    'click .see-post' : 'seeMore'

  seeMore: ->
    analytics.track.click "Clicked show more on post"
    @$('.feed-left-column .body').animate('max-height': @bodyHeight, 200, => @parent.recomputeEachShowHeight())
    @$('.see-post').hide()
    false
