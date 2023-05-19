import { MockBoot } from "DevTools/MockBoot"
import { mount } from "enzyme"
import { Footer } from "Components/Footer/Footer"
import { Breakpoint } from "@artsy/palette/dist/themes/types"
import { useRouter } from "System/Router/useRouter"

jest.mock("System/Router/useRouter", () => ({
  useRouter: jest.fn().mockReturnValue({
    match: { location: { pathname: "/" } },
  }),
}))

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

    it("renders the app download banner", () => {
      const wrapper = getWrapper("lg")
      expect(wrapper.text()).toContain("Meet your new art advisor.")
    })

    it("hides the app download banner if we are on an ignored route", () => {
      ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
        match: { location: { pathname: "/meet-your-new-art-advisor" } },
      }))

      const wrapper = getWrapper("lg")
      expect(wrapper.text()).not.toContain("Meet your new art advisor.")
    })
  })

  describe("small screen size", () => {
    it("renders a download banner", () => {
      const wrapper = getWrapper("xs")
      expect(wrapper.find("FooterDownloadAppBanner").length).toEqual(1)
    })

    it("renders the CCPA request button", () => {
      const wrapper = getWrapper("xs")
      expect(wrapper.find("button").length).toEqual(1)
    })
  })
})
