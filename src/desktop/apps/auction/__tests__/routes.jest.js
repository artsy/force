import Backbone from 'backbone'
import metaphysics from 'lib/metaphysics.coffee'
import CurrentUser from 'desktop/models/current_user.coffee'
// import {
//   fabricate
// } from 'antigravity'
import * as routes from '../routes'

jest.mock('backbone')
jest.mock('lib/metaphysics.coffee')

jest.mock('@artsy/stitch', () => ({
  renderLayout: () => '<html />',
}))
jest.mock('desktop/apps/auction/actions/artworkBrowser', () => ({
  fetchArtworksByFollowedArtists: () => ({
    type: 'GET_ARTWORKS_SUCCESS',
  }),
  fetchArtworks: () => ({
    type: 'GET_ARTWORKS_SUCCESS',
  }),
}))

describe('routes', () => {
  beforeEach(() => {
    Backbone.sync = jest.fn()
  })
  afterEach(() => {
    // Backbone.sync.restore()
  })

  describe('#index', () => {
    let req
    let res
    let next

    beforeEach(() => {
      req = {
        body: {},
        params: {
          id: 'foobar',
        },
        user: new CurrentUser({
          name: 'user',
        }),
      }
      res = {
        app: {
          get: jest.fn(() => 'components/page'),
        },
        locals: {
          sd: {},
        },
        redirect: jest.fn(),
        render: jest.fn(),
        send: jest.fn(),
      }
      next = jest.fn()
    })

    it('renders the index with the correct variables', async () => {
      const mockAuctionQueries = {
        sale: {
          id: 'foo',
          is_auction: true,
          auction_state: 'open',
          is_live_open: true,
        },
        me: {
          bidders: [
            {
              id: 'me',
              qualified_for_bidding: true,
              sale: {
                id: 'foo',
              },
            },
          ],
        },
      }

      metaphysics.mockResolvedValue(mockAuctionQueries)

      // FIXME: Need to write more robust output test
      await routes.index(req, res, next)
      expect(res.send).toBeCalledWith('<html />')
    })
  })

  describe('#redirectLive', async () => {
    let req
    let res
    let next

    beforeEach(() => {
      req = {
        body: {},
        params: {
          id: 'foobar',
        },
        user: new CurrentUser({
          name: 'user',
        }),
      }
      res = {
        redirect: jest.fn(),
      }
      next = jest.fn()
    })

    it('redirects on confirm if the auction is live and bidder is qualified', async () => {
      const mockAuctionQueries = {
        sale: {
          id: 'foo',
          is_auction: true,
          auction_state: 'open',
          is_live_open: true,
        },
        me: {
          bidders: [
            {
              id: 'me',
              qualified_for_bidding: true,
              sale: {
                id: 'foo',
              },
            },
          ],
        },
      }

      metaphysics.mockResolvedValue(mockAuctionQueries)

      await routes.redirectLive(req, res, next)
      expect(res.redirect).toBeCalledWith('undefined/foo/login')
    })

    it('does not redirect if bidder is not qualified', async () => {
      const mockAuctionQueries = {
        sale: {
          id: 'foo',
          is_auction: true,
          auction_state: 'open',
          is_live_open: true,
        },
        me: {
          bidders: [
            {
              id: 'me',
              qualified_for_bidding: false,
              sale: {
                id: 'foo',
              },
            },
          ],
        },
      }

      metaphysics.mockResolvedValue(mockAuctionQueries)

      await routes.redirectLive(req, res, next)
      expect(res.redirect).not.toBeCalled()
      expect(next).toBeCalled()
    })

    it('does not redirect if the auction is not live', async () => {
      const mockAuctionQueries = {
        sale: {
          id: 'foo',
          is_auction: true,
          auction_state: 'open',
          is_live_open: false,
        },
        me: {
          bidders: [
            {
              id: 'me',
              qualified_for_bidding: false,
              sale: {
                id: 'foo',
              },
            },
          ],
        },
      }

      metaphysics.mockResolvedValue(mockAuctionQueries)

      await routes.redirectLive(req, res, next)
      expect(res.redirect).not.toBeCalled()
      expect(next).toBeCalled()
    })
  })
})
