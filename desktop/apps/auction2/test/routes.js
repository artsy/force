import { fabricate } from 'antigravity'
import Backbone from 'backbone'
import Auction from 'desktop/models/auction.coffee'
import CurrentUser from 'desktop/models/current_user.coffee'
import footerItems from 'desktop/apps/auction2/utils/footerItems'
import * as routes from 'desktop/apps/auction2/routes'
import { __RewireAPI__ as RoutesRewireApi } from '../routes'
import sinon from 'sinon'

describe('#index', () => {
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
    res = {
      redirect: sinon.stub(),
      render: sinon.stub(),
      locals: { sd: {} }
    }
    next = sinon.stub()
  })

  afterEach(() => {
    Backbone.sync.restore()
    RoutesRewireApi.__ResetDependency__('metaphysics')
  })

  it('renders the index with the correct variables', () => {
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
    routes.index(req, res, next).then(() => {
      res.render.args[0][1].articles.length.should.eql(0)
      res.render.args[0][1].auction.get('id').should.eql('foo')
      res.render.args[0][1].footerItems.should.eql(footerItems)
      res.render.args[0][1].me.should.eql(auctionQueries.me)
    })
  })
})

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
        url.should.containEql('/foo/login')
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
