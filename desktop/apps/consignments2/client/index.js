import { data as sd } from 'sharify'
import Artworks from '../../../collections/artworks.coffee'
import ArtworkRailView from '../../../components/artwork_rail/client/view.coffee'
import multiPageView from '../../../components/multi_page/index.coffee'

export default {
  // 'Recently Sold' rail
  const artworks = new Artworks(RECENTLY_SOLD)
  const rail = new ArtworkRailView({
    $el: $('.js-recently-sold-rail'),
    collection: artworks
  })
  rail.render()

  // Render the FAQ
  const view = multiPageView 'consignment-faqs'
  view.collection.invoke('fetch')
  ($faq = $('.js-multi-page-embed')).html(view.render().$el)
}

