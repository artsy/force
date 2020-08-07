_ = require 'underscore'
sd = require('sharify').data
ShareView = require '../../../components/share/view.coffee'
attachFollowArtists = require '../components/follow_artists/index.coffee'
attachFollowProfile = require '../components/follow_profile/index.coffee'
RelatedArticlesView = require '../components/related_articles/view.coffee'
openMapModal = require '../components/map_modal/index.coffee'
openShowEvents = require '../components/events_modal/index.coffee'
blurb = require '../../../components/gradient_blurb/index.coffee'
attachRelatedShows = require '../components/related_shows/index.coffee'
FurtherArtworksView = require '../components/artwork_columns_metaphysics/view.coffee'
FurtherInstallShotsView = require '../components/flickity_zoom_sequence/view.coffee'
template = require '../components/artwork_columns_metaphysics/template.jade'
{ ContextModule } = require "@artsy/cohesion"

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
  attachFollowProfile bootstrappedShow.partner.default_profile_id

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

  new FurtherArtworksView
    showId: bootstrappedShow._id,
    page: 2,
    artworks: bootstrappedShow.artworks,
    el: furtherArtworksEl,
    sd: sd
    context_module: ContextModule.artworkGrid

  new ShareView el: $('.js-show-share')
