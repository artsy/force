require('babel-core/register')
require('coffee-script/register')
import moment from 'moment'
import _ from 'underscore'
import benv from 'benv'
import { fabricate } from 'antigravity'
import Auction from '../../../models/auction.coffee'
import CurrentUser from '../../../models/current_user.coffee'
import { resolve } from 'path'

describe('auction templates', () => {
  let baseData

  before(() => {
    baseData = {
      sd: {},
      asset: () => {},
      auction: new Auction(),
      me: {}
    }
  })

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
  })
})
