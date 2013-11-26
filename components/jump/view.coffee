_         = require 'underscore'
Backbone  = require 'backbone'
mediator  = require '../../lib/mediator.coffee'

module.exports = class JumpView extends Backbone.View
  className: 'jump-to-top icon-chevron-up'

  initialize: (options) ->
    { @duration, @threshold, @frequency } =
      _.defaults (options || {}),
        duration:   500 # Scroll animation duration
        threshold:  400 # Point at which to hide the navigation
        frequency:  250 # How often scroll position is checked

    @isScrolling = false
    @state = 'hidden'

    @shouldBe @state

    @toggler = _.throttle((=> @toggle()), @frequency)

    $(window).on 'scroll', @toggler

    mediator.on 'scroll:top', @scrollToTop, this
    mediator.on 'scroll:position', @scrollToPosition, this

  events:
    'click': 'scrollToTop'

  # Toggles the visibility state of the jump navigation depending
  # on where the browsers scroll position is in relation to `@threshold`
  #
  # Toggle is executed as long as we are not currently scrolling and
  # the new state is different than the current state
  toggle: ->
    return if @isScrolling
    state = if $(window).scrollTop() > @threshold then 'visible' else 'hidden'
    @shouldBe state if @state != state

  # Set the data state of the jump link
  # Should be 'hidden' or 'visible'
  #
  # @param {String} state
  shouldBe: (state) ->
    @state = state
    @$el.attr 'data-state', @state

  # Scrolls to a position on the page
  #
  # @param {Integer} position
  scrollToPosition: (position) ->
    @isScrolling = true
    $('html, body').animate { scrollTop: position }, @duration, =>
      @isScrolling = false
      mediator.trigger 'scrolled:position', position

  # Simultaneously scrolls to the top of the page
  # and hides the jump navigation
  scrollToTop: ->
    @shouldBe 'hidden'
    @scrollToPosition 0

  remove: ->
    $(window).off 'scroll', @toggler

    mediator.off null, null, this

    super
