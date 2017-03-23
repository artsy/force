_ = require 'underscore'
Backbone = require 'backbone'
imagesLoaded = require 'imagesloaded'
mediator = require '../../../lib/mediator.coffee'
{ resize } = require '../../../components/resizer/index.coffee'
{ jump } = require '../../../components/jump/view.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'

module.exports = class PartnershipsView extends Backbone.View
  events:
    'click .partnerships-nav-link.internal': 'intercept'
    'click #mktoForm_1238 .mktoButtonRow': 'trackPartner'

  initialize: ->
    @$window = $(window)

    @cacheSelectors()
    @setupStickyNav()
    @setupSectionNavHighlighting()
    @setupHeroUnitSlideshow()
    @setupSectionsSlideshow()
    @setupLiaisonsFading()

  intercept: (e) ->
    href = $(e.currentTarget).attr('href')
    e.preventDefault()
    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: true

  cacheSelectors: ->
    @$nav = @$ '.partnerships-section-nav'
    @$sections = @$ '.partnerships-section'
    @$heroUnitsContainer = @$ '.partnerships-hero-unit-images'
    @$heroUnitsSlides = @$ '.partnerships-hero-unit-image'
    @$liaisonsContainer = @$ '.support-liaisons'

  #
  # Replace a liaison image and info, and call the callback after image
  # has loaded.
  #
  replaceLiaison: ($target, liaison, callback) ->
    $target.find('img').attr 'src', liaison.src
    $target.find('.support-liaison-name').html liaison.name
    $target.find('.support-liaison-location').html liaison.location
    $target.imagesLoaded callback

  #
  # Randomly swap one visible liaison with one invisible liaison.
  #
  swapLiaisons: (liaisons, indexArray, numOfActive) ->
    a = _.random(0, numOfActive - 1)
    b = _.random(numOfActive, liaisons.length - 1)
    $target = $ @$liaisonsContainer.find('.support-liaison').get(a)
    @replaceLiaison $target.find('.current'), liaisons[indexArray[b]], =>
      $target.find('.current').addClass('fade-in')
      $target.find('.previous').addClass('fade-out')
      _.delay =>
        @replaceLiaison $target.find('.previous'), liaisons[indexArray[b]], ->
          $target.find('.current').removeClass('fade-in')
          $target.find('.previous').removeClass('fade-out')
          t = indexArray[a]
          indexArray[a] = indexArray[b]
          indexArray[b] = t
      , 1000

  setupLiaisonsFading: ->
    liaisons = @$liaisonsContainer.data('liaisons')
    numOfActive = @$liaisonsContainer.children('.support-liaison').length
    indexArray = _.range(liaisons.length) if liaisons
    if numOfActive < indexArray
      setInterval (=> @swapLiaisons(liaisons, indexArray, numOfActive)), 1200

  setupStickyNav: ->
    @$nav.waypoint('sticky')
      # waypoint for the very top section
      .waypoint (direction) ->
        backLink = "/#{sd.SUBJECT}-partnerships"
        Backbone.history.navigate( backLink ,
          trigger: false, replace: true) if direction is 'up'

  setupSectionNavHighlighting: ->
    activateNavLink = (el) =>
      @$nav.find('.partnerships-nav-link').removeClass 'is-active'
      href = $(el).data('href')
      Backbone.history.navigate href, trigger: false, replace: true
      @$nav.find("a[href='#{href}']").addClass 'is-active'
    $nav = @$nav
    @$sections
      .waypoint((direction) ->
        activateNavLink(this) if direction is 'down'
      , offset: $nav.outerHeight()).waypoint((direction) ->
        activateNavLink(this) if direction is 'up'
      , offset: -> -$(this).height() - $nav.outerHeight())

    # Waypoint for last element, whose top will never be able to reach the top of the window.
    @$sections.last().waypoint((direction) ->
      activateNavLink(this) if direction is 'down'
      activateNavLink(this.previousSibling) if direction is 'up'
    , offset: -> $(window).height() - $(this).outerHeight())

  setupHeroUnitSlideshow: ->
    @setupSlideshow @$heroUnitsContainer, @$heroUnitsSlides, 'heroUnit'

  setupSectionsSlideshow: ->
    @$('.browser-images').each (i, el) =>
      @setupSlideshow $(el), $(el).find('.browser-image'), "browser#{i}"

    @$('.mobile-images').each (i, el) =>
      @setupSlideshow $(el), $(el).find('.mobile-image'), "mobile#{i}"

  setupSlideshow: ($container, $slides, name, interval = 3000) ->
    @["#{name}Frame"] = 0
    @["#{name}Interval"] = interval
    $container.imagesLoaded =>
      @stepSlide($slides, name)
      setInterval (=> @stepSlide($slides, name)), @["#{name}Interval"]

  stepSlide: ($slides, name) =>
    $active = $slides.filter('.is-active')
      .removeClass('is-active').addClass 'is-deactivating'
    _.delay (-> $active.removeClass 'is-deactivating'), @["#{name}Interval"] / 2
    $($slides.get @["#{name}Frame"]).addClass 'is-active'
    @["#{name}Frame"] = if (@["#{name}Frame"] + 1 < $slides.length)
      @["#{name}Frame"] + 1
    else
      0

  trackPartner: (e) ->
    e.preventDefault()
    email = $("#Email").val()
    analyticsHooks.trigger 'marketo:partner-apply', email: email
    window.location.replace('http://apply.artsy.net/galleries-2.html')
