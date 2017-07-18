import Auction from 'desktop/models/auction.coffee'
import CurrentUser from 'desktop/models/current_user.coffee'
import MyActiveBids from 'desktop/apps/auction2/components/layout/active_bids/MyActiveBids'
import renderTestComponent from 'desktop/apps/auction2/__tests__/utils/renderTestComponent'
import { initialState } from 'desktop/apps/auction2/reducers'
import { fabricate } from 'antigravity'

describe('<MyActiveBids />', () => {
  let baseData

  before(() => {
    baseData = {
      auction: new Auction(fabricate('sale')),
      viewHelpers: { getLiveAuctionUrl: () => 'placeholderauctionurl.com' },
      me: {
        lot_standings: []
      }
    }
  })

  function setup (data = {}) {
    const { wrapper } = renderTestComponent({
      Component: MyActiveBids,
      data: {
        app: {
          ...baseData,
          ...data
        },
        auctionArtworks: initialState
      }
    })

    return wrapper
  }

  describe('my_active_bids', () => {
    it('displays an outbid bid status', () => {
      const wrapper = setup({
        me: {
          lot_standings: [
            {
              'is_leading_bidder': false,
              'sale_artwork': {
                'id': 'imhuge-brillo-condensed-soap',
                'lot_label': '2',
                'reserve_status': 'no_reserve',
                'counts': {
                  'bidder_positions': 1
                },
                'sale_id': 'juliens-auctions-street-and-contemporary-art-day-sale',
                'highest_bid': {
                  'display': '$750'
                },
                'sale': {
                  'end_at': '2016-10-31T04:28:00+00:00'
                },
                'artwork': {
                  'href': '/artwork/imhuge-brillo-condensed-soap',
                  'title': 'Brillo Condensed Soap',
                  'date': '2016',
                  'image': {
                    'url': 'https://d32dm0rphc51dk.cloudfront.net/G5tbqHUjuiGvjwDtCVlsGQ/square.jpg'
                  },
                  'artist': {
                    'name': 'Imhuge'
                  }
                }
              }
            }
          ]
        },
        user: new CurrentUser({ id: 'user' })
      })

      wrapper.find('h2').should.have.lengthOf(1)
      wrapper.find('.bid-status').should.have.lengthOf(1)
      wrapper.find('.bid-status').text().should.containEql('Outbid')
      wrapper.find('.auction2-active-bid-item__bid-button').should.have.lengthOf(1)
      wrapper.find('.auction2-active-bid-item__bid-button').text().should.containEql('Bid')
    })

    it('displays a Bid Live button if is_live_open', () => {
      const wrapper = setup({
        me: {
          lot_standings: [
            {
              'is_leading_bidder': false,
              'sale_artwork': {
                'id': 'imhuge-brillo-condensed-soap',
                'lot_label': '2',
                'reserve_status': 'no_reserve',
                'counts': {
                  'bidder_positions': 1
                },
                'sale_id': 'juliens-auctions-street-and-contemporary-art-day-sale',
                'highest_bid': {
                  'display': '$750'
                },
                'sale': {
                  'end_at': '2016-10-31T04:28:00+00:00',
                  'is_live_open': true
                },
                'artwork': {
                  'href': '/artwork/imhuge-brillo-condensed-soap',
                  'title': 'Brillo Condensed Soap',
                  'date': '2016',
                  'image': {
                    'url': 'https://d32dm0rphc51dk.cloudfront.net/G5tbqHUjuiGvjwDtCVlsGQ/square.jpg'
                  },
                  'artist': {
                    'name': 'Imhuge'
                  }
                }
              }
            }
          ]
        },
        user: new CurrentUser({ id: 'user' })
      })

      wrapper.find('h2').should.have.lengthOf(1)
      wrapper.find('.bid-status').should.have.lengthOf(0)
      wrapper.find('.auction2-active-bid-item__bid-live-button').should.have.lengthOf(1)
      wrapper.find('.auction2-active-bid-item__bid-live-button').text().should.containEql('Bid Live')
    })
  })
})
