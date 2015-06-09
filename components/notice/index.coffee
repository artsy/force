Backbone = require 'backbone'

module.exports = class Notice extends Backbone.View
  className: 'notice-message'

  events:
    'click .js-notice-message-close': 'close'

  template: -> "
    <span>#{@message}</span>
    <a class='notice-message-close js-notice-message-close icon-close'></a>
  "

  initialize: ({ @message }) -> #

  cacheSelectors: ->
    @$hero = $('#home-hero-units')
    @$header = $('#main-layout-header')
    @$layout = $('#main-layout-container')
    @$foreground = $('#home-foreground')

  render: ->
    @$el.html @template()
    this

  open: ->
    @cacheSelectors()
    @render()
    @$header.prepend @$el
    @adjustLayout()
    @trigger 'open'

  adjustLayout: ->
    @originalMargin = parseInt(@$layout.css 'margin-top')
    height = @$el.outerHeight()
    @$hero.css 'top', "#{height}px"
    @$foreground.css 'margin-top', @$hero.outerHeight() + height
    @$layout.css 'margin-top', "#{@originalMargin + height}px"

  restoreLayout: ->
    @$hero.css 'top', 0
    @$foreground.css 'margin-top', @$hero.outerHeight()
    @$layout.css 'margin-top', "#{@originalMargin}px"

  close: ->
    @restoreLayout()
    @remove()
    @trigger 'close'
