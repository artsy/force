_ = require 'underscore'
Backbone = require 'backbone'
PartnerShows = require '../../../../collections/partner_shows.coffee'
initCarousel = require '../../../../components/merry_go_round/bottom_nav_mgr.coffee'
require '../../../../../lib/promiseDone'
template = -> require('./index.jade') arguments...

module.exports = class HeroShowsCarousel extends Backbone.View
  defaults:
    maxNumberOfShows: 50
    numberOfActiveDots: 5

  initialize: (options = {}) ->
    { @partner, @maxNumberOfShows, @numberOfActiveDots } = _.defaults options, @defaults

  startUp: ->
    @fetchShows().then(@initCarousel).done()

  fetchShows: ->
    url = "#{@partner.url()}/shows"
    criteria =
      size: @maxNumberOfShows
      sort: '-end_at'
      displayable: true

    featured = new PartnerShows
    current = new PartnerShows
    upcoming = new PartnerShows
    past = new PartnerShows

    Promise.allSettled([
      featured.fetch url: url, data: _.defaults(size: 1, sort: '-featured,-end_at', criteria)
      current.fetch  url: url, data: _.defaults(status: 'running', sort: 'end_at', criteria)
      upcoming.fetch url: url, data: _.defaults(status: 'upcoming', sort: 'start_at', criteria)
      past.fetch     url: url, data: _.defaults(status: 'closed', criteria)
    ])
    .then =>
      featured.reset() unless featured.first()?.get('featured')  # Empty the collection if the show is not featured.
      _.each [current, upcoming, past], (a) -> a.remove featured.models
      displayable = _.flatten _.map [featured, current, upcoming], (c) -> c.models
      displayable = past.models.slice(0, 2) if displayable.length is 0
      displayable.slice(0, @maxNumberOfShows)

  initCarousel: (partnerShows) =>
    return @remove() unless partnerShows.length > 0

    @$el.html template partnerShows: partnerShows, numberOfActiveDots: @numberOfActiveDots
    initCarousel(@$el, imagesLoaded: true, (carousel) =>
      flickity = carousel.cells.flickity
      flickity.on 'cellSelect', =>
        @swipeDots(@$el, @numberOfActiveDots, flickity.selectedIndex)
        @updatePrevNext(flickity.selectedIndex, partnerShows.length)

      @$('.js-mgr-prev').on 'click', -> flickity.previous()
      @$('.js-mgr-next').on 'click', -> flickity.next()
    ) if partnerShows.length > 1

  updatePrevNext: (selectedIndex, cellsCount) =>
    @$('.js-mgr-prev').attr 'disabled', selectedIndex is 0
    @$('.js-mgr-next').attr 'disabled', selectedIndex is cellsCount - 1

  swipeDots: ($el, numberOfActiveDots, selectedIndex) ->
    $el.find('.hero-show-caption, .mgr-dot').removeClass 'is-active'

    i = selectedIndex
    $selectedDot = $el.find(".mgr-dot").eq(i)
    $selectedCaption = $el.find(".hero-show-caption").eq(i)
    $selectedDot.add($selectedCaption).addClass 'is-active'

    # . . . o O O O O O o . . .

    # If a de-emphasized dot on one edge is selected, we show the adjacent hidden dot;
    # on the other edge, hide the de-emphasized dot and de-emphasize the normal dot;
    # move the rail.
    if $selectedDot.hasClass('is-deemphasized')
      $rightDot = $selectedDot.next()
      $leftDot = $selectedDot.prev()

      if $leftDot.is(':not(.is-deemphasized)') # on the right edge
        $headActiveDot = $el.find(".mgr-dot").eq(i - numberOfActiveDots)
        $headActiveDot.addClass('is-deemphasized').prev().addClass('is-hidden')
        $rightDot.removeClass('is-hidden')
        $refDot = $leftDot
      else if $rightDot.is(':not(.is-deemphasized)') # on the left edge
        $tailActiveDot = $el.find(".mgr-dot").eq(i + numberOfActiveDots)
        $tailActiveDot.addClass('is-deemphasized').next().addClass('is-hidden')
        $leftDot.removeClass('is-hidden')
        $refDot = $rightDot

      if $refDot?
        offset = $refDot.offset().left - $selectedDot.offset().left
        $el.find('.mgr-dot').css({left: "+=#{offset}"})

      $selectedDot.removeClass('is-deemphasized')

  remove: ->
    @$el.closest('.partner2-overview-section').remove()
    super
