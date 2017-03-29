import { fabricate } from 'antigravity'
import Backbone from 'backbone'
import Auction from '../../../models/auction.coffee'
import CurrentUser from '../../../models/current_user.coffee'
import * as routes from '../routes'
import { __RewireAPI__ as RoutesRewireApi } from '../routes'
import sinon from 'sinon'


describe('#redirectLive', () => {
  let req
  let res
  let next

  beforeEach(() => {
    sinon.stub(Backbone, 'sync')
    req = {
      body: {},
      params: { id: 'foobar' },
      user: new CurrentUser(fabricate('user'))
    }
    res = { redirect: sinon.stub() }
    next = sinon.stub()
  })

  afterEach(() => {
    Backbone.sync.restore()
  })

  it('redirects on confirm if the auction is live and bidder is qualified', (done) => {
    const auctionQueries = {
      sale: {
        id: 'foo',
        is_auction: true,
        auction_state: 'open',
        is_live_open: true
      },
      me: {
        bidders: [{
          id: 'me',
          qualified_for_bidding: true,
          sale: {
            id: 'foo'
          }
        }]
      }
    }

    RoutesRewireApi.__Rewire__('metaphysics', sinon.stub().returns(Promise.resolve(auctionQueries)))
    res = {
      redirect: (url) => {
        url.should.equal('https://live.artsy.net/foo/login')
      }
    }
    routes.redirectLive(req, res, next).then(() => {
      done()
    })
  })

  it('does not redirect if bidder is not qualified', async () => {
    const auctionQueries = {
      sale: {
        id: 'foo',
        is_auction: true,
        auction_state: 'open',
        is_live_open: true
      },
      me: {
        bidders: [{
          id: 'me',
          qualified_for_bidding: false,
          sale: {
            id: 'foo'
          }
        }]
      }
    }

    RoutesRewireApi.__Rewire__('metaphysics', sinon.stub().returns(Promise.resolve(auctionQueries)))
    await routes.redirectLive(req, res, next)
    res.redirect.called.should.not.be.ok()
    next.called.should.be.ok()
  })

  it('does not redirect if the auction is not live', async () => {
    const auctionQueries = {
      sale: {
        id: 'foo',
        is_auction: true,
        auction_state: 'open',
        is_live_open: false
      },
      me: {
        bidders: [{
          id: 'me',
          qualified_for_bidding: false,
          sale: {
            id: 'foo'
          }
        }]
      }
    }

    RoutesRewireApi.__Rewire__('metaphysics', sinon.stub().returns(Promise.resolve(auctionQueries)))
    await routes.redirectLive(req, res, next)
    res.redirect.called.should.not.be.ok()
    next.called.should.be.ok()
  })
})
