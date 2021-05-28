import React from "react"
import { mount } from "enzyme"
import { useTracking } from "react-tracking"
import { Link } from "@artsy/palette"
import { Device, DownloadAppBadge } from "v2/Components/DownloadAppBadge"
import { ContextModule } from "@artsy/cohesion"

describe("DownloadAppBadge", () => {
  const trackEvent = jest.fn()
  const event = {
    context_module: "footer",
    subject: "Download on the App Store",
    destination_path:
      "https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080",
  }
  const props = {
    contextModule: ContextModule.footer,
    device: Device.iPhone,
  }

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

  it("tracks clicks on the iPhone app download badge", () => {
    const badge = mount(<DownloadAppBadge {...props} />)
    const downloadLink = badge.find(Link)
    // @ts-expect-error STRICT_NULL_CHECK
    downloadLink.props().onClick({} as any)
    expect(trackEvent).toHaveBeenCalledWith(expect.objectContaining(event))
  })

  it("tracks clicks on the Android app download badge", () => {
    const badge = mount(<DownloadAppBadge {...props} device={Device.Android} />)
    const downloadLink = badge.find(Link)
    // @ts-expect-error STRICT_NULL_CHECK
    downloadLink.props().onClick({} as any)
    expect(trackEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        ...event,
        destination_path:
          "https://play.google.com/store/apps/details?id=net.artsy.app",
      })
    )
  })
})
