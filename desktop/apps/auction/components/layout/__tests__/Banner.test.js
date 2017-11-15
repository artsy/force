import renderTestComponent from 'desktop/apps/auction/__tests__/utils/renderTestComponent'
import { test } from 'desktop/apps/auction/components/layout/Banner'
import sinon from 'sinon'
const { Banner } = test

describe('auction/components/layout/Banner.test', () => {
  describe('<Banner />', () => {
    it('tracks a click on the "Enter Live Auction" button', () => {
      const liveAuctionUrl = 'live.artsy.net/some-auction-url'
      const mockTrack = sinon.spy()
      window.analytics = { track: mockTrack }
      const { wrapper } = renderTestComponent({
        Component: Banner,
        props: {
          isLiveOpen: true,
          liveAuctionUrl
        }
      })

      wrapper.find('a').simulate('click')
      mockTrack.calledWithMatch('click').should.be.true()
    })
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

      wrapper.find('.auction-clock').length.should.eql(1)
    })
  })
})
