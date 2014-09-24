_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
{ resize } = require '../../../components/resizer/index.coffee'

module.exports = class GalleryPartnershipsView extends Backbone.View
  events:
    'click .gallery-partnerships-nav-link': 'intercept'

  initialize: ->
    @$window = $(window)

    @cacheSelectors()
    @setupStickyNav()
    @setupSectionNavHighlighting()

  intercept: (e) ->
    e.preventDefault()
    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: true

  cacheSelectors: ->
    @$nav = @$ '.gallery-partnerships-section-nav'
    @$sections = @$ '.gallery-partnerships-section'

  setupStickyNav: ->
    @$nav.waypoint 'sticky'

  setupSectionNavHighlighting: ->
    activateNavLink = (el) =>
      @$nav.find('.gallery-partnerships-nav-link').removeClass 'is-active'
      href = $(el).data('href')
      Backbone.history.navigate href, trigger: false, replace: true
      @$nav.find("a[href='#{href}']").addClass 'is-active'
    @$sections
      .waypoint((direction) ->
        activateNavLink(this) if direction is 'down'
      ).waypoint (direction) ->
        activateNavLink(this) if direction is 'up'
      , offset: -> -$(this).height()
