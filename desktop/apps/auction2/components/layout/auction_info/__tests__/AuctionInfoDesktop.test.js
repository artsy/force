import AddToCalendarView from 'desktop/components/add_to_calendar/react'
import Registration from 'desktop/apps/auction2/components/layout/auction_info/Registration'
import renderTestComponent from 'desktop/apps/auction2/__tests__/utils/renderTestComponent'
import { test } from 'desktop/apps/auction2/components/layout/auction_info/AuctionInfoDesktop'

const { AuctionInfoDesktop } = test

describe('auction/components/layout/auction_info/AuctionInfoDesktop.test', () => {
  describe('<AuctionInfoDesktop />', () => {
    it('renders Sale Preview if isAuctionPromo', () => {
      let component = renderTestComponent({
        Component: AuctionInfoDesktop,
        props: {
          isAuctionPromo: true
        }
      })

      component.wrapper.find(AuctionInfoDesktop).text().should.containEql('Sale Preview')

      component = renderTestComponent({
        Component: AuctionInfoDesktop,
        props: {
          isAuctionPromo: false
        }
      })

      component.wrapper.find(AuctionInfoDesktop).text().should.not.containEql('Sale Preview')
    })

    it('renders name and upcoming label', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoDesktop,
        props: {
          name: 'Foo',
          upcomingLabel: 'Bar'
        }
      })

      wrapper.find(AuctionInfoDesktop).text().should.containEql('Foo')
      wrapper.find(AuctionInfoDesktop).text().should.containEql('Bar')
    })

    it('renders AddToCalendarView if showAddToCalendar is true', () => {
      let component = renderTestComponent({
        Component: AuctionInfoDesktop,
        props: {
          showAddToCalendar: true
        }
      })

      component.wrapper.find(AuctionInfoDesktop).find(AddToCalendarView).length.should.eql(1)

      component = renderTestComponent({
        Component: AuctionInfoDesktop,
        props: {
          showAddToCalendar: false
        }
      })

      component.wrapper.find(AuctionInfoDesktop).find(AddToCalendarView).length.should.eql(0)
    })

    it('renders Live Auction if liveStartAt exists', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoDesktop,
        props: {
          liveStartAt: 'foo'
        }
      })

      wrapper.find(AuctionInfoDesktop).text().should.containEql('Live auction')
    })

    it('renders a description', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoDesktop,
        props: {
          description: 'hello description'
        }
      })

      wrapper.find(AuctionInfoDesktop).text().should.containEql('hello description')
    })

    it('renders a Registration metadata component', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoDesktop
      })

      wrapper.find(AuctionInfoDesktop).find(Registration).length.should.eql(1)
    })
  })
})
