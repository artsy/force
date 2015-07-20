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
attachRelatedShows = require '../components/related_shows/index.coffee'
setupSaveControls = require '../components/save_artworks/index.coffee'
RelatedArticlesView = require '../components/related_articles/view.coffee'
openMapModal = require '../components/map_modal/index.coffee'
zoom = require '../../../components/zoom/index.coffee'
openShowEvents = require '../components/events_modal/index.coffee'
blurb = require '../../../components/gradient_blurb/index.coffee'

module.exports.init = ->
  show = new PartnerShow SHOW
  show.related().artworks.reset ARTWORKS

  blurb $('.show-press-release'), limit: 350

  $('.js-open-show-events').click (e) ->
    e.preventDefault()
    openShowEvents(model: show, collection: show.related().showEvents)

  if $('.js-show-installation-shot-carousel').length
    initCarousel $('.js-show-installation-shot-carousel'), {
      setGallerySize: false
      imagesLoaded: true
    }, (instance) ->
      instance.cells.flickity.on 'staticClick', (event, pointer, cellElement, cellIndex) ->
        if src = $(cellElement).find('img').attr('src')
          zoom src

  setupSaveControls show.related().artworks
  attachFollowArtists show.related().artists
  attachFollowProfile show.related().profile

  $('.js-open-map-modal').click (e) ->
    e.preventDefault()
    openMapModal model: show

  if show.isFairBooth()
    attachRelatedShows 'fair', show
  else
    if location.search.match "from-show-guide"
      attachRelatedShows 'city', show
      attachRelatedShows 'featured', show
    else
      attachRelatedShows 'gallery', show

  relatedArticlesView = new RelatedArticlesView collection: show.related().articles, numToShow: 3
  $('.artwork-column').first().prepend relatedArticlesView.$el
  show.related().articles.fetch()

  new ShareView el: $('.js-show-share')
