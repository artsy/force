/* eslint-env mocha */
import { setup } from './helpers'

describe('/terms', () => {
  let gravity, browser

  before(async () => {
    ({ gravity, browser } = await setup())
    gravity.get('/api/v1/page/:id', (req, res) => {
      res.send({ name: 'Terms', content: 'Hello *World*' })
    })
  })

  it('renders a markdown page of terms and conditions', async () => {
    const $ = await browser.page('/terms')
    $('body').html().should.containEql('Hello <em>World</em>')
  })
})
