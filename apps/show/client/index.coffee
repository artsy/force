_ = require 'underscore'
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

  relatedShows = new PartnerShows

  relatedShows.comparator = (show) -> Date.parse(show.get('end_at'))

  relatedShowsView = new RelatedShowsView
    criteria:
      near: city.coords.toString()
      sort: '-start_at'
      size: 4
      displayable: true
      at_a_fair: false
      status: 'running'
    collection: relatedShows
    title: "Current Shows in #{show.formatCity()}"

  $('.related-shows').append relatedShowsView.$el

  new ShareView el: $('.js-show-share')
