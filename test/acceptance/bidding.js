/* eslint-env mocha */
import { setup, teardown, stubAuctionReminder } from './helpers'

describe('Bidding flow', () => {
  let metaphysics, browser

  before(async () => {
    ({ metaphysics, browser } = await setup())
    stubAuctionReminder()
    metaphysics.post('/', (req, res, next) => {
      if (req.body.query.includes('me {')) {
        res.send(require('./fixtures/metaphysics/bidding.json'))
      } else if (req.body.query.includes('sale(id: "rago-auctions-19th')) {
        res.send(require('./fixtures/metaphysics/bidding1.json'))
      } else if (req.body.query.includes('articles(published: true, auction_id:')) {
        res.send(require('./fixtures/metaphysics/bidding2.json'))
      } else if (req.body.query.includes('filter_sale_artworks')) {
        res.send(require('./fixtures/metaphysics/bidding3.json'))
      } else if (req.body.query.includes('artwork($id: String!)')) {
        res.send(require('./fixtures/metaphysics/bidding4.json'))
      } else {
        next()
      }
    })
  })

  after(teardown)

  it('can see the bid dropdown from auction to artwork page', async () => {
    await browser.page('/auction/rago-auctions-19th-slash-20th-c-american-slash-european-art')
    await browser.login()
    await browser.el('[href*="/artwork/jean-dupas-untitled"]')
    await browser.click('[href*="/artwork/jean-dupas-untitled"]')
    const html = await browser.el('.js-artwork-auction-max-bid')
    html.should.containEql('$11,000')
  })
})
