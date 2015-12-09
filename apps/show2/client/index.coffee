_ = require 'underscore'
Q = require 'bluebird-q'
sd = require('sharify').data
ShareView = require '../../../components/share/view.coffee'
initCarousel = require '../../../components/merry_go_round/index.coffee'
attachFollowArtists = require '../components/follow_artists/index.coffee'
attachFollowProfile = require '../components/follow_profile/index.coffee'
setupSaveControls = require '../components/save_artworks/index.coffee'
RelatedArticlesView = require '../components/related_articles/view.coffee'
openMapModal = require '../components/map_modal/index.coffee'
openShowEvents = require '../components/events_modal/index.coffee'
blurb = require '../../../components/gradient_blurb/index.coffee'
FlickityZoomSequence = require '../components/flickity_zoom_sequence/index.coffee'
attachRelatedShows = require '../components/related_shows/index.coffee'

module.exports.init = ->
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

  setupSaveControls bootstrappedShow.artworks
  attachFollowArtists bootstrappedShow.artists
  attachFollowProfile bootstrappedShow.partner.profile

  $('.js-open-map-modal').click (e) ->
    e.preventDefault()
    openMapModal model: bootstrappedShow

  if bootstrappedShow.fair
    attachRelatedShows 'fair', bootstrappedShow
  else
    if location.search.match "from-show-guide"
      attachRelatedShows 'city', bootstrappedShow
      attachRelatedShows 'featured', bootstrappedShow
    else
      attachRelatedShows 'gallery', bootstrappedShow
  
  relatedArticlesEl = $('.js-related-articles')    
  relatedArticlesView = new RelatedArticlesView showId: bootstrappedShow._id, numToShow: 3, el: relatedArticlesEl
  $('.artwork-column').first().prepend relatedArticlesView.$el

  new ShareView el: $('.js-show-share')
