_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
imagesLoaded = require 'imagesloaded'
{ resize } = require '../../../components/resizer/index.coffee'

module.exports = class GalleryPartnershipsView extends Backbone.View
  events:
    'click .gallery-partnerships-nav-link': 'intercept'

  initialize: ->
    @$window = $(window)

    @cacheSelectors()
    @setupStickyNav()
    @setupSectionNavHighlighting()
    @setupHeroUnitSlideshow()
    @setupSectionsSlideshow()
    @setupLiaisonsFading()

  intercept: (e) ->
    e.preventDefault()
    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: true

  cacheSelectors: ->
    @$nav = @$ '.gallery-partnerships-section-nav'
    @$sections = @$ '.gallery-partnerships-section'
    @$heroUnitsContainer = @$ '.gallery-partnerships-hero-unit-images'
    @$heroUnitsSlides = @$ '.gallery-partnerships-hero-unit-image'
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
    indexArray = _.range(liaisons.length)
    setInterval (=> @swapLiaisons(liaisons, indexArray, numOfActive)), 1200

  setupStickyNav: ->
    @$nav.waypoint('sticky')
      # waypoint for the very top section
      .waypoint (direction) ->
        Backbone.history.navigate('/gallery-partnerships',
          trigger: false, replace: true) if direction is 'up'

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

  setupHeroUnitSlideshow: ->
    @setupSlideshow @$heroUnitsContainer, @$heroUnitsSlides, 'heroUnit'

  setupSectionsSlideshow: ->
    @$('.browser-images').each (i, el) =>
      @setupSlideshow $(el), $(el).find('.browser-image'), "browser#{i}"

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
