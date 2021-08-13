_ = require 'underscore'
Backbone = require 'backbone'
{ isTouchDevice } = require '../../../components/util/device.coffee'
zoom = require '../../../components/zoom/index.coffee'
{ resize } = require '../../../components/resizer/index.coffee'
openFeedback = require '../../../components/simple_contact/feedback.coffee'
Cycle = require '../../../components/cycle/index.coffee'
{ openAuthModal } = require '../../../lib/openAuthModal'
{ ModalType } = require "../../../../v2/Components/Authentication/Types"
{ Intent, ContextModule } = require "@artsy/cohesion"

module.exports = class AboutView extends Backbone.View
  events:
    'click .about-nav-link': 'intercept'
    'click .about-signup-button': 'signup'
    'click .about-image-zoom': 'zoomImage'
    'click .about-section2-contact-specialist': 'contactSpecialistModal'

  initialize: ->
    @$window = $(window)

    @cacheSelectors()
    @setupStickyNav()
    @setupSectionNavHighlighting()
    @setupHeroUnitSlideshow()
    @setupHeroUnits()
    @setupFlipHearts()
    @setupGenes()

  zoomImage: (e) ->
    e.preventDefault()
    zoom $(e.currentTarget).attr('href')

  signup: (e) ->
    e.preventDefault()
    openAuthModal(ModalType.signup, {
      copy: "Sign up to save artworks"
      intent: Intent.saveArtwork,
      destination: location.href
      contextModule: ContextModule.saveWorksCTA
    })

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
    return unless @$('.about-hero-unit-bgs').length
    @heroUnitCycle = new Cycle $el: @$('.about-hero-unit-bgs'), selector: '.about-hero-unit-bg'
    @heroUnitCycle.start()

  setupFlipHearts: ->
    @$("#about-section1-pull-blurb-3-artworks .about-image-container").waypoint
      handler: (dir) ->
        $(this).find('.icon-heart')[if dir is 'down' then 'addClass' else 'removeClass'] 'is-active'
      offset: '50%'

  setupGenes: ->
    @$genes.waypoint (direction) ->
      $(this).addClass 'is-active' if direction is 'down'
      $(this).removeClass 'is-active' if direction is 'up'
    , offset: '90%'

  contactSpecialistModal: (e) ->
    e.preventDefault()
    openFeedback()
