_ = require 'underscore'
Q = require 'bluebird-q'
sd = require('sharify').data
ShareView = require '../../../components/share/view'
attachFollowArtists = require '../components/follow_artists/index'
attachFollowProfile = require '../components/follow_profile/index'
RelatedArticlesView = require '../components/related_articles/view'
openMapModal = require '../components/map_modal/index'
openShowEvents = require '../components/events_modal/index'
blurb = require '../../../components/gradient_blurb/index'
attachRelatedShows = require '../components/related_shows/index'
FurtherArtworksView = require '../components/artwork_columns_metaphysics/view'
FurtherInstallShotsView = require '../components/flickity_zoom_sequence/view'
Profile = require '../../../models/profile'

module.exports.init = ->
  bootstrappedShow = sd.PARTNER_SHOW
  blurb $('.show-press-release'), limit: 350

  $('.js-open-show-events').click (e) ->
    e.preventDefault()
    openShowEvents(show: bootstrappedShow, events: bootstrappedShow.events)

  if $('.js-show-installation-shot-carousel').length
    furtherInstallShotsEl = $('.js-show-installation-shot-carousel')
    new FurtherInstallShotsView showId: bootstrappedShow._id, page: 2, installShots: bootstrappedShow.install_shots, el: furtherInstallShotsEl

  attachFollowArtists bootstrappedShow.artists
  attachFollowProfile new Profile id: bootstrappedShow.partner.default_profile_id

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

  furtherArtworksEl = $('.artworks-container')
  new FurtherArtworksView showId: bootstrappedShow._id, page: 2, artworks: bootstrappedShow.artworks, el: furtherArtworksEl

  new ShareView el: $('.js-show-share')
