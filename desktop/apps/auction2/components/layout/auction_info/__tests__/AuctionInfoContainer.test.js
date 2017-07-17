import renderTestComponent from 'desktop/apps/auction2/__tests__/utils/renderTestComponent'
import AuctionInfoDesktop from 'desktop/apps/auction2/components/layout/auction_info/AuctionInfoDesktop'
import AuctionInfoMobile from 'desktop/apps/auction2/components/layout/auction_info/AuctionInfoMobile'
import { test } from 'desktop/apps/auction2/components/layout/auction_info/index'

const { AuctionInfoContainer } = test

describe('auction/components/layout/auction_info/AuctionInfoContainer.test', () => {
  describe('<AuctionInfoContainer />', () => {
    it('renders mobile mode if isMobile', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoContainer,
        props: {
          isMobile: true
        }
      })

      wrapper.find(AuctionInfoDesktop).length.should.equal(0)
      wrapper.find(AuctionInfoMobile).length.should.equal(1)
    })

    it('renders desktop mode if isMobile is false', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoContainer,
        props: {
          isMobile: false
        }
      })

      wrapper.find(AuctionInfoDesktop).length.should.equal(1)
      wrapper.find(AuctionInfoMobile).length.should.equal(0)
    })
  })
})
