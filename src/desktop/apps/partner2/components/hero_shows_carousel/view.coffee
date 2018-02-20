_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
PartnerShows = require '../../../../collections/partner_shows.coffee'
initCarousel = require '../../../../components/merry_go_round/bottom_nav_mgr.coffee'
template = -> require('./index.jade') arguments...

module.exports = class HeroShowsCarousel extends Backbone.View
  defaults:
    maxNumberOfShows: 10

  initialize: (options = {}) ->
    { @partner, @maxNumberOfShows } = _.defaults options, @defaults

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

    Q.allSettled([
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

    @$el.html template partnerShows: partnerShows
    initCarousel(@$el, wrapAround: true, imagesLoaded: true, (carousel) =>
      flickity = carousel.cells.flickity
      flickity.on 'cellSelect', =>
        i = flickity.selectedIndex
        @$('.hero-show-caption, .mgr-dot').removeClass 'is-active'
        @$(".hero-show-caption:eq(#{i}), .mgr-dot:eq(#{i})").addClass 'is-active'

      ($dots = @$('.mgr-dot')).on 'click', -> flickity.select $dots.index $(this)
      @$('.js-mgr-prev').on 'click', -> flickity.previous()
      @$('.js-mgr-next').on 'click', -> flickity.next()
    ) if partnerShows.length > 1

  remove: ->
    @$el.closest('.partner2-overview-section').remove()
    super
