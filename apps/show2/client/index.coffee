_ = require 'underscore'
Q = require 'bluebird-q'
sd = require('sharify').data
{ Cities, FeaturedCities } = require 'places'
PartnerShow = require '../../../models/partner_show.coffee'
PartnerShows = require '../../../collections/partner_shows.coffee'
ShareView = require '../../../components/share/view.coffee'
initCarousel = require '../../../components/merry_go_round/index.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
attachFollowArtists = require '../components/follow_artists/index.coffee'
attachFollowProfile = require '../components/follow_profile/index.coffee'
attachRelatedShows = require '../components/related_shows/index.coffee'
setupSaveControls = require '../components/save_artworks/index.coffee'
RelatedArticlesView = require '../components/related_articles/view.coffee'
openMapModal = require '../components/map_modal/index.coffee'
openShowEvents = require '../components/events_modal/index.coffee'
blurb = require '../../../components/gradient_blurb/index.coffee'
FlickityZoomSequence = require '../components/flickity_zoom_sequence/index.coffee'

module.exports.init = ->
  # show = new PartnerShow SHOW
  # show.related().artworks.reset ARTWORKS
  bootstrappedShow = sd.PARTNER_SHOW
  blurb $('.show-press-release'), limit: 350

  # $('.js-open-show-events').click (e) ->
  #   e.preventDefault()
  #   openShowEvents(model: show, collection: show.related().showEvents)

  if $('.js-show-installation-shot-carousel').length
    initCarousel $('.js-show-installation-shot-carousel'), {
      setGallerySize: false
      imagesLoaded: true
    }, (instance) ->

      seq = new FlickityZoomSequence instance.cells.flickity
      seq.bind()

  # setupSaveControls show.related().artworks
  attachFollowArtists bootstrappedShow.artists
  attachFollowProfile bootstrappedShow.partner.profile

  $('.js-open-map-modal').click (e) ->
    e.preventDefault()
    openMapModal model: bootstrappedShow

  # if bootstrappedShow.fair
  #   attachRelatedShows 'fair', bootstrappedShow
  # else
  #   if location.search.match "from-show-guide"
  #     attachRelatedShows 'city', bootstrappedShow
  #     attachRelatedShows 'featured', bootstrappedShow
  #   else
  #     attachRelatedShows 'gallery', bootstrappedShow

  # relatedArticlesView = new RelatedArticlesView collection: show.related().articles, numToShow: 3
  # $('.artwork-column').first().prepend relatedArticlesView.$el
  # show.related().articles.fetch()

  new ShareView el: $('.js-show-share')
