import Articles from 'desktop/collections/articles.coffee'
import Auction from 'desktop/models/auction.coffee'
import React from 'react'
import auctions, { initialState } from 'desktop/apps/auction2/reducers'
import footerItems from 'desktop/apps/auction2/utils/footerItems'
import moment from 'moment'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { fabricate } from 'antigravity'
import { render } from 'enzyme'

import Layout from 'desktop/apps/auction2/components/Layout'

describe('<Layout />', () => {
  let baseData
  let store

  before(() => {
    baseData = {
      articles: new Articles([]),
      asset: () => {},
      auction: new Auction(fabricate('sale')),
      showFollowedArtistsRail: false,
      footerItems: footerItems,
      isLiveOpen: false,
      isMobile: false,
      me: null,
      sd: {
        ARTSY_EDITORIAL_CHANNEL: 'foo'
      },
      showInfoWindow: false,
      viewHelpers: { getLiveAuctionUrl: () => 'placeholderauctionurl.com' }
    }
  })

  function setup (data = {}) {
    data = { ...baseData, ...data }

    data.auction.set('cover_image', {
      cropped: {
        url: 'foo.jpg'
      }
    })

    data.auction.isRegistrationEnded = () => true

    store = createStore(auctions, {
      app: data,
      auctionArtworks: initialState
    })

    const wrapper = render(
      <Provider store={store}>
        <Layout />
      </Provider>
    )

    return wrapper
  }

  it('works', () => {

  })

  // it('default auction with no user', () => {
  //   const rendered = setup({
  //     auction: new Auction(fabricate('sale', {
  //       name: 'An Auction'
  //     }))
  //   })
  //
  //   rendered.find('.auction2-auction-info__title').text().should.equal('An Auction')
  //   rendered.find('.js-register-button').text().should.equal('Register to bid')
  //   rendered.find('.auction2-my-active-bids').text().should.not.containEql('Your Active Bids')
  // })
  //
  // it('preview auction with no user', () => {
  //   const rendered = setup({
  //     auction: new Auction(fabricate('sale', {
  //       name: 'An Auction',
  //       auction_state: 'preview',
  //       cover_image: 'foo.jpg'
  //     }))
  //   })
  //
  //   rendered.find('.auction2-auction-info__title').text().should.equal('An Auction')
  //   rendered.find('.js-register-button').text().should.equal('Register to bid')
  //   rendered.find('.auction2-my-active-bids').text().should.not.containEql('Your Active Bids')
  // })
  //
  // it('live auction, open for pre-bidding', () => {
  //   const rendered = setup({
  //     auction: new Auction(fabricate('sale', {
  //       name: 'An Auction',
  //       auction_state: 'open',
  //       live_start_at: moment().add(3, 'days')
  //     }))
  //   })
  //
  //   rendered.find('.auction2-auction-info__title').text().should.equal('An Auction')
  //   rendered.find('.js-register-button').text().should.equal('Register to bid')
  //   rendered.find('.auction2-my-active-bids').text().should.not.containEql('Your Active Bids')
  //   rendered.find('.auction2-auction-info__callout').text().should.containEql('Live bidding begins')
  // })
  //
  // it('live auction, open for live bidding', () => {
  //   const rendered = setup({
  //     auction: new Auction(fabricate('sale', {
  //       name: 'An Auction',
  //       auction_state: 'open',
  //       live_start_at: moment().subtract(3, 'days')
  //     }))
  //   })
  //
  //   rendered.find('.auction2-auction-info__title').text().should.equal('An Auction')
  //   rendered.find('.js-register-button').text().should.equal('Register to bid')
  //   rendered.find('.auction2-my-active-bids').text().should.not.containEql('Your Active Bids')
  //   rendered.find('.auction2-auction-info__callout').text().should.containEql('Live bidding now open')
  // })
  //
  // it('default auction with user', () => {
  //   const rendered = setup({
  //     me: {
  //       id: 'user',
  //       bidders: []
  //     },
  //     auction: new Auction(fabricate('sale', {
  //       name: 'An Auction'
  //     }))
  //   })
  //
  //   rendered.find('.auction2-auction-info__title').text().should.equal('An Auction')
  //   rendered.find('.js-register-button').text().should.equal('Register to bid')
  //   rendered.find('.auction2-auction-info__metadata').text().should.containEql('Registration required to bid')
  // })
  //
  // it('user with bidder positions', () => {
  //   const rendered = setup({
  //     me: {
  //       id: 'user',
  //       bidders: [1],
  //       lot_standings: [
  //         {
  //           'is_leading_bidder': false,
  //           'sale_artwork': {
  //             'id': 'imhuge-brillo-condensed-soap',
  //             'lot_label': '2',
  //             'reserve_status': 'no_reserve',
  //             'counts': {
  //               'bidder_positions': 1
  //             },
  //             'sale_id': 'juliens-auctions-street-and-contemporary-art-day-sale',
  //             'highest_bid': {
  //               'display': '$750'
  //             },
  //             'sale': {
  //               'end_at': '2016-10-31T04:28:00+00:00',
  //               'is_live_open': false
  //             },
  //             'artwork': {
  //               'href': '/artwork/imhuge-brillo-condensed-soap',
  //               'title': 'Brillo Condensed Soap',
  //               'date': '2016',
  //               'image': {
  //                 'url': 'https://d32dm0rphc51dk.cloudfront.net/G5tbqHUjuiGvjwDtCVlsGQ/square.jpg'
  //               },
  //               'artist': {
  //                 'name': 'Imhuge'
  //               }
  //             }
  //           }
  //         }
  //       ]
  //     },
  //     auction: new Auction(fabricate('sale', {
  //       name: 'An Auction',
  //       is_open: true
  //     }))
  //   })
  //
  //   rendered.find('.auction2-my-active-bids').length.should.equal(1)
  // })
  //
  // it('index, registered to bid but not qualified', () => {
  //   const rendered = setup({
  //     me: {
  //       id: 'user',
  //       bidders: [{
  //         qualified_for_bidding: false
  //       }]
  //     },
  //     auction: new Auction(fabricate('sale', {
  //       name: 'An Auction'
  //     }))
  //   })
  //
  //   rendered.find('.auction2-auction-info__title').text().should.equal('An Auction')
  //   rendered.find('.auction2-auction-info__metadata').text().should.containEql('Registration pending')
  //   rendered.find('.auction2-auction-info__metadata').text().should.containEql('Reviewing submitted information')
  // })
  //
  // it('index, registered to bid and qualified', () => {
  //   const rendered = setup({
  //     me: {
  //       id: 'user',
  //       bidders: [{
  //         qualified_for_bidding: true
  //       }]
  //     },
  //     auction: new Auction(fabricate('sale', {
  //       name: 'An Auction'
  //     }))
  //   })
  //
  //   rendered.find('.auction2-auction-info__title').text().should.equal('An Auction')
  //   rendered.find('.auction2-auction-info__metadata').text().should.containEql('Approved to Bid')
  // })
  //
  // it('index, registered to bid but auction closed', () => {
  //   const rendered = setup({
  //     me: {
  //       id: 'user',
  //       bidders: [{
  //         qualified_for_bidding: true
  //       }]
  //     },
  //     auction: new Auction(fabricate('sale', {
  //       name: 'An Auction',
  //       auction_state: 'closed'
  //     }))
  //   })
  //
  //   rendered.find('.auction2-auction-info__title').text().should.equal('An Auction')
  //   rendered.find('.auction2-auction-info__metadata').text().should.containEql('')
  //   rendered.find('.auction2-auction-info__callout').text().should.equal('Auction Closed')
  // })
  //
  // describe('index, registration closed', () => {
  //   it('renders registration closed', () => {
  //     const rendered = setup({
  //       auction: new Auction(
  //         fabricate('sale', {
  //           name: 'An Auction',
  //           is_auction: true,
  //           registration_ends_at: moment().subtract(2, 'days').format()
  //         })
  //       )
  //     })
  //
  //     rendered.find('.auction2-auction-info__metadata').text().should.containEql('Registration closed')
  //     rendered.find('.auction2-auction-info__metadata').text().should.containEql('Registration required to bid')
  //   })
  // })
  //
  // describe('auction with no artworks', () => {
  //   describe('an auction promo', () => {
  //     it('does not show the footer at all', () => {
  //       const rendered = setup({
  //         auction: new Auction(fabricate('sale', {
  //           name: 'An Auction',
  //           sale_type: 'auction promo',
  //           eligible_sale_artworks_count: 0
  //         })),
  //         articles: new Articles([])
  //       })
  //
  //       rendered.find('.auction2-footer__auction2-app-promo-wrapper').length.should.eql(0)
  //     })
  //   })
  // })
  //
  // describe('footer', () => {
  //   let article
  //   beforeEach(() => {
  //     article = {
  //       slug: 'artsy-editorial-fight-art',
  //       thumbnail_title: 'The Fight to Own Art',
  //       thumbnail_image: {
  //         url: 'https://artsy-media-uploads.s3.amazonaws.com/e6rsZcv5h7zCL7gU_4cjXw%2Frose.jpg'
  //       },
  //       'tier': 1,
  //       'published_at': '2017-01-26T00:26:57.928Z',
  //       'channel_id': '5759e3efb5989e6f98f77993',
  //       'author': {
  //         'id': '54cfdab872616972546e0400',
  //         'name': 'Artsy Editorial'
  //       },
  //       'contributing_authors': [
  //         {
  //           'id': 'abc124',
  //           'name': 'Abigail C'
  //         },
  //         {
  //           'id': 'def456',
  //           'name': 'Anna S'
  //         }
  //       ]
  //     }
  //   })
  //
  //   describe('no articles', () => {
  //     it('does not show the footer at all', () => {
  //       const rendered = setup({
  //         auction: new Auction(fabricate('sale', {
  //           name: 'An Auction'
  //         })),
  //         articles: new Articles([])
  //       })
  //
  //       rendered.find('.auction2-footer').length.should.eql(0)
  //     })
  //   })
  //
  //   describe('articles, auction promo', () => {
  //     it('shows the footer but not the extra footer item', () => {
  //       const rendered = setup({
  //         auction: new Auction(fabricate('sale', {
  //           name: 'An Auction',
  //           sale_type: 'auction promo'
  //         })),
  //         articles: new Articles([article])
  //       })
  //
  //       rendered.find('.auction2-footer .article-figure-title').text().should.equal('The Fight to Own Art')
  //       rendered.find('.auction2-footer .article-figure-author-section').text().should.containEql('Artsy Editorial')
  //       rendered.find('.auction2-footer .article-figure-author-section').text().should.containEql('By Abigail C and Anna S')
  //       rendered.find('.auction2-footer__auction2-app-promo-wrapper').length.should.equal(0)
  //     })
  //   })
  //
  //   describe('articles, not auction promo', () => {
  //     it('shows the articles and the extra footer item', () => {
  //       const rendered = setup({
  //         auction: new Auction(fabricate('sale', {
  //           name: 'An Auction'
  //         })),
  //         articles: new Articles([article]),
  //         footerItems: footerItems
  //       })
  //
  //       rendered.find('.auction2-footer .article-figure-title').text().should.equal('The Fight to Own Art')
  //       rendered.find('.auction2-footer .article-figure-author-section').text().should.containEql('Artsy Editorial')
  //       rendered.find('.auction2-footer .article-figure-author-section').text().should.containEql('By Abigail C and Anna S')
  //       rendered.find('.auction2-footer__auction2-app-promo-wrapper').length.should.equal(1)
  //       rendered.find('.auction2-footer__auction2-app-promo-title').text().should.containEql('Bid from your phone')
  //     })
  //   })
  // })
})
