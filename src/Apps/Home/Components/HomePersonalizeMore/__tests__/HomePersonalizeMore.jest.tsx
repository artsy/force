import { screen, fireEvent, render } from "@testing-library/react"
import { HomePersonalizeMore } from "Apps/Home/Components/HomePersonalizeMore/HomePersonalizeMore"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "home-page-id",
  })),
}))

const trackEvent = jest.fn()

beforeAll(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
})

afterEach(() => {
  trackEvent.mockClear()
})

describe("HomePersonalizeMore", () => {
  it("renders all three cards", () => {
    render(<HomePersonalizeMore />)

    expect(screen.getByText("Never miss an artwork")).toBeInTheDocument()
    expect(screen.getByText("Introduce yourself")).toBeInTheDocument()
    expect(screen.getByText("Sell with Artsy")).toBeInTheDocument()
  })

  describe("tracking", () => {
    it("tracks Complete Your Profile button click", () => {
      render(<HomePersonalizeMore />)

      const completeProfileButton = screen.getByText("Complete Your Profile")
      fireEvent.click(completeProfileButton)

      expect(trackEvent).toBeCalledWith({
        action: "tappedCompleteYourProfile",
        context_module: "collectorProfileCard",
        context_screen_owner_type: "home",
        context_screen_owner_id: "home-page-id",
      })
    })
  })
})
