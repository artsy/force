import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { DownloadAppBanner } from "../DownloadAppBanner"

describe("DownloadAppBanner", () => {
  const trackEvent = jest.fn()

  const renderDownloadAppBanner = () => {
    render(
      <DownloadAppBanner
        savedSearchAttributes={{
          id: "artistId",
          name: "artistName",
          slug: "artistSlug",
          type: "artist",
        }}
      />
    )
  }

  beforeEach(() => {
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("tracks click on iOS button", () => {
    renderDownloadAppBanner()

    fireEvent.click(screen.getAllByRole("link")[0])

    expect(trackEvent).toBeCalledWith({
      action: "clickedAppDownload",
      context_module: "createAlert",
      context_page_owner_type: "artist",
      context_page_owner_slug: "artistSlug",
      context_page_owner_id: "artistId",
      destination_path:
        "https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080",
      subject: "Download on the App Store",
    })
  })

  it("tracks click on Android button", () => {
    renderDownloadAppBanner()

    fireEvent.click(screen.getAllByRole("link")[1])

    expect(trackEvent).toBeCalledWith({
      action: "clickedAppDownload",
      context_module: "createAlert",
      context_page_owner_type: "artist",
      context_page_owner_slug: "artistSlug",
      context_page_owner_id: "artistId",
      destination_path:
        "https://play.google.com/store/apps/details?id=net.artsy.app",
      subject: "Download on the Google Play",
    })
  })
})
