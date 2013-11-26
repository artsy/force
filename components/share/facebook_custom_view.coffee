Backbone = require 'backbone'

module.exports = class FacebookCustomView extends Backbone.View

  events:
    'click .share-to-facebook': 'showPopUp'

  initialize: (options) ->
    { @url } = options
    @$window = $(window)

  render: ->
    @$fbLink = $("<a class='share-to-facebook icon-facebook'></a>")
    options = u: (@url or window.location.href)
    @$fbLink.attr href: "http://www.facebook.com/sharer.php?#{$.param(options)}"
    @$el.html @$fbLink

  showPopUp: (e) =>
    width   = 548
    height  = 325
    left    = (@$window.width()  - width) / 2
    top     = (@$window.height() - height) / 2
    opts    = "status=1,width=#{width},height=#{height},top=#{top},left=#{left}"
    window.open @$fbLink.attr('href'), 'sharer', opts
    false

