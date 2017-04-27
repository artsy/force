import { data as sd } from 'sharify'
import Artworks from '../../../collections/artworks.coffee'
import ArtworkRailView from '../../../components/artwork_rail/client/view.coffee'

export default () => {
  // 'Recently Sold' rail
  const artworks = new Artworks(sd.RECENTLY_SOLD)
  const rail = new ArtworkRailView({
    $el: $('.js-recently-sold-rail'),
    collection: artworks
  })
  rail.render()
}

