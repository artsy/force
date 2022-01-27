import { MockBoot } from "v2/DevTools/MockBoot"
import { mount } from "enzyme"
import { Footer } from "../Footer"
import { DownloadAppBadge } from "v2/Components/DownloadAppBadges/DownloadAppBadge"
import { CCPARequest } from "../../CCPARequest"
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
      const links = wrapper.find("FooterLink")

      expect(links.at(8).text()).toBe("Artsy for Galleries")
      expect(links.at(8).prop("to")).toBe("https://partners.artsy.net")

      expect(links.at(9).text()).toBe("Artsy for Museums")
      expect(links.at(9).prop("to")).toBe("/institution-partnerships")

      expect(links.at(10).text()).toBe("Artsy for Auctions")
      expect(links.at(10).prop("to")).toBe("/auction-partnerships")

      expect(links.at(11).text()).toBe("Artsy for Fairs")
      expect(links.at(11).prop("to")).toBe(
        "https://partners.artsy.net/artsy-fair-partnerships/"
      )
    })

    it("renders links to download the app", () => {
      const wrapper = getWrapper("lg")
      const links = wrapper.find("FooterLink")

      expect(links.at(15).text()).toBe("iOS App")
      expect(links.at(15).prop("to")).toBe(
        "https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080"
      )

      expect(links.at(16).text()).toBe("Android App")
      expect(links.at(16).prop("to")).toBe(
        "https://play.google.com/store/apps/details?id=net.artsy.app"
      )
    })

    it("renders the CCPA request link", () => {
      const wrapper = getWrapper("xs")
      expect(wrapper.find(CCPARequest).length).toEqual(1)
    })
  })

  describe("small screen size", () => {
    it("renders a download banner with a badge and a separate badge", () => {
      const wrapper = getWrapper("xs")
      expect(wrapper.find("FooterDownloadAppBanner").length).toEqual(1)
      expect(wrapper.find(DownloadAppBadge).length).toEqual(2)
    })

    it("renders the CCPA request link", () => {
      const wrapper = getWrapper("xs")
      expect(wrapper.find(CCPARequest).length).toEqual(1)
    })
  })
})
