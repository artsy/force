ArtworkImageView = require '../components/image/view'
artworkTabsView = require '../components/tabs/index'
bootstrap = require '../../../components/layout/bootstrap'
CurrentUser = require '../../../models/current_user'
MetaDataView = require '../components/meta_data/view'
BidView = require '../components/bid/view'
ArtworkArtistView = require '../components/artist/view'
ArtworkPartnerView = require '../components/partner/view'
Artwork = require '../../../models/artwork'
Artworks = require '../../../collections/artworks'
fetchArtworkBuckets = require '../components/related_artworks/index'

module.exports.init = ->
  bootstrap()
  artworkTabsView()
  artwork = new Artwork sd.ARTWORK
  user = CurrentUser.orNull()
  user.initializeDefaultArtworkCollection()

  new ArtworkImageView
    artwork: sd.ARTWORK
    el: $ 'body'
    user: user

  new MetaDataView
    model: artwork
    el: $('.artwork-meta-data-module')

  new BidView
    artwork: sd.ARTWORK
    el: $('.artwork-auction-bid-module')
    user: user

  new ArtworkArtistView
    artwork: sd.ARTWORK
    el: $('.artwork-artist-module')

  new ArtworkPartnerView
    artwork: sd.ARTWORK
    el: $('.artwork-partner-module')

  fetchArtworkBuckets()
