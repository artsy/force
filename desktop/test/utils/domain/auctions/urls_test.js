const rewire = require('rewire')
const urls = rewire('../../../../../utils/domain/auctions/urls')

describe('Url Utilities', () => {
  let PREDICTION_URL = 'http://www.liveauctions.com'
  before(() => {
    urls.__set__('sd', {PREDICTION_URL})
  })
  describe('#liveAuctionUrl builds a url to a live auction', () => {
    it('appends /login with a true "isLoggedIn" option in the second argument', () => {
      urls.liveAuctionUrl('foo', { isLoggedIn: true }).should.equal(`${PREDICTION_URL}/foo/login`)
    })
    it('does not append login with a falsey user option', () => {
      urls.liveAuctionUrl('foo', {isLoggedIn: false}).should.equal(`${PREDICTION_URL}/foo`)
    })
    it('does not append login with no options', () => {
      urls.liveAuctionUrl('foo').should.equal(`${PREDICTION_URL}/foo`)
    })
  })
})
