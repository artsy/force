import 'moment-timezone'
import CurrentAuctions from '../current_auctions'
import React from 'react'
import { render } from 'enzyme'

describe('components/react/current_auctions_spec.js', () => {
  const sales = [
    {
      id: 'climate-mobilization-benefit-auction-2017',
      name: 'Climate Mobilization: Benefit Auction 2017',
      href: '/auction/climate-mobilization-benefit-auction-2017',
      status: 'open',
      is_live_open: false,
      start_at: '2017-03-02T17:00:00+00:00',
      end_at: '2017-03-16T22:00:00+00:00',
      live_start_at: null,
      cover_image: {
        cropped: {
          url: '',
        },
      },
    },
    {
      id: 'heritage-auctions-east-meets-west',
      name: 'Heritage Auctions: East Meets West',
      href: '/auction/heritage-auctions-east-meets-west',
      status: 'open',
      is_live_open: false,
      start_at: '2017-03-01T17:00:00+00:00',
      end_at: '2017-03-15T00:00:00+00:00',
      live_start_at: null,
      cover_image: {
        cropped: {
          url: '',
        },
      },
    },
    {
      id: 'forum-auctions-editions-and-works-on-paper',
      name: 'Forum Auctions: Editions and Works on Paper',
      href: '/auction/forum-auctions-editions-and-works-on-paper',
      status: 'open',
      is_live_open: false,
      start_at: '2017-03-07T17:00:00+00:00',
      end_at: null,
      live_start_at: '2017-03-21T12:00:00+00:00',
      cover_image: {
        cropped: {
          url: '',
        },
      },
    },
    {
      id: 'los-angeles-modern-auctions-march-2015',
      name: 'Los Angeles Modern Auctions - March 2015',
      href: '/auction/los-angeles-modern-auctions-march-2015',
      status: 'open',
      is_live_open: true,
      start_at: '2017-03-15T10:00:00+00:00',
      end_at: '2017-03-15T23:59:00+00:00',
      live_start_at: '2017-03-15T10:05:00+00:00',
      cover_image: {
        cropped: {
          url: '',
        },
      },
    },
    {
      id: 'san-francisco-modern-auctions-march-2016',
      name: 'San Francisco Modern Auctions - March 2016',
      href: '/auction/san-francisco-modern-auctions-march-2015',
      status: 'open',
      is_live_open: false,
      start_at: '2017-03-15T10:00:00+00:00',
      end_at: '2017-03-15T23:59:00+00:00',
      live_start_at: '2017-03-15T10:05:00+00:00',
      cover_image: {
        cropped: {
          url: '',
        },
      },
    },
  ]

  it('renders four items', () => {
    const component = render(<CurrentAuctions sales={sales} />)

    component.find('.auction-block').length.should.eql(4)
  })

  it('If auctionContextId is provided it renders first in the list', () => {
    const component = render(
      <CurrentAuctions
        auctionContextId="san-francisco-modern-auctions-march-2016"
        sales={sales}
      />
    )

    component
      .find('.auction-block')
      .first()
      .text()
      .should.containEql('San Francisco Modern Auctions')
  })
})
