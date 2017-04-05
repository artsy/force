import moment from 'moment'
import _ from 'underscore'
import benv from 'benv'
import { fabricate } from 'antigravity'
import Articles from '../../../collections/articles'
import Auction from '../../../models/auction'
import CurrentUser from '../../../models/current_user'
import footerItems from '../footer_items'
import { resolve } from 'path'

describe('auction templates', () => {
  let baseData

  before(() => {
    baseData = {
      sd: {},
      asset: () => {},
      auction: new Auction(),
      footerItems: footerItems,
      me: null
    }
  })

  describe('header and registration', () => {
    describe('default auction with no user', () => {
      before((done) => {
        benv.setup(() => {
          benv.expose({$: benv.require('jquery')})
          const data = _.extend({}, baseData,
            { auction: new Auction(fabricate('sale', { name: 'An Auction' })) })
          benv.render(resolve(__dirname, '../templates/index.jade'), data, () => done())
        })
      })

      after(() => {
        benv.teardown()
      })

      describe('index, no user', () => {
        it('renders correctly', () => {
          $('.auction2-title').text().should.equal('An Auction')
          $('.js-register-button').text().should.equal('Register to bid')
          $('.auction2-my-active-bids').text().should.not.containEql('Your Active Bids')
        })
      })
    })

    describe('preview auction with no user', () => {
      before((done) => {
        benv.setup(() => {
          benv.expose({$: benv.require('jquery')})
          const data = _.extend({}, baseData,
            { auction: new Auction(fabricate('sale', { name: 'An Auction', auction_state: 'preview' })) })
          benv.render(resolve(__dirname, '../templates/index.jade'), data, () => done())
        })
      })

      after(() => {
        benv.teardown()
      })

      describe('index, no user', () => {
        it('renders correctly', () => {
          $('.auction2-title').text().should.equal('An Auction')
          $('.js-register-button').text().should.equal('Register to bid')
          $('.auction2-my-active-bids').text().should.not.containEql('Your Active Bids')
        })
      })
    })

    describe('live auction, open for pre-bidding', () => {
      before((done) => {
        benv.setup(() => {
          benv.expose({$: benv.require('jquery')})
          const data = _.extend({}, baseData,
            { auction: new Auction(fabricate('sale', { name: 'An Auction', auction_state: 'open', live_start_at: moment().add(3, 'days') })) })
          benv.render(resolve(__dirname, '../templates/index.jade'), data, () => done())
        })
      })

      after(() => {
        benv.teardown()
      })

      describe('index, no user', () => {
        it('renders correctly', () => {
          $('.auction2-title').text().should.equal('An Auction')
          $('.js-register-button').text().should.equal('Register to bid')
          $('.auction2-my-active-bids').text().should.not.containEql('Your Active Bids')
          $('.auction2-callout').text().should.containEql('Live bidding begins')
        })
      })
    })

    describe('live auction, open for live bidding', () => {
      before((done) => {
        benv.setup(() => {
          benv.expose({$: benv.require('jquery')})
          const data = _.extend({}, baseData,
            { auction: new Auction(fabricate('sale', { name: 'An Auction', auction_state: 'open', live_start_at: moment().subtract(3, 'days') })) })
          benv.render(resolve(__dirname, '../templates/index.jade'), data, () => done())
        })
      })

      after(() => {
        benv.teardown()
      })

      describe('index, no user', () => {
        it('renders correctly', () => {
          $('.auction2-title').text().should.equal('An Auction')
          $('.js-register-button').text().should.equal('Register to bid')
          $('.auction2-my-active-bids').text().should.not.containEql('Your Active Bids')
          $('.auction2-callout').text().should.containEql('Live bidding now open')
        })
      })
    })

    describe('default auction with user', () => {
      describe('index, not registered to bid', () => {
        before((done) => {
          benv.setup(() => {
            benv.expose({$: benv.require('jquery')})
            const data = _.extend({}, baseData, {
              me: { id: 'user', bidders: null },
              auction: new Auction(fabricate('sale', { name: 'An Auction' }))
            })
            benv.render(resolve(__dirname, '../templates/index.jade'), data, () => done())
          })
        })

        after(() => {
          benv.teardown()
        })

        it('renders correctly', () => {
          $('.auction2-title').text().should.equal('An Auction')
          $('.js-register-button').text().should.equal('Register to bid')
          $('.auction2-header-metadata').text().should.containEql('Registration required to bid')
        })
      })

      describe('index, registered to bid but not qualified', () => {
        before((done) => {
          benv.setup(() => {
            benv.expose({$: benv.require('jquery')})
            const data = _.extend({}, baseData, {
              me: { id: 'user', bidders: [{ qualified_for_bidding: false }]},
              auction: new Auction(fabricate('sale', { name: 'An Auction' }))
            })
            benv.render(resolve(__dirname, '../templates/index.jade'), data, () => done())
          })
        })

        after(() => {
          benv.teardown()
        })

        it('renders correctly', () => {
          $('.auction2-title').text().should.equal('An Auction')
          $('.auction2-header-metadata').text().should.containEql('Registration pending')
          $('.auction2-header-metadata').text().should.containEql('Reviewing submitted information')
        })
      })

      describe('index, registered to bid and qualified', () => {
        before((done) => {
          benv.setup(() => {
            benv.expose({$: benv.require('jquery')})
            const data = _.extend({}, baseData, {
              me: { id: 'user', bidders: [{ qualified_for_bidding: true }]},
              auction: new Auction(fabricate('sale', { name: 'An Auction' }))
            })
            benv.render(resolve(__dirname, '../templates/index.jade'), data, () => done())
          })
        })

        after(() => {
          benv.teardown()
        })

        it('renders correctly', () => {
          $('.auction2-title').text().should.equal('An Auction')
          $('.auction2-header-metadata').text().should.containEql('Approved to Bid')
        })
      })

      describe('index, registered to bid but auction closed', () => {
        before((done) => {
          benv.setup(() => {
            benv.expose({$: benv.require('jquery')})
            const data = _.extend({}, baseData, {
              me: { id: 'user', bidders: [{ qualified_for_bidding: true }]},
              auction: new Auction(fabricate('sale', { name: 'An Auction', auction_state: 'closed' }))
            })
            benv.render(resolve(__dirname, '../templates/index.jade'), data, () => done())
          })
        })

        after(() => {
          benv.teardown()
        })

        it('renders correctly', () => {
          $('.auction2-title').text().should.equal('An Auction')
          $('.auction2-header-metadata').text().should.containEql('')
          $('.auction2-callout').text().should.equal('Auction Closed')
        })
      })

      describe('index, registration closed', () => {
        before((done) => {
          benv.setup(() => {
            benv.expose({$: benv.require('jquery')})
            const data = _.extend({}, baseData, {
              auction: new Auction(
                fabricate('sale', {
                  name: 'An Auction',
                  is_auction: true,
                  registration_ends_at: moment().subtract(2, 'days').format()
                })
              )
            })
            benv.render(resolve(__dirname, '../templates/index.jade'), data, () => done())
          })
        })

        after(() => {
          benv.teardown()
        })

        it('renders registration closed', () => {
          $('.auction2-header-metadata').text().should.containEql('Registration closed')
          $('.auction2-header-metadata').text().should.containEql('Registration required to bid')
        })
      })
    })
  })

  describe('auction with no artworks', () => {
    describe('an auction promo', () => {
      before((done) => {
        benv.setup(() => {
          benv.expose({$: benv.require('jquery')})
          const data = _.extend({}, baseData,
            {
              auction: new Auction(fabricate('sale', { name: 'An Auction', sale_type: 'auction promo', eligible_sale_artworks_count: 0 })),
              articles: new Articles([])
            }
          )
          benv.render(resolve(__dirname, '../templates/index.jade'), data, () => done())
        })
      })

      after(() => {
        benv.teardown()
      })

      it('does not show the footer at all', () => {
        $('.auction2-footer__auction-app-promo-wrapper').length.should.eql(0)
      })
    })

    describe('not an auction promo', () => {
      before((done) => {
        benv.setup(() => {
          benv.expose({$: benv.require('jquery')})
          const data = _.extend({}, baseData,
            {
              auction: new Auction(fabricate('sale', { name: 'An Auction', eligible_sale_artworks_count: 0 })),
              articles: new Articles([])
            }
          )
          benv.render(resolve(__dirname, '../templates/index.jade'), data, () => done())
        })
      })

      after(() => {
        benv.teardown()
      })

      it('shows just the promo part of the footer', () => {
        $('.auction2-footer').length.should.eql(1)
        $('.auction2-footer__auction-app-promo-wrapper').length.should.equal(1)
        $('.auction2-footer__auction-app-promo-title').text().should.containEql('Bid from your phone')
        $('.auction2-footer .article-figure-title').length.should.eql(0)
      })
    })
  })

  describe('footer', () => {
    let article
    beforeEach(() => {
      article = {
        slug: 'artsy-editorial-fight-art',
        thumbnail_title: 'The Fight to Own Art',
        thumbnail_image: {
          url: 'https://artsy-media-uploads.s3.amazonaws.com/e6rsZcv5h7zCL7gU_4cjXw%2Frose.jpg'
        },
        'tier': 1,
        'published_at': "2017-01-26T00:26:57.928Z",
        'channel_id': '5759e3efb5989e6f98f77993',
        'author': {
          'id': '54cfdab872616972546e0400',
          'name': 'Artsy Editorial'
        },
        'contributing_authors': [
          {
            'id': 'abc124',
            'name': 'Abigail C'
          },
          {
            'id': 'def456',
            'name': 'Anna S'
          }
        ]
      }
    })
    describe('no articles', () => {
      before((done) => {
        benv.setup(() => {
          benv.expose({$: benv.require('jquery')})
          const data = _.extend({}, baseData,
            {
              auction: new Auction(fabricate('sale', { name: 'An Auction' })),
              articles: new Articles([])
            }
          )
          benv.render(resolve(__dirname, '../templates/index.jade'), data, () => done())
        })
      })

      after(() => {
        benv.teardown()
      })

      it('does not show the footer at all', () => {
        $('.auction2-footer').length.should.eql(0)
      })
    })

    describe('articles, auction promo', () => {
      before((done) => {
        benv.setup(() => {
          benv.expose({$: benv.require('jquery')})
          const data = _.extend({}, baseData,
            {
              auction: new Auction(fabricate('sale', { name: 'An Auction', sale_type: 'auction promo' })),
              articles: new Articles([article])
            }
          )
          benv.render(resolve(__dirname, '../templates/index.jade'), data, () => done())
        })
      })

      after(() => {
        benv.teardown()
      })

      it('shows the footer but not the extra footer item', () => {
        $('.auction2-footer .article-figure-title').text().should.equal('The Fight to Own Art')
        $('.auction2-footer .article-figure-author-section').text().should.containEql('Artsy Editorial')
        $('.auction2-footer .article-figure-author-section').text().should.containEql('By Abigail C and Anna S')
        $('.auction2-footer__auction-app-promo-wrapper').length.should.equal(0)
      })
    })

    describe('articles, not auction promo', () => {
      before((done) => {
        benv.setup(() => {
          benv.expose({$: benv.require('jquery')})
          const data = _.extend({}, baseData,
            {
              auction: new Auction(fabricate('sale', { name: 'An Auction' })),
              articles: new Articles([article]),
              footerItems: footerItems
            }
          )
          benv.render(resolve(__dirname, '../templates/index.jade'), data, () => done())
        })
      })

      after(() => {
        benv.teardown()
      })

      it('shows the articles and the extra footer item', () => {
        $('.auction2-footer .article-figure-title').text().should.equal('The Fight to Own Art')
        $('.auction2-footer .article-figure-author-section').text().should.containEql('Artsy Editorial')
        $('.auction2-footer .article-figure-author-section').text().should.containEql('By Abigail C and Anna S')
        $('.auction2-footer__auction-app-promo-wrapper').length.should.equal(1)
        $('.auction2-footer__auction-app-promo-title').text().should.containEql('Bid from your phone')
      })
    })
  })
})
