import React from 'react'
import renderTestComponent from 'desktop/apps/auction/__tests__/utils/renderTestComponent'

const rewire = require('rewire')('../MasonryArtwork')
const { MasonryArtwork } = rewire.test

describe('auction/components/artwork_browser/main/artwork/MasonryArtwork.test', () => {
  describe('<MasonryArtwork />', () => {
    const BidStatus = () => <div />

    beforeEach(() => {
      rewire.__set__('BidStatus', BidStatus)
    })

    it('does not render a <BidStatus /> component if closed', () => {
      const { wrapper } = renderTestComponent({
        Component: MasonryArtwork,
        props: {
          saleArtwork: { _id: 'foo', id: 'bar' },
          isAuction: true,
          isClosed: true
        }
      })

      wrapper.find(BidStatus).length.should.equal(0)
    })

    it('does not render a <BidStatus /> component if not an auction', () => {
      const { wrapper } = renderTestComponent({
        Component: MasonryArtwork,
        props: {
          saleArtwork: { _id: 'foo', id: 'bar' },
          isAuction: false,
          isClosed: false
        }
      })

      wrapper.find(BidStatus).length.should.equal(0)
    })

    it('renders a <BidStatus /> component if not closed', () => {
      const { wrapper } = renderTestComponent({
        Component: MasonryArtwork,
        props: {
          saleArtwork: { _id: 'foo', id: 'bar' },
          isAuction: true,
          isClosed: false
        }
      })

      wrapper.find(BidStatus).length.should.equal(1)
    })

    it('renders a sale_message if not an auction', () => {
      const { wrapper } = renderTestComponent({
        Component: MasonryArtwork,
        props: {
          sale_message: '$1000',
          saleArtwork: { _id: 'foo', id: 'bar' },
          isAuction: false,
          isClosed: false
        }
      })

      wrapper.html().should.containEql('$1000')
    })
  })
})
