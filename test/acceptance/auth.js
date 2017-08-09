/* eslint-env mocha */
import { setup, teardown, stubAuctionReminder } from './helpers'

describe('Authentication', () => {
  let gravity, browser

  before(async () => {
    ({ gravity, browser } = await setup())
    stubAuctionReminder()
    gravity.get('/api/v1/page/terms', (req, res) => {
      res.send(require('./fixtures/gravity/terms.json'))
    })
  })

  after(teardown)

  xit('logs in', async (done) => {
    await browser.page('/terms')
    await browser.login()
    const html = await browser.el('.main-layout-header-user')
    html.should.containEql('Craig Spaeth')
    done()
  })
})
