import { MockBoot } from "v2/DevTools/MockBoot"
import { mount } from "enzyme"
import { Footer } from "../Footer"
import { DownloadAppBadge } from "v2/Components/DownloadAppBadges/DownloadAppBadge"
import { Breakpoint } from "@artsy/palette/dist/themes/types"

describe("Footer", () => {
  const getWrapper = (breakpoint: Breakpoint) =>
    mount(
      <MockBoot breakpoint={breakpoint}>
        <Footer />
      </MockBoot>
    )

  describe("large screen size", () => {
    it("renders prompts to download the app", () => {
      const wrapper = getWrapper("lg")
      expect(wrapper.find("FooterDownloadAppBanner").length).toEqual(1)
      expect(wrapper.find(DownloadAppBadge).length).toEqual(2)
    })

    it("renders correct routes to partnerships", () => {
      const wrapper = getWrapper("lg")

      expect(wrapper.text()).toContain("Artsy for Galleries")
      expect(wrapper.html()).toContain("https://partners.artsy.net")

      expect(wrapper.text()).toContain("Artsy for Museums")
      expect(wrapper.html()).toContain("/institution-partnerships")

      expect(wrapper.text()).toContain("Artsy for Auctions")
      expect(wrapper.html()).toContain("/auction-partnerships")

      expect(wrapper.text()).toContain("Artsy for Fairs")
      expect(wrapper.html()).toContain(
        "https://partners.artsy.net/artsy-fair-partnerships/"
      )
    })

    it("renders links to download the app", () => {
      const wrapper = getWrapper("lg")

      expect(wrapper.text()).toContain("iOS App")
      expect(wrapper.html()).toContain(
        "https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080"
      )

      expect(wrapper.text()).toContain("Android App")
      expect(wrapper.html()).toContain(
        "https://play.google.com/store/apps/details?id=net.artsy.app"
      )
    })

    it("renders the CCPA request button", () => {
      const wrapper = getWrapper("xs")
      expect(wrapper.find("button").length).toEqual(1)
    })
  })

  describe("small screen size", () => {
    it("renders a download banner with a badge and a separate badge", () => {
      const wrapper = getWrapper("xs")
      expect(wrapper.find("FooterDownloadAppBanner").length).toEqual(1)
      expect(wrapper.find(DownloadAppBadge).length).toEqual(2)
    })

    it("renders the CCPA request button", () => {
      const wrapper = getWrapper("xs")
      expect(wrapper.find("button").length).toEqual(1)
    })
  })
})
