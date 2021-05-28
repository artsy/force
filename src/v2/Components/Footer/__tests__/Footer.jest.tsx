import { MockBoot } from "v2/DevTools/MockBoot"
import { mount } from "enzyme"
import React from "react"
import { Footer } from "../Footer"
import { DownloadAppBadge } from "v2/Components/DownloadAppBadge"
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
      expect(wrapper.find(DownloadAppBadge).length).toEqual(2) // One of these is hidden using display: none
    })

    it("renders the CCPA request link", () => {
      const wrapper = getWrapper("xs")
      expect(wrapper.find(CCPARequest).length).toEqual(1)
    })
  })

  describe("small screen size", () => {
    it("does not render a download banner; but does include the badge", () => {
      const wrapper = getWrapper("xs")
      expect(wrapper.find("FooterDownloadAppBanner").length).toEqual(0)
      expect(wrapper.find(DownloadAppBadge).length).toEqual(1)
    })

    it("renders the CCPA request link", () => {
      const wrapper = getWrapper("xs")
      expect(wrapper.find(CCPARequest).length).toEqual(1)
    })
  })

  describe("renders proper badge for downloading the app", () => {
    let userAgentGetter
    beforeEach(() => {
      userAgentGetter = jest.spyOn(window.navigator, "userAgent", "get")
    })

    it("to iPhone", () => {
      userAgentGetter.mockReturnValue("iPhone")
      const wrapper = getWrapper("xs")
      expect(wrapper.find("DownloadIPhoneAppBadgeSVG").exists()).toBeTruthy()
    })

    it("to Android", () => {
      userAgentGetter.mockReturnValue("Android")
      const wrapper = getWrapper("xs")
      expect(wrapper.find("DownloadAndroidAppBadgeSVG").exists()).toBeTruthy()
    })
  })
})
