/* eslint-env mocha */
import { setup, teardown } from './helpers'

describe('Page', () => {
  let gravity, browser

  before(async () => {
    ({ gravity, browser } = await setup())
    gravity.get('/api/v1/page/:id', (req, res) => {
      res.send(require('./fixtures/page'))
    })
    gravity.get('/api/v1/tag/:id', (req, res) => {
      res.send(require('./fixtures/tag'))
    })
    gravity.get('/api/v1/filter/artworks', (req, res) => {
      res.send(require('./fixtures/filter-artworks'))
    })
  })

  after(teardown)

  xdescribe('/home', () => {
    it('renders the homepage', async () => {
      const $ = await browser.page('/')
      $('body').html().should.containEql('Browse Works for Sale')
    })
  })

  describe('/terms', () => {
    it('renders a markdown page of terms and conditions', async () => {
      const $ = await browser.page('/terms')
      $('body').html().should
        .containEql('These Terms of Use')
    })
  })

  describe('/tag/cow', () => {
    it('renders a tag page for the tag cow', async () => {
      const $ = await browser.page('/tag/cow')
      $('body').html().should
        .containEql('Artwork related to &#x201C;Cow&#x201D;')
    })
  })

  describe('/dev/blank', () => {
    it('renders a blank page for Eigen', async () => {
      const $ = await browser.page('/dev/blank')
      $('body').html().should
        .containEql('<main></main>')
    })
  })

  context('with a mobile browser', () => {
    before(async () => {
      await browser.useragent('iPhone')
    })

    describe('/terms', () => {
      it('renders a markdown page of terms and conditions', async () => {
        const $ = await browser.page('/terms')
        $('#page-markdown-content.main-side-margin').html().should
          .containEql('These Terms of Use')
      })
    })
  })
})
