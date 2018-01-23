import React from 'react'
import renderTestComponent from 'desktop/apps/auction/__tests__/utils/renderTestComponent'
import { test, __RewireAPI__ } from 'desktop/apps/auction/components/artwork_browser/main/artwork/GridArtwork'

const { GridArtwork } = test

describe('auction/components/artwork_browser/main/artwork/GridArtwork.test', () => {
  describe('<GridArtwork />', () => {
    const BidStatus = () => <div />

    beforeEach(() => {
      __RewireAPI__.__Rewire__('BidStatus', BidStatus)
    })

    afterEach(() => {
      __RewireAPI__.__ResetDependency__('BidStatus')
    })

    it('does not render a <BidStatus /> component if closed', () => {
      const { wrapper } = renderTestComponent({
        Component: GridArtwork,
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
        Component: GridArtwork,
        props: {
          saleArtwork: { _id: 'foo', id: 'bar' },
          isAuction: false,
          isClosed: false
        }
      })

      wrapper.find(BidStatus).length.should.equal(0)
    })

    it('renders a <BidStatus /> component is not closed', () => {
      const { wrapper } = renderTestComponent({
        Component: GridArtwork,
        props: {
          saleArtwork: { _id: 'foo', id: 'bar' },
          isAuction: true,
          isClosed: false
        }
      })

      wrapper.find(BidStatus).length.should.equal(1)
    })
  })
})
