import { MockBoot } from "v2/DevTools/MockBoot"
import { mount } from "enzyme"
import React from "react"
import { DownloadAppBadge, Footer, LargeFooter, SmallFooter } from "../Footer"
import { useTracking } from "react-tracking"
import { Link } from "@artsy/palette"

describe("Footer", () => {
  const trackEvent = jest.fn()

  beforeAll(() => {
    window.matchMedia = undefined // Immediately set matching media query in Boot
  })

  beforeEach(() => {
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("is responsive", () => {
    const small = mount(
      <MockBoot breakpoint="xs">
        <Footer />
      </MockBoot>
    )
    expect(small.find(SmallFooter).length).toEqual(1)

    const large = mount(
      <MockBoot breakpoint="lg">
        <Footer />
      </MockBoot>
    )
    expect(large.find(LargeFooter).length).toEqual(1)
  })

  it("tracks clicks on the app download badge", () => {
    const footer = mount(
      <MockBoot breakpoint="lg">
        <Footer />
      </MockBoot>
    )
    const downloadLink = footer.find(DownloadAppBadge).find(Link)
    downloadLink.props().onClick()
    expect(trackEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        context_module: "footer",
        destination_path:
          "https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080",
        subject: "Download on the App Store",
      })
    )
  })
})
