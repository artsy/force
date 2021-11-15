import { mount } from "enzyme"
import { useTracking } from "react-tracking"
import { Link } from "@artsy/palette"
import { DownloadAppBadge } from "v2/Components/DownloadAppBadge"
import { ContextModule } from "@artsy/cohesion"
import { Device } from "v2/Utils/Hooks/useDeviceDetection"

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
    downloadAppUrl:
      "https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080",
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

  it("tracks clicks on the app download badge", () => {
    const badge = mount(<DownloadAppBadge {...props} />)
    const downloadLink = badge.find(Link)
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    downloadLink.props().onClick({} as any)
    expect(trackEvent).toHaveBeenCalledWith(expect.objectContaining(event))
  })
})
