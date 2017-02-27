require('babel-core/register')
require('coffee-script/register')
import AuctionGridArtwork from '../components/auction_grid_artwork'
import AuctionListArtwork from '../components/auction_list_artwork'
import { renderToString } from 'react-dom/server'

describe('AuctionGridArtwork', () => {
  let artwork

  beforeEach(() => {
    artwork = {
      _id: '123',
      title: 'My Artwork',
      date: '2002',
      artists: {
        name: 'Andy Warhol'
      },
      sale_artwork: {
        lot_number: 2,
        current_bid: {
          display: '$100'
        },
        counts: {
          bidder_positions: 2
        }
      },
      images: [{
        image_url: 'my_image.jpg'
      }]
    }
  })

  it('renders an auction grid artwork component', () => {
    const renderedArtwork = renderToString(AuctionGridArtwork({ artwork }))
    renderedArtwork.should.containEql('<em>My Artwork</em>, 2002')
  })

  it('renders an auction list artwork component', () => {
    const renderedArtwork = renderToString(AuctionListArtwork({ artwork }))
    renderedArtwork.should.containEql('<em>My Artwork</em>, 2002')
  })
})
