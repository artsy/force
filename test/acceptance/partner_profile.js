/* eslint-env mocha */
import { setup, teardown } from './helpers'
import { server as antigravity } from 'antigravity'

describe('Partner profile page', () => {
  let gravity, browser

  before(async () => {
    ({ gravity, browser } = await setup())
    gravity.use(antigravity)
    await browser.useragent('iPhone')
  })

  after(teardown)

  it('shows the list of shows', async () => {
    const $ = await browser.page('/gagosian-gallery/shows')
    $.html().should.containEql('Upcoming Shows')
  })

  it('shows partner articles', async () => {
    const $ = await browser.page('/gagosian-gallery/articles')
    $.html().should.containEql('Articles')
  })

  it('shows partner contact information', async () => {
    const $ = await browser.page('/gagosian-gallery/contact')
    $.html().should.containEql('Contact')
    $.html().should.containEql('New York')
  })
})
