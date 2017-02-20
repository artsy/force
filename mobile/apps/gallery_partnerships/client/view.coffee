_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class GalleryPartnershipsView extends Backbone.View
  events:
    'click .gallery-partnerships-nav-link': 'intercept'

  initialize: ->
    @$window = $(window)

    @cacheSelectors()
    @setupHeroUnitSlideshow()
    @setupSectionsSlideshow()

  intercept: (e) ->
    e.preventDefault()
    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: true

  cacheSelectors: ->
    @$nav = @$ '.gallery-partnerships-section-nav'
    @$sections = @$ '.gallery-partnerships-section'
    @$heroUnitsContainer = @$ '.gallery-partnerships-hero-unit-images'
    @$heroUnitsSlides = @$ '.gallery-partnerships-hero-unit-image'

  setupHeroUnitSlideshow: ->
    @setupSlideshow @$heroUnitsContainer, @$heroUnitsSlides, 'heroUnit'

  setupSectionsSlideshow: ->
    @$('.browser-images').each (i, el) =>
      @setupSlideshow $(el), $(el).find('.browser-image'), "browser#{i}"

  setupSlideshow: ($container, $slides, name, interval = 4000) ->
    @["#{name}Frame"] = 0
    @["#{name}Interval"] = interval
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
