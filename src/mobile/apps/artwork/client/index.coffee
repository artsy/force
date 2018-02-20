ArtworkImageView = require '../components/image/view.coffee'
artworkTabsView = require '../components/tabs/index.coffee'
bootstrap = require '../../../components/layout/bootstrap.coffee'
CurrentUser = require '../../../models/current_user.coffee'
MetaDataView = require '../components/meta_data/view.coffee'
BidView = require '../components/bid/view.coffee'
ArtworkArtistView = require '../components/artist/view.coffee'
ArtworkPartnerView = require '../components/partner/view.coffee'
Artwork = require '../../../models/artwork.coffee'
Artworks = require '../../../collections/artworks.coffee'
fetchArtworkBuckets = require '../components/related_artworks/index.coffee'

module.exports.init = ->
  bootstrap()
  artworkTabsView()
  artwork = new Artwork sd.ARTWORK
  user = CurrentUser.orNull()
  user.initializeDefaultArtworkCollection() if user

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
