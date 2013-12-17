Backbone = require 'backbone'

module.exports = class PinterestCustomView extends Backbone.View

  initialize: (options) ->
    { @url, @media, @description } = options
    @$window = $(window)

  events:
    'click .share-to-pinterest': 'showPopUp'

  render: ->
    @$pinterestLink = $("<a class='share-to-pinterest black-tooltip' data-message='Pin It on Pinterest'><i class='icon-pinterest'></i></a>")
    options =
      url: (@url or window.location.href)
      media: @media
      description: @description
    @$pinterestLink.attr href: "//pinterest.com/pin/create/button/?#{$.param(options)}"
    @$el.html @$pinterestLink

  showPopUp: (e) =>
    width   = 575
    height  = 400
    left    = (@$window.width()  - width) / 2
    top     = (@$window.height() - height) / 2
    opts    = "status=1,width=#{width},height=#{height},top=#{top},left=#{left}"
    window.open @$pinterestLink.attr('href'), 'pinterest', opts
    false
