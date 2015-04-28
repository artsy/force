_ = require 'underscore'
Q = require 'q'
{ SHOW, ARTWORKS } = require('sharify').data
{ Cities, FeaturedCities } = require 'places'
PartnerShow = require '../../../models/partner_show.coffee'
PartnerShows = require '../../../collections/partner_shows.coffee'
ShareView = require '../../../components/share/view.coffee'
initCarousel = require '../../../components/merry_go_round/index.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
attachFollowArtists = require '../components/follow_artists/index.coffee'
attachFollowProfile = require '../components/follow_profile/index.coffee'
RelatedShowsView = require '../components/related_shows/view.coffee'
MapModal = require '../components/map_modal/map.coffee'
ZoomView = require '../../../components/modal/zoom.coffee'

module.exports.init = ->
  show = new PartnerShow SHOW
  show.related().artworks.reset ARTWORKS

  initCarousel $('.js-show-installation-shot-carousel'), {
    setGallerySize: false
    imagesLoaded: true
  }, (instance) ->
    instance.cells.flickity.on 'staticClick', (event, pointer, cellElement, cellIndex) ->
      src = $(cellElement).find('img').attr('src')
      new ZoomView imgSrc: src

  artworkColumnsView = new ArtworkColumnsView
    el: $('.js-show-artworks-columns')
    collection: show.related().artworks
    numberOfColumns: 3
    gutterWidth: 80
    maxArtworkHeight: 400
    isOrdered: true
    seeMore: false
    allowDuplicates: true
    artworkSize: 'large'
  artworkColumnsView.$el.addClass 'is-fade-in'

  attachFollowArtists show.related().artists

  attachFollowProfile show.related().profile

  $('.map-modal-link').click -> new MapModal model: show, width: '820px'

  city = _.findWhere(Cities, name: show.formatCity())

  if show.isFairBooth()
    # how to get booths from a fair?
    relatedFairBooths = new PartnerShows
    relatedFairBoothsView = new RelatedShowsView
      collection: relatedFairBooths
      title: "More Booths from #{show.related().fair.get('name')}"
    $('.related-shows').html relatedFairBoothsView.render().$el
    relatedFairBooths.fetch
      data:
        # fair: show.related().fair.get('id')
        size: 4
        displayable: true
        at_a_fair: true
  else
    relatedShows = new PartnerShows
    relatedShowsView = new RelatedShowsView
      collection: relatedShows
      title: "Current Shows in #{show.formatCity()}"
    $('.related-shows').html relatedShowsView.$el
    featuredShows = new PartnerShows
    featuredShowsView = new RelatedShowsView
      collection: featuredShows
      title: "Featured Shows"
    $('.featured-shows').html featuredShowsView.$el
    relatedShows.fetch
      data:
        near: city.coords.toString()
        sort: '-start_at'
        size: 4
        displayable: true
        at_a_fair: false
        status: 'running'
    featuredShows.fetch
      data:
        featured: true
        sort: 'end_at'
        size: 4
        displayable: true
        status: 'running'

  new ShareView el: $('.js-show-share')
