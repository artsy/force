Backbone = require 'backbone'

module.exports = class TwitterCustomView extends Backbone.View

  events:
    'click .share-to-twitter': 'showPopUp'

  initialize: (options) ->
    { @text, @url, @hideVia } = options
    @$window = $(window)

  render: ->
    @$tweetLink = $("<a class='share-to-twitter tip' data-message='Share on Twitter'><i class='icon-twitter'></i></a>")
    options =
      text: @text
      url: (@url or window.location.href)
      related: 'artsy'

    unless @hideVia?
      via: 'artsy'
    @$tweetLink.attr href: "http://twitter.com/share?#{$.param(options)}"
    @$el.html @$tweetLink

  showPopUp: (e) =>
    width   = 575
    height  = 400
    left    = (@$window.width()  - width) / 2
    top     = (@$window.height() - height) / 2
    opts    = "status=1,width=#{width},height=#{height},top=#{top},left=#{left}"
    window.open @$tweetLink.attr('href'), 'twitter', opts
    false
