import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import FilterSort from "desktop/apps/auction/components/artwork_browser/header/FilterSort"
import HeaderDesktop from "desktop/apps/auction/components/artwork_browser/header/HeaderDesktop"

xdescribe("auction/components/artwork_browser/header/HeaderDesktop.test", () => {
  describe("<HeaderDesktop />", () => {
    it("renders a <FilterSort /> component", () => {
      const { wrapper } = renderTestComponent({
        Component: HeaderDesktop,
      })

      expect(wrapper.find(FilterSort).length).toBe(1)
    })

    it("renders a grid icon", () => {
      const { wrapper } = renderTestComponent({
        Component: HeaderDesktop,
      })

      expect(wrapper.find(".auction-artworks-HeaderDesktop__grid").length).toBe(
        1
      )
    })

    it("renders a default grid icon", () => {
      const { wrapper } = renderTestComponent({
        Component: HeaderDesktop,
      })

      expect(wrapper.html()).toMatch(
        "auction-artworks-HeaderDesktop__grid active"
      )
    })

    it("renders a list icon", () => {
      const { wrapper } = renderTestComponent({
        Component: HeaderDesktop,
      })

      expect(wrapper.find(".auction-artworks-HeaderDesktop__list").length).toBe(
        1
      )
    })

    // FIXME: Reenable at some point
    xit("toggles a sort on click", () => {
      const { wrapper } = renderTestComponent({
        Component: HeaderDesktop,
      })

      const { store } = wrapper.props()

      wrapper.find(".auction-artworks-HeaderDesktop__list").simulate("click")
      expect(store.getState().artworkBrowser.isListView).toBe(true)

      expect(
        wrapper.find(".auction-artworks-HeaderDesktop__list .active").length
      ).toBe(1)
      expect(
        wrapper.find(".auction-artworks-HeaderDesktop__grid .active").length
      ).toBe(0)

      wrapper.find(".auction-artworks-HeaderDesktop__grid").simulate("click")
      expect(store.getState().artworkBrowser.isListView).toBe(false)
      expect(
        wrapper.find(".auction-artworks-HeaderDesktop__list .active").length
      ).toBe(0)
      expect(
        wrapper.find(".auction-artworks-HeaderDesktop__grid .active").length
      ).toBe(1)
    })
  })
})
