import { mount } from "enzyme"
import { useTracking } from "react-tracking"
import { Link } from "@artsy/palette"
import { ContextModule } from "@artsy/cohesion"
import { Device } from "Utils/Hooks/useDeviceDetection"
import { DownloadAppBadge } from "Components/DownloadAppBadges/DownloadAppBadge"

describe("DownloadAppBadge", () => {
  const trackEvent = jest.fn()
  const props = {
    contextModule: ContextModule.footer,
    device: Device.iPhone,
    downloadAppUrl:
      "https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080",
  }

  beforeAll(() => {
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("tracks clicks on the app download badge", () => {
    const badge = mount(<DownloadAppBadge {...props} />)
    const downloadLink = badge.find(Link)
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    downloadLink.props().onClick({} as any)
    expect(trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
      [
        {
          "action": "clickedAppDownload",
          "context_module": "footer",
          "context_page_owner_id": undefined,
          "context_page_owner_slug": undefined,
          "context_page_owner_type": undefined,
          "destination_path": "https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080",
          "subject": "Download on the App Store",
        },
      ]
    `)
  })
})
