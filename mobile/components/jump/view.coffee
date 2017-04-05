_ = require 'underscore'
Backbone = require 'backbone'
analyticsHooks = require '../../lib/analytics_hooks'

module.exports = class JumpView extends Backbone.View

  defaults:
    direction: 'top' # Direction to animate in from
    duration: 500 # Scroll animation duration
    position: 0 # where the button scrolls to

  initialize: (options = {}) ->
    {
      @duration,
      @direction,
      @position
    } = _.defaults options, @defaults

    @$el.addClass "from-#{@direction}"
    @isScrolling = false

  # Scrolls to a position on the page
  #
  # @param {Integer} position
  scrollToPosition: (position) ->
    @isScrolling = true
    (@$htmlBody ?= $('html, body'))
      .animate { scrollTop: position }, @duration, =>
        @isScrolling = false
