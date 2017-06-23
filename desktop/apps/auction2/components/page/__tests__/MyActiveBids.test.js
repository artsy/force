import React from 'react'
import Auction from 'desktop/models/auction.coffee'
import CurrentUser from 'desktop/models/current_user.coffee'
import MyActiveBids from 'desktop/apps/auction2/components/page/MyActiveBids'
import moment from 'moment'
import { data as sd } from 'sharify'
import { fabricate } from 'antigravity'
import { render } from 'enzyme'

describe('<MyActiveBids />', () => {
  let baseData
  let store

  before(() => {
    baseData = {
      viewHelpers: { getLiveAuctionUrl: () => 'placeholderauctionurl.com' }
    }
  })

  function setup (data = {}) {
    data = { ...baseData, ...data }

    const wrapper = render(
      <MyActiveBids {...data} />
    )

    return wrapper
  }

  describe('my_active_bids', () => {
    describe('no user', () => {
      it('does not display anything', () => {
        const rendered = setup({
          auction: new Auction(fabricate('sale', { name: 'An Auction', auction_state: 'open', live_start_at: moment().subtract(1, 'day').format() })),
          bidderPositions: [],
          user: null
        })
        rendered.find('h2').should.have.lengthOf(0)
      })
    })

    describe('user but no bids', () => {
      it('does not display anything', () => {
        const rendered = setup({
          auction: new Auction(fabricate('sale', { name: 'An Auction', auction_state: 'open', live_start_at: moment().subtract(1, 'day').format() })),
          bidderPositions: [],
          user: null
        })

        rendered.find('h2').should.have.lengthOf(0)
      })
    })

    describe('with a user and bids', () => {
      it('displays an outbid bid status', () => {
        const rendered = setup({
          bidderPositions: [
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
          ],
          user: new CurrentUser({ id: 'user' })
        })

        rendered.find('h2').should.have.lengthOf(1)
        rendered.find('.bid-status').should.have.lengthOf(1)
        rendered.find('.bid-status').text().should.containEql('Outbid')
        rendered.find('.auction-my-active-bids__bid-button').should.have.lengthOf(1)
        rendered.find('.auction-my-active-bids__bid-button').text().should.containEql('Bid')
      })
    })
  })
})
