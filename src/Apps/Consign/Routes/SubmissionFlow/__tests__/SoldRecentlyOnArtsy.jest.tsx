import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fireEvent, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { SoldRecentlyOnArtsyFragmentContainer } from "Apps/Consign/Routes/SubmissionFlow/SoldRecentlyOnArtsy"

jest.unmock("react-relay")

jest.mock("react-tracking")

const trackEvent = useTracking as jest.Mock

const { renderWithRelay } = setupTestWrapperTL({
  Component: SoldRecentlyOnArtsyFragmentContainer,
  query: graphql`
    query SoldRecentlyOnArtsy_tests_Query @relay_test_operation {
      recentlySoldArtworks {
        ...SoldRecentlyOnArtsy_recentlySoldArtworks
      }
    }
  `,
})

describe("SoldRecentlyOnArtsy", () => {
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders correct components", () => {
    renderWithRelay({
      RecentlySoldArtworkTypeConnection: () => recentlySoldArtworkConnection,
    })

    expect(screen.queryByText(/^Sold Recently on Artsy/)).toBeInTheDocument()

    expect(screen.getAllByTestId("soldRecentlyItem").length).toEqual(1)

    expect(screen.queryByText("Estimate")).toBeInTheDocument()
    expect(screen.queryByText("Sold for (incl. premium)")).toBeInTheDocument()
  })

  it("tracks artwork item click", () => {
    renderWithRelay({
      RecentlySoldArtworkTypeConnection: () => recentlySoldArtworkConnection,
    })

    fireEvent.click(screen.getByTestId("soldRecentlyItem"))

    expect(trackEvent).toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedArtworkGroup",
      context_module: "artworkRecentlySoldGrid",
      context_page_owner_type: "consign",
      destination_page_owner_id: "artwork-id",
      destination_page_owner_slug: "artwork-slug",
      destination_page_owner_type: "artwork",
      horizontal_slide_position: 0,
      type: "thumbnail",
    })
  })
})

const artwork = {
  internalID: "artwork-id",
  slug: "artwork-slug",
}

const recentlySoldArtworkConnection = {
  edges: [
    {
      node: {
        artwork,
      },
    },
  ],
}
