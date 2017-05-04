/* eslint-env mocha */
import { setup, teardown } from './helpers'

describe('Authentication', () => {
  let gravity, browser

  before(async () => {
    ({ gravity, browser } = await setup())
    gravity.get('/api/v1/page/terms', (req, res) => {
      res.send(require('./fixtures/gravity/terms.json'))
    })
  })

  after(teardown)

  it('logs in', async () => {
    await browser.page('/terms')
    await browser.login()
    const html = await browser.el('.main-layout-header-user')
    html.should.containEql('Craig Spaeth')
  })
})
