{ SHOW, ARTWORKS } = require('sharify').data
PartnerShow = require '../../../models/partner_show.coffee'
ShareView = require '../../../components/share/view.coffee'
CarouselView = require '../../../components/carousel/view.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
attachFollowArtists = require '../components/follow_artists/index.coffee'
attachFollowProfile = require '../components/follow_profile/index.coffee'
RelatedShowsView = require '../components/related_shows/index.coffee'

module.exports.init = ->
  show = new PartnerShow SHOW
  show.related().artworks.reset ARTWORKS

  carouselView = new CarouselView el: $('.js-show-installation-shot-carousel'), height: 480, align: 'left'
  carouselView.postRender()

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

  relatedShowsView = new RelatedShowsView show

  attachFollowArtists show.related().artists

  attachFollowProfile show.related().profile
  new ShareView el: $('.js-show-share')
