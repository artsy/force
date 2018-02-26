_ = require 'underscore'
Backbone = require 'backbone'
{ isTouchDevice } = require '../../../components/util/device.coffee'
mediator = require '../../../lib/mediator.coffee'
zoom = require '../../../components/zoom/index.coffee'
{ resize } = require '../../../components/resizer/index.coffee'
openFeedback = require '../../../components/simple_contact/feedback.coffee'
Cycle = require '../../../components/cycle/index.coffee'

module.exports = class AboutView extends Backbone.View
  events:
    'click .about-nav-link': 'intercept'
    'click .about-signup-button': 'signup'
    'submit #about-phone-link': 'submitPhoneLink'
    'click .about-image-zoom': 'zoomImage'
    'click .about-section2-contact-specialist': 'contactSpecialistModal'

  initialize: ->
    @$window = $(window)
    @$window.on 'scroll', _.throttle(@iphoneScroll, 200)

    @cacheSelectors()
    @setupStickyNav()
    @setupSectionNavHighlighting()
    @setupHeroUnitSlideshow()
    @setupHeroUnits()
    @setupFlipHearts()
    @setupGenes()
    @setImages()

  zoomImage: (e) ->
    e.preventDefault()
    zoom $(e.currentTarget).attr('href')

  signup: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth',
      mode: 'register',
      signupIntent: 'about page signup cta'

  intercept: (e) ->
    e.preventDefault()
    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: true

  cacheSelectors: ->
    @$nav = @$('.about-section-nav')
    @$sections = @$('.about-section')
    @$heroUnitsContainer = @$('.about-hero-unit-bgs')
    @$heroUnits = @$('.about-hero-unit-bg')
    @$heroUnitNav = @$('.about-nav')
    @$genes = @$('.about-genome-work-gene')
    @$spinner = @$('#about-spinner')
    @$iphone = @$('.about-section1-phone-container')
    @$iphoneBg = @$('.about-section1-phone-bg')

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
        Backbone.history.navigate '/about', trigger: false, replace: true
        $nav.find('a').removeClass 'is-active'
      , offset: -> -($(this).height() - 1)

  setupHeroUnitSlideshow: ->
    @heroUnitCycle = new Cycle $el: @$('.about-hero-unit-bgs'), selector: '.about-hero-unit-bg'
    @heroUnitCycle.start()

  setupFlipHearts: ->
    @$("#about-section1-pull-blurb-3-artworks .about-image-container").waypoint
      handler: (dir) ->
        $(this).find('.icon-heart')[if dir is 'down' then 'addClass' else 'removeClass'] 'is-active'
      offset: '50%'

  submitPhoneLink: (e) ->
    e.preventDefault()
    @$('#about-phone-link button').addClass 'is-loading'
    $.ajax
      type: 'POST'
      url: '/about/sms'
      data: to: @$('#about-phone-link input').val()
      error: (xhr) ->
        $('.about-section1-phone-success').hide()
        $('.about-section1-phone-error').show().text(xhr.responseJSON.msg)
      success: ->
        $('.about-section1-phone-success').show().text('Message sent, please check your phone.')
        $('.about-section1-phone-error').hide()
      complete: ->
        $('#about-phone-link button').removeClass 'is-loading'

  setupGenes: ->
    @$genes.waypoint (direction) ->
      $(this).addClass 'is-active' if direction is 'down'
      $(this).removeClass 'is-active' if direction is 'up'
    , offset: '90%'

  loadUptoSection: (selector, callback) ->
    @loadedSections ?= []
    return callback() if _.contains @loadedSections, selector.substring(1)
    $section = @$sections.filter selector
    $sections = @$sections.slice 0, $section.index()
    $.when.apply(null, _.map $sections, (el) =>
      @loadSection($el = $(el)).then =>
        @loadedSections.push $el.attr 'id'
    ).then callback

  loadSection: ($section) ->
    $images = $section.find('img')
    $images.each @setImage
    $images.imagesLoaded()

  setImage: ->
    $img = $(this)
    src = $img.data 'src'
    $parent = $img.parent()
    $parent.imagesLoaded -> $.waypoints('refresh')
    width = $parent.width()
    src = resize(src, width: width * (window.devicePixelRatio or 1))
    $img.attr 'src', src

  setImages: ->
    @$('img').each @setImage

  contactSpecialistModal: (e) ->
    e.preventDefault()
    openFeedback()

  iphoneScroll: =>
    windowBottom = @$window.scrollTop() + @$window.height()
    iphoneTop = @$iphone.offset().top
    return unless windowBottom > iphoneTop
    offset = (windowBottom - iphoneTop) * 0.4
    @$iphoneBg.css transform: "translateY(-#{offset}px)"
