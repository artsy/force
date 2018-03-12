import AuctionInfoMobileWrapper, { test } from 'desktop/apps/auction/components/layout/auction_info/AuctionInfoMobile'
import Registration from 'desktop/apps/auction/components/layout/auction_info/Registration'
import renderTestComponent from 'desktop/apps/auction/__tests__/utils/renderTestComponent'
import sinon from 'sinon'

const { AuctionInfoMobile } = test

describe('auction/components/layout/auction_info/AuctionInfoMobile.test', () => {
  describe('<AuctionInfoMobile />', () => {
    it('renders Sale Preview if isAuctionPromo', () => {
      let component = renderTestComponent({
        Component: AuctionInfoMobile,
        props: {
          isAuctionPromo: true
        }
      })

      component.wrapper.text().should.containEql('Sale Preview')

      component = renderTestComponent({
        Component: AuctionInfoMobile,
        props: {
          isAuctionPromo: false
        }
      })

      component.wrapper.text().should.not.containEql('Sale Preview')
    })

    it('renders name and upcoming label', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoMobile,
        props: {
          name: 'Foo',
          upcomingLabel: 'Bar'
        }
      })

      wrapper.text().should.containEql('Foo')
      wrapper.text().should.containEql('Bar')
    })

    it('renders Live Auction if liveStartAt exists', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoMobile,
        props: {
          liveStartAt: 'foo'
        }
      })

      wrapper.text().should.containEql('Live auction')
    })

    it('should not render a description', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoMobile,
        props: {
          showInfoWindow: false,
          description: 'hello description'
        }
      })

      wrapper.text().should.not.containEql('hello description')
    })

    it('renders a Registration metadata component', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoMobile
      })

      wrapper.find(Registration).length.should.eql(1)
    })

    it('shows a Auction info window if showInfoWindow is true', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoMobile,
        props: {
          isAuction: true,
          liveStartAt: true,
          showInfoWindow: true,
          description: 'hello description'
        }
      })

      wrapper.find(Registration).length.should.eql(1)
      wrapper.text().should.containEql('hello description')
      wrapper.text().should.containEql('Auction Begins')
      wrapper.find('.chevron-nav-list').length.should.eql(1)
      wrapper.text().should.containEql('Auctions FAQ')
      wrapper.text().should.containEql('Contact')
    })

    it('shows a Sale info window if showInfoWindow is true', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoMobile,
        props: {
          isAuction: false,
          liveStartAt: true,
          showInfoWindow: true,
          description: 'hello description'
        }
      })

      wrapper.find(Registration).length.should.eql(1)
      wrapper.text().should.containEql('hello description')
      wrapper.text().should.containEql('Sale Begins')
      wrapper.find('.chevron-nav-list').length.should.eql(1)
      wrapper.text().should.not.containEql('Auctions FAQ')
      wrapper.text().should.containEql('Contact')
    })

    it('toggles showInfoWindow on info-btn click', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoMobileWrapper,
        props: {
          showInfoWindow: false
        }
      })

      wrapper.props().store.getState().app.showInfoWindow.should.eql(false)
      window.scrollTo = sinon.spy()
      wrapper.find('.auction-AuctionInfo__metadata').simulate('click')
      window.scrollTo.called.should.eql(true)
      wrapper.props().store.getState().app.showInfoWindow.should.eql(true)
    })
  })

  it('hide upcoming info if missing liveStartAt', () => {
    const { wrapper } = renderTestComponent({
      Component: AuctionInfoMobileWrapper,
      props: {
        liveStartAt: false,
        showInfoWindow: false
      }
    })
    wrapper.html().should.not.containEql('AuctionInfoMobile__live-label')
  })
})
