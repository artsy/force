/* eslint-env mocha */
import { setup, teardown, stubAuctionReminder } from './helpers'
import { server as antigravity } from 'antigravity'

describe('Partner profile page', () => {
  let gravity, browser

  before(async () => {
    ({ gravity, browser } = await setup())
    stubAuctionReminder()
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

  it('does not show contact information for non-active partner', async () => {
    const $ = await browser.page('/gagosian-gallery/contact')
    
    
    $.html().should.containEql('Sorry, the page you were looking for doesn&#x2019;t exist at this URL.')
  })

  it('show contact information for active partner', async () => {
    const $ = await browser.page('/pace-gallery/contact')
    $.html().should.containEql('Contact')
    $.html().should.containEql('New York')
  })
})
