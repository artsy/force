const rewire = require('rewire')
const urls = rewire('../../../../utils/domain/auctions/urls')

describe('utils/domain/auctions/urls.js', () => {
  describe('#getLiveAuctionUrl', () => {
    const PREDICTION_URL = 'http://www.liveauctions.com'

    before(() => {
      urls.__set__('sd', {PREDICTION_URL})
    })

    it('appends /login with a true "isLoggedIn" option in the second argument', () => {
      urls.getLiveAuctionUrl('foo', { isLoggedIn: true }).should.equal(`${PREDICTION_URL}/foo/login`)
    })

    it('does not append login with a falsey user option', () => {
      urls.getLiveAuctionUrl('foo', {isLoggedIn: false}).should.equal(`${PREDICTION_URL}/foo`)
    })

    it('does not append login with no options', () => {
      urls.getLiveAuctionUrl('foo').should.equal(`${PREDICTION_URL}/foo`)
    })
  })

  describe('#getBidRedirectActionUrl', () => {
    it('redirects to /auction/:id/bid/:artworkId if logged out or qualified to bid', () => {
      urls.getBidRedirectActionUrl('logged-out', { id: 'foo' }, { id: 'bar' })
        .should.equal('/auction/bar/bid/foo')

      urls.getBidRedirectActionUrl('qualified-to-bid', { id: 'foo' }, { id: 'bar' })
        .should.equal('/auction/bar/bid/foo')
    })

    it('redirects to /artwork/:id by default', () => {
      urls.getBidRedirectActionUrl('registered', { id: 'foo' }, { id: 'bar' })
        .should.equal('/artwork/foo')
    })
  })
})
