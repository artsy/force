import { DownloadAppBadge } from "Components/DownloadAppBadges/DownloadAppBadge"
import { Device } from "Utils/Hooks/useDeviceDetection"
import { ContextModule } from "@artsy/cohesion"
import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"

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
    render(<DownloadAppBadge {...props} />)
    const downloadLink = screen.getByRole("link")
    fireEvent.click(downloadLink)
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
