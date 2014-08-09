_ = require 'underscore'
Backbone = require 'backbone'
imagesLoaded = require 'imagesloaded'
{ isTouchDevice } = require '../../../components/util/device.coffee'
mediator = require '../../../lib/mediator.coffee'
ZoomView = require '../../../components/modal/zoom.coffee'

module.exports = class AboutView extends Backbone.View
  events:
    'click .about2-nav-link': 'intercept'
    'click .about2-signup-button': 'signup'
    'submit #about2-phone-link': 'submitPhoneLink'
    'click #about2-section5-jobs-all-button': 'displayJobs'
    'click .about2-image-zoom': 'zoomImage'

  initialize: ->
    @$window = $(window)
    @$window.on 'keyup', @toggleGrid

    @cacheSelectors()
    @setupStickyNav()
    @setupSectionNavHighlighting()
    @setupHeroUnitSlideshow()
    @setupHeroUnits()
    @setupFlipHearts()

  zoomImage: (e) ->
    e.preventDefault()
    new ZoomView imgSrc: $(e.currentTarget).attr 'href'

  signup: (e) ->
    mediator.trigger 'open:auth', mode: 'register'

  intercept: (e) ->
    e.preventDefault()
    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: true

  cacheSelectors: ->
    @$nav = @$('.about2-section-nav')
    @$sections = @$('.about2-section')
    @$heroUnitsContainer = @$('.about2-hero-unit-bgs')
    @$heroUnits = @$('.about2-hero-unit-bg')
    @$heroUnitNav = @$('.about2-nav')
    @$jobs = @$('#about2-section5-jobs')

  setupStickyNav: ->
    @$nav.waypoint 'sticky'

  setupSectionNavHighlighting: ->
    $nav = @$nav
    $sections = @$sections
    activateNavLink = (el) ->
      $sections.removeClass 'is-active'
      $section = $(el).addClass 'is-active'
      $nav.find('a').removeClass 'is-active'
      href = $section.data('href')
      Backbone.history.navigate href, trigger: false, replace: true
      $nav.find("a[href='#{href}']").addClass 'is-active'
    @$sections
      .waypoint((direction) ->
        activateNavLink(this) if direction is 'down'
      ).waypoint (direction) ->
        activateNavLink(this) if direction is 'up'
      , offset: -> -$(this).height()

  setupHeroUnits: ->
    $nav = @$nav
    $heroUnitsContainer = @$heroUnitsContainer
    @$heroUnitNav
      # Fade in/out hero unit nav
      .waypoint((direction) ->
        if direction is 'down'
          $(this).css 'opacity', 0
          $heroUnitsContainer.css 'opacity', 0
        else
          $(this).css 'opacity', 1
          $heroUnitsContainer.css 'opacity', 1
      # Set a waypoint for the very top section
      ).waypoint (direction) ->
        Backbone.history.navigate '/about2', trigger: false, replace: true
        $nav.find('a').removeClass 'is-active'
      , offset: -> -($(this).height() - 1)

  setupHeroUnitSlideshow: ->
    @currentHeroUnit = 0
    @heroUnitPauseInterval = 4000
    @$heroUnitsContainer.imagesLoaded =>
      @$heroUnitsContainer.addClass 'is-fade-in'
      setInterval @stepHeroUnit, @heroUnitPauseInterval

  stepHeroUnit: =>
    $(@$heroUnits.removeClass('is-active').get @currentHeroUnit).addClass('is-active')
    @currentHeroUnit = if (@currentHeroUnit + 1 < @$heroUnits.length) then @currentHeroUnit + 1 else 0

  displayJobs: (e) ->
    e.preventDefault()
    $(e.currentTarget).addClass 'is-clicked'
    @$jobs.removeClass 'is-truncated'

  toggleGrid: (e) =>
    @$('#about2-grid').toggle() if e.which is 71 # "g" key

  setupFlipHearts: ->
    @$("#about2-section1-pull-blurb-3-artworks .about2-image-container").waypoint
      handler: (dir) ->
        $(this).find('.icon-heart')[if dir is 'down' then 'addClass' else 'removeClass'] 'is-active'
      offset: -> $(window).height() * 0.6

  submitPhoneLink: (e) ->
    e.preventDefault()
    @$('#about2-phone-link button').addClass 'is-loading'
    $.ajax
      type: 'POST'
      url: '/about2/sms'
      data: to: @$('#about2-phone-link input').val()
      complete: =>
        @$('#about2-phone-link button').removeClass 'is-loading'
