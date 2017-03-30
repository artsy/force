import moment from 'moment'
import _ from 'underscore'
import benv from 'benv'
import { fabricate } from 'antigravity'
import Auction from '../../../models/auction.coffee'
import CurrentUser from '../../../models/current_user.coffee'
import { resolve } from 'path'
import upcomingLabel from '../../../components/current_auctions/utils/upcoming_label'

describe('associated auction template', () => {
  let baseData

  before(() => {
    baseData = {
      sd: {},
      asset: () => {},
      auction: new Auction(),
      me: null,
      auctionUpcomingLabel: upcomingLabel
    }
  })

  describe('auction with no associated sale', () => {
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

    it('renders no associated sale component', () => {
      $('.auction2-title').text().should.equal('An Auction')
      $('.auction2-associated-sale').text().should.equal('')
    })
  })

  describe('auction with an associated sale that has closed', () => {
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

    it('renders no associated sale component', () => {
      $('.auction2-title').text().should.equal('An Auction')
      $('.auction2-associated-sale').text().should.equal('')
    })
  })

  describe('auction with an associated sale that has yet to open', () => {
    before((done) => {
      benv.setup(() => {
        benv.expose({$: benv.require('jquery')})
        const data = _.extend({}, baseData,
          {
            auction: new Auction(fabricate('sale', {
              name: 'An Auction',
              associated_sale: {
                cover_image: {
                  cropped: {
                    url: 'test_img.jpg'
                  }
                },
                end_at: '2017-04-12T01:00:00+00:00',
                href: '/auction/associated-sale',
                id: 'associated-sale',
                is_closed: false,
                is_live_open: false,
                is_preview: true,
                live_start_at: null,
                name: 'My Associated Sale',
                start_at: '2017-03-28T16:00:00+00:00'
              }
            }))
          })
        benv.render(resolve(__dirname, '../templates/index.jade'), data, () => done())
      })
    })

    after(() => {
      benv.teardown()
    })

    it('renders the proper associated_sale component', () => {
      $('.auction2-title').text().should.equal('An Auction')
      $('.auction2-associated-sale__name').text().should.containEql('My Associated Sale')
      $('.auction2-associated-sale__upcoming-label').text().should.containEql('Auction opens Mar 28, 12:00 PM EDT')
    })
  })

  describe('auction with an associated sale that is open for live bidding', () => {
    before((done) => {
      benv.setup(() => {
        benv.expose({$: benv.require('jquery')})
        const data = _.extend({}, baseData,
          {
            auction: new Auction(fabricate('sale', {
              name: 'An Auction',
              associated_sale: {
                cover_image: {
                  cropped: {
                    url: 'test_img.jpg'
                  }
                },
                end_at: '2017-04-12T01:00:00+00:00',
                href: '/auction/associated-sale',
                id: 'associated-sale',
                is_closed: false,
                is_live_open: true,
                is_preview: true,
                live_start_at: '2017-03-15T16:00:00+00:00',
                name: 'My Associated Sale',
                start_at: '2017-03-12T16:00:00+00:00'
              }
            }))
          })
        benv.render(resolve(__dirname, '../templates/index.jade'), data, () => done())
      })
    })

    after(() => {
      benv.teardown()
    })

    it('renders the proper associated_sale component', () => {
      $('.auction2-title').text().should.equal('An Auction')
      $('.auction2-associated-sale__name').text().should.containEql('My Associated Sale')
      $('.auction2-associated-sale__upcoming-label').text().should.containEql('Auction open for live bidding')
    })
  })

  describe('auction with an associated sale that has not closed', () => {
    before((done) => {
      benv.setup(() => {
        benv.expose({$: benv.require('jquery')})
        const data = _.extend({}, baseData,
          {
            auction: new Auction(fabricate('sale', {
              name: 'An Auction',
              associated_sale: {
                cover_image: {
                  cropped: {
                    url: 'test_img.jpg'
                  }
                },
                end_at: '2017-04-12T01:00:00+00:00',
                href: '/auction/associated-sale',
                id: 'associated-sale',
                is_closed: false,
                is_live_open: false,
                is_preview: false,
                live_start_at: null,
                name: 'My Associated Sale',
                start_at: '2016-03-28T16:00:00+00:00'
              }
            }))
          })
        benv.render(resolve(__dirname, '../templates/index.jade'), data, () => done())
      })
    })

    after(() => {
      benv.teardown()
    })

    it('renders the proper associated_sale component', () => {
      $('.auction2-title').text().should.equal('An Auction')
      $('.auction2-associated-sale__name').text().should.containEql('My Associated Sale')
      $('.auction2-associated-sale__upcoming-label').text().should.containEql('Auction closes Apr 11, 9:00 PM EDT')
    })
  })
})
