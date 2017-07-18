$ = require 'jquery'
_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'
analyticsHooks = require '../../lib/analytics_hooks.coffee'

module.exports = class JumpView extends Backbone.View
  className: 'jump-to-top icon-chevron-up'

  defaults:
    direction: 'top' # Direction to animate in from
    duration: 500 # Scroll animation duration
    threshold: 400 # Point at which to hide the navigation
    frequency: 150 # How often scroll position is checked
    position: 0 # where the button scrolls to

  initialize: (options = {}) ->
    {
      @duration,
      @threshold,
      @frequency,
      @direction,
      @position,
      @element, # element to jump to, height evaluated after JumpView is mounted
      @offset # offset of that element
    } = _.defaults options, @defaults

    @$el.addClass "from-#{@direction}"
    @isScrolling = false
    @shouldBe (@state = 'hidden')
    (@$window = $(window))
      .on 'scroll.jump', _.throttle @toggle, @frequency

    mediator.on 'scroll:top', @scrollToTop, this
    mediator.on 'scroll:position', @scrollToPosition, this

  events:
    'click': 'scrollToTop'

  # Toggles the visibility state of the jump navigation depending
  # on where the browsers scroll position is in relation to `@threshold`
  #
  # Toggle is executed as long as we are not currently scrolling and
  # the new state is different than the current state
  toggle: =>
    return if @isScrolling
    state = if @$window.scrollTop() > @threshold then 'visible' else 'hidden'
    @shouldBe state if @state isnt state

  # Set the data state of the jump link
  # Should be 'hidden' or 'visible'
  #
  # @param {String} state
  shouldBe: (state) ->
    @$el.attr 'data-state', (@state = state)

  # Scrolls to a position on the page
  #
  # @param {Integer} position
  scrollToPosition: (position) ->
    @isScrolling = true
    (@$htmlBody ?= $('html, body'))
      .animate { scrollTop: position }, @duration, =>
        @isScrolling = false
        mediator.trigger 'scrolled:position', position

  # Simultaneously scrolls to the top of the page
  # and hides the jump navigation
  scrollToTop: ->
    @shouldBe 'hidden'
    if @element?.length > 0
      if @offset?.length > 0
        @scrollToPosition @element.offset().top - @offset.height()
      else
        @scrollToPosition @element.offset().top
    else
      @scrollToPosition @position
    analyticsHooks.trigger 'jump:scroll-to-top'

  remove: ->
    @$window.off 'scroll.jump'
    mediator.off null, null, this
    super
