/* eslint-env mocha */
import { setup, teardown } from './helpers'

describe('Artwork page', () => {
  let metaphysics, browser

  before(async () => {
    ({ metaphysics, browser } = await setup())
    metaphysics.post('/', (req, res) => {
      res.send(require('./fixtures/metaphysics/artwork'))
    })
  })

  after(teardown)

  it('renders an artwork title and artist', async () => {
    const $ = await browser.page('/artwork/andy-warhol-skull')
    $.html().should.containEql('Andy Warhol')
    $.html().should.containEql('Skull, 1976')
  })
})
