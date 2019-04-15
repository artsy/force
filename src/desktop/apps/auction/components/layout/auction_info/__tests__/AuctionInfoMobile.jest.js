import AuctionInfoMobileWrapper, {
  test,
} from "desktop/apps/auction/components/layout/auction_info/AuctionInfoMobile"
import Registration from "desktop/apps/auction/components/layout/auction_info/Registration"
import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"

const { AuctionInfoMobile } = test

// FIXME: Add required props
xdescribe("auction/components/layout/auction_info/AuctionInfoMobile.test", () => {
  describe("<AuctionInfoMobile />", () => {
    it("renders Sale Preview if isAuctionPromo", () => {
      let component = renderTestComponent({
        Component: AuctionInfoMobile,
        props: {
          isAuctionPromo: true,
        },
      })

      expect(component.wrapper.text()).toMatch("Sale Preview")

      component = renderTestComponent({
        Component: AuctionInfoMobile,
        props: {
          isAuctionPromo: false,
        },
      })

      expect(component.wrapper.text()).not.toMatch("Sale Preview")
    })

    it("renders name and upcoming label", () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoMobile,
        props: {
          name: "Foo",
          upcomingLabel: "Bar",
        },
      })

      expect(wrapper.text()).toMatch("Foo")
      expect(wrapper.text()).toMatch("Bar")
    })

    it("renders Live Auction if liveStartAt exists", () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoMobile,
        props: {
          liveStartAt: "foo",
        },
      })

      expect(wrapper.text()).toMatch("Live auction")
    })

    it("should not render a description", () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoMobile,
        props: {
          showInfoWindow: false,
          description: "hello description",
        },
      })

      expect(wrapper.text()).not.toMatch("hello description")
    })

    it("renders a Registration metadata component", () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoMobile,
      })

      expect(wrapper.find(Registration).length).toBe(1)
    })

    it("shows a Auction info window if showInfoWindow is true", () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoMobile,
        props: {
          isAuction: true,
          liveStartAt: true,
          showInfoWindow: true,
          description: "hello description",
        },
      })

      expect(wrapper.find(Registration).length).toBe(1)
      expect(wrapper.text()).toMatch("hello description")
      expect(wrapper.text()).toMatch("Auction Begins")
      expect(wrapper.find(".chevron-nav-list").length).toBe(1)
      expect(wrapper.text()).toMatch("Auctions FAQ")
      expect(wrapper.text()).toMatch("Contact")
    })

    it("shows a Sale info window if showInfoWindow is true", () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoMobile,
        props: {
          isAuction: false,
          liveStartAt: true,
          showInfoWindow: true,
          description: "hello description",
        },
      })

      expect(wrapper.find(Registration).length).toBe(1)
      expect(wrapper.text()).toMatch("hello description")
      expect(wrapper.text()).toMatch("Sale Begins")
      expect(wrapper.find(".chevron-nav-list").length).toBe(1)
      expect(wrapper.text()).not.toMatch("Auctions FAQ")
      expect(wrapper.text()).toMatch("Contact")
    })

    it("toggles showInfoWindow on info-btn click", () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionInfoMobileWrapper,
        props: {
          showInfoWindow: false,
        },
      })

      expect(wrapper.props().store.getState().app.showInfoWindow).toBe(false)
      window.scrollTo = jest.fn()
      wrapper.find(".auction-AuctionInfo__metadata").simulate("click")
      expect(window.scrollTo).toBeCalled()
      expect(wrapper.props().store.getState().app.showInfoWindow).toBe(true)
    })
  })

  it("hide upcoming info if missing liveStartAt", () => {
    const { wrapper } = renderTestComponent({
      Component: AuctionInfoMobileWrapper,
      props: {
        liveStartAt: false,
        showInfoWindow: false,
      },
    })
    expect(wrapper.html()).not.toMatch("AuctionInfoMobile__live-label")
  })
})
