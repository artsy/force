import React from "react"
import { mount } from "enzyme"
import { useTracking } from "react-tracking"
import { Link } from "@artsy/palette"
import { DownloadAppBadge } from "v2/Components/DownloadAppBadge"
import { ContextModule } from "@artsy/cohesion"

describe("DownloadAppBadge", () => {
  const trackEvent = jest.fn()
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

  it("tracks clicks on the app download badge", () => {
    const badge = mount(
      <DownloadAppBadge contextModule={ContextModule.footer} />
    )
    const downloadLink = badge.find(Link)
    // @ts-expect-error STRICT_NULL_CHECK
    downloadLink.props().onClick({} as any)
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
