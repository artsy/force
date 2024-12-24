import { fireEvent, screen } from "@testing-library/react"
import { PreviouslySoldOnArtsyRailFragmentContainer } from "Apps/Sell/Routes/MarketingLanding/Components/LandingPage/PreviouslySoldOnArtsyRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useSystemContext")
const trackEvent = useTracking as jest.Mock

const { renderWithRelay } = setupTestWrapperTL({
  Component: PreviouslySoldOnArtsyRailFragmentContainer,
  query: graphql`
    query PreviouslySoldOnArtsyRail_tests_Query @relay_test_operation {
      recentlySoldArtworks {
        ...PreviouslySoldOnArtsyRail_recentlySoldArtworks
      }
    }
  `,
})

describe("PreviouslySoldOnArtsyRail", () => {
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      user: { id: "user-id", email: "user-email@artsy.net" },
    }))
  })

  it("renders correct components", () => {
    renderWithRelay()

    expect(screen.queryByText(/^Previously sold on Artsy/)).toBeInTheDocument()

    expect(screen.getAllByTestId("previouslySoldItem").length).toEqual(1)

    expect(
      screen.queryByTestId("previouslySoldItem-estimate"),
    ).toBeInTheDocument()
  })

  it("tracks artwork item click", () => {
    renderWithRelay()

    fireEvent.click(screen.getByTestId("previouslySoldItem"))

    expect(trackEvent).toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedArtworkGroup",
      context_module: "artworkRecentlySoldGrid",
      context_page_owner_type: "consign",
      destination_page_owner_id: "<Artwork-mock-id-3>",
      destination_page_owner_slug: "<Artwork-mock-id-2>",
      destination_page_owner_type: "artwork",
      horizontal_slide_position: 0,
      type: "thumbnail",
    })
  })
})
