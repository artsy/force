_ = require 'underscore'
Q = require 'bluebird-q'
sd = require('sharify').data
PartnerShow = require '../../../models/partner_show.coffee'
PartnerShows = require '../../../collections/partner_shows.coffee'
ShareView = require '../../../components/share/view.coffee'
initCarousel = require '../../../components/merry_go_round/index.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
attachFollowArtists = require '../components/follow_artists/index.coffee'
attachFollowProfile = require '../components/follow_profile/index.coffee'
setupSaveControls = require '../components/save_artworks/index.coffee'
RelatedArticlesView = require '../components/related_articles/view.coffee'
openMapModal = require '../components/map_modal/index.coffee'
openShowEvents = require '../components/events_modal/index.coffee'
blurb = require '../../../components/gradient_blurb/index.coffee'
FlickityZoomSequence = require '../components/flickity_zoom_sequence/index.coffee'
metaphysics = require '../../../lib/metaphysics.coffee'
attachRelatedShows = require '../components/related_shows/index.coffee'
relatedShowOptions = require '../components/related_shows/options.coffee'

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

  # Client-side metaphysics fetch, related shows (more to come)
  if bootstrappedShow.fair
    type = 'fair'
  else
    if location.search.match "from-show-guide"
      type = 'city'
    else
      type = 'gallery'
      
  relatedShowData = relatedShowOptions type, bootstrappedShow
  metaphysics '
    query($featured: Boolean, $size: Int, $sort: PartnerShowSorts, $fair_id: String, $partner_id: String, $near: Near, $status: EventStatus, $displayable: Boolean) {
      related_shows: partner_shows(featured: $featured, size: $size, sort: $sort, fair_id: $fair_id, partner_id: $partner_id, near: $near, status: $status, displayable: $displayable) {
        id
        start_at
        end_at
        name
        partner {
          name
          href
        }
        fair {
          id
          published
          has_full_feature
          name
          href
          start_at
          end_at
        }
        location {
          display
          city
          state
          postal_code
          country
          address
          address_2
        }
        install_shots: images(size: 1, default: false) {
          image: resized(height: 270, version: "large") {
            url
            width
            height
          }
          aspect_ratio
        }
        artworks(size: 5) {
          id
          image {
            image: resized(height: 270, version: "large") {
              url
              width
              height
            }
            aspect_ratio
          }
        }
      }
    }
  ', relatedShowData.options
    .then (data) ->
      attachRelatedShows type, bootstrappedShow, data.related_shows, relatedShowData.city, relatedShowData.title

      # relatedArticlesView = new RelatedArticlesView collection: show.related().articles, numToShow: 3
      # $('.artwork-column').first().prepend relatedArticlesView.$el
      # show.related().articles.fetch()

      new ShareView el: $('.js-show-share')
    .done()
