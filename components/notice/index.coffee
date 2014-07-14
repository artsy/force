Backbone = require 'backbone'

module.exports = class Notice extends Backbone.View
  container: '#main-layout-notice'
  className: 'notice-message'

  events:
    'click .notice-message-close': 'close'

  template: -> """
    <span>#{@message}</span>
    <a class='notice-message-close icon-close'></a>
  """

  initialize: (options = {}) ->
    throw new Error('You must pass a message option') unless options.message
    { @message } = options
    @open()

  cacheSelectors: ->
    @$container = $(@container)
    @$body = $('body')
    @$layout = $('#main-layout-container')
    @$hero = $('#home-hero-units')

  open: ->
    @cacheSelectors()
    @$el.html @template()
    @$container.prepend @$el
    @adjustLayout()

  adjustLayout: ->
    @originalMargin = parseInt(@$layout.css 'margin-top')
    @height = @$el.outerHeight()
    @$hero.css 'top', "#{@height}px"
    @$layout.css 'margin-top', "#{@originalMargin + @height}px"

  restoreLayout: ->
    @$hero.css 'top', 0
    @$layout.css 'margin-top', "#{@originalMargin}px"

  close: =>
    @restoreLayout()
    @remove()
