Backbone = require 'backbone'
_ = require 'underscore'

module.exports = class TeamChannelNavView extends Backbone.View

  events: ->
    'click .js-team-channel-toggle-hamburger' : 'toggleHamburgerNav'

  initialize: ({ @channel, @offset, @$waypointEl, @$content }) ->
    @$body = $('body')
    @setupStickyNav()

  setupStickyNav: ->
    # @$waypointEl refers to the element that controls the is-sticky class
    if @$waypointEl
      @$waypointEl.waypoint (direction) =>
        if direction is 'down'
          @$body.addClass 'is-sticky'
        else
          @$body.removeClass 'is-sticky'
      , { offset: @offset }
    else
      @$body.addClass 'is-sticky'
      $('.mlh-navbar').hide()

  toggleHamburgerNav: ->
    if @$body.hasClass 'is-open'
      @$body.removeClass 'is-open'
      @$content.css 'transform', "translate3d(0, 0, 0)"
    else
      withHeader = if $('body.is-sticky').length > 0 then 0 else 92 #height of nav
      height = $('.team-channel-nav__links a').length * 50 + withHeader
      @$body.addClass 'is-open'
      @$content.css 'transform', "translate3d(0, #{height}px, 0)"
