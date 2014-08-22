_ = require 'underscore'
Backbone = require 'backbone'
imagesLoaded = require 'imagesloaded'
{ isRetina, isTouchDevice } = require '../../../components/util/device.coffee'
mediator = require '../../../lib/mediator.coffee'
ZoomView = require '../../../components/modal/zoom.coffee'
{ resize } = require '../../../lib/resizer.coffee'
FeedbackView = require '../../../components/contact/feedback.coffee'

module.exports = class AboutView extends Backbone.View
  events:
    'click .about-nav-link': 'intercept'
    'click .about-signup-button': 'signup'
    'submit #about-phone-link': 'submitPhoneLink'
    'click #about-section5-jobs-all-button': 'displayJobs'
    'click .about-image-zoom': 'zoomImage'
    'click .about-section2-contact-specialist': 'contactSpecialistModal'

  initialize: ->
    @$window = $(window)
    @$window.on 'keyup', @toggleGrid
    @$window.on 'scroll', @iphoneScroll

    @cacheSelectors()
    @setupStickyNav()
    @setupSectionNavHighlighting()
    @setupHeroUnitSlideshow()
    @setupHeroUnits()
    @setupFlipHearts()
    @setupSkylineSlideshow()
    @setupGenes()
    @setImages()

  zoomImage: (e) ->
    e.preventDefault()
    new ZoomView imgSrc: $(e.currentTarget).attr 'href'

  signup: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', mode: 'register'

  intercept: (e) ->
    e.preventDefault()
    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: true

  cacheSelectors: ->
    @$nav = @$('.about-section-nav')
    @$sections = @$('.about-section')
    @$heroUnitsContainer = @$('.about-hero-unit-bgs')
    @$heroUnits = @$('.about-hero-unit-bg')
    @$heroUnitNav = @$('.about-nav')
    @$jobs = @$('#about-section5-jobs')
    @$skylineContainer = @$('#about-section5-slideshow')
    @$skylineSlides = @$('.about-section5-slide')
    @$genes = @$('.about-genome-work-gene')
    @$spinner = @$('#about-spinner')

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
    @setupSlideshow @$heroUnitsContainer, @$heroUnits, 'heroUnit'

  setupSkylineSlideshow: ->
    @setupSlideshow @$skylineContainer, @$skylineSlides, 'skyline', 3000

  setupSlideshow: ($container, $slides, name, speed = 4000) ->
    @["#{name}Frame"] = 0
    @["#{name}Interval"] = speed
    $container.imagesLoaded =>
      $container.addClass 'is-fade-in'
      @stepSlide($slides, name)
      setInterval (=> @stepSlide($slides, name)), @["#{name}Interval"]

  stepSlide: ($slides, name) =>
    $active = $slides.filter('.is-active')
      .removeClass('is-active').addClass 'is-deactivating'
    _.delay (=> $active.removeClass 'is-deactivating'), @["#{name}Interval"] / 2
    $($slides.get @["#{name}Frame"]).addClass 'is-active'
    @["#{name}Frame"] = if (@["#{name}Frame"] + 1 < $slides.length)
      @["#{name}Frame"] + 1
    else
      0

  displayJobs: (e) ->
    e.preventDefault()
    $(e.currentTarget).addClass 'is-clicked'
    @$jobs.removeClass 'is-truncated'

  toggleGrid: (e) =>
    @$('#about-grid').toggle() if e.which is 71 # "g" key

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
        $('.about-section1-phone-error').show().text(xhr.responseJSON.msg)
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
    setImage = @setImage
    $images = $section.find('img')
    $images.each -> setImage this
    $images.imagesLoaded()

  setImage: (img) ->
    $img = $(img)
    src = $img.data 'src'
    $parent = $img.parent()
    $parent.imagesLoaded -> $.waypoints('refresh')
    width = $parent.width()
    src = if isRetina() then src else resize(src, width: width)
    $img.attr 'src', src

  setImages: ->
    setImage = @setImage
    if isTouchDevice()
      @$('img').each -> setImage this
    else
      @$('img').waypoint ->
        setImage this
      , triggerOnce: true, offset: '200%'

  contactSpecialistModal: (e) ->
    e.preventDefault()
    new FeedbackView

  iphoneScroll: =>
    windowBottom = @$window.scrollTop() + @$window.height()
    iphoneTop = @$('.about-section1-phone-container').offset().top
    return unless windowBottom > iphoneTop
    offset = (windowBottom - iphoneTop) * 0.4
    @$('.about-section1-phone-bg').css transform: "translateY(-#{offset}px)"
