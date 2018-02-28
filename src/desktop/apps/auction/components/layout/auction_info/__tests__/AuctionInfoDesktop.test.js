import React from 'react'
import Registration from 'desktop/apps/auction/components/layout/auction_info/Registration'
import renderTestComponent from 'desktop/apps/auction/__tests__/utils/renderTestComponent'

const rewire = require('rewire')('../AuctionInfoDesktop')
const { AuctionInfoDesktop } = rewire.test

describe('auction/components/layout/auction_info/AuctionInfoDesktop.test', () => {
  describe('<AuctionInfoDesktop />', () => {
    it('renders Sale Preview if isAuctionPromo', () => {
      let component = renderTestComponent({
        Component: AuctionInfoDesktop,
        props: {
          isAuctionPromo: true
        }
      })

      component.wrapper.text().should.containEql('Sale Preview')

      component = renderTestComponent({
        Component: AuctionInfoDesktop,
        props: {
          isAuctionPromo: false
        }
      })

      component.wrapper.text().should.not.containEql('Sale Preview')
    })

    it('renders name and upcoming label', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoDesktop,
        props: {
          name: 'Foo',
          upcomingLabel: 'Bar'
        }
      })

      wrapper.text().should.containEql('Foo')
      wrapper.text().should.containEql('Bar')
    })

    it('renders AddToCalendarView if showAddToCalendar is true', () => {
      const AddToCalendarView = () => <div />
      const resetRewire = rewire.__set__('AddToCalendarView', AddToCalendarView)

      let component = renderTestComponent({
        Component: AuctionInfoDesktop,
        props: {
          showAddToCalendar: true
        }
      })

      component.wrapper.find(AddToCalendarView).length.should.eql(1)

      component = renderTestComponent({
        Component: AuctionInfoDesktop,
        props: {
          showAddToCalendar: false
        }
      })

      component.wrapper.find(AddToCalendarView).length.should.eql(0)
      resetRewire()
    })

    it('renders Live Auction if liveStartAt exists', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoDesktop,
        props: {
          liveStartAt: 'foo'
        }
      })

      wrapper.text().should.containEql('Live auction')
    })

    it('renders a description', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoDesktop,
        props: {
          description: 'hello description'
        }
      })

      wrapper.text().should.containEql('hello description')
    })

    it('renders a Registration metadata component', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoDesktop
      })

      wrapper.find(Registration).length.should.eql(1)
    })

    it('hides upcomingLabel if empty', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoDesktop,
        props: {
          upcomingLabel: ''
        }
      })

      wrapper.html().should.not.containEql('AuctionInfoDesktop__upcominigLabel')
    })
  })
})
