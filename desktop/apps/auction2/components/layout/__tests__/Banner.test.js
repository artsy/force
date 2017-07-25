import renderTestComponent from 'desktop/apps/auction2/__tests__/utils/renderTestComponent'
import { test } from 'desktop/apps/auction2/components/layout/Banner'

const { Banner } = test

describe('auction/components/layout/Banner.test', () => {
  describe('<Banner />', () => {
    it('renders an Enter Live Auction banner if isLiveOpen', () => {
      const liveAuctionUrl = 'live.artsy.net/some-auction-url'

      const { wrapper } = renderTestComponent({
        Component: Banner,
        props: {
          isLiveOpen: true,
          liveAuctionUrl
        }
      })

      wrapper.text().should.containEql('Live Bidding Now Open')
      wrapper.find('a').html().should.containEql(liveAuctionUrl)
    })

    it('renders a normal banner if not live', () => {
      const { wrapper } = renderTestComponent({
        Component: Banner,
        props: {
          isLiveOpen: false
        },
        options: {
          renderMode: 'render'
        }
      })

      wrapper.find('.clock').length.should.eql(1)
    })
  })
})
