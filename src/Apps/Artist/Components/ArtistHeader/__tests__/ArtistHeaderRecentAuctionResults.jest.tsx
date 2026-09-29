import { fireEvent, screen } from "@testing-library/react"
import { ArtistHeaderRecentAuctionResults } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderRecentAuctionResults"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "4d8b92b34eb68a1b2c0003f4",
    contextPageOwnerSlug: "pablo-picasso",
    contextPageOwnerType: "artist",
  })),
}))
jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: () => ({ user: null }),
}))

const trackEvent = jest.fn()
;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return <ArtistHeaderRecentAuctionResults artist={props.artist} />
  },
  query: graphql`
    query ArtistHeaderRecentAuctionResults_Test_Query(
      $saleStartYear: Int
      $saleEndYear: Int
    ) @relay_test_operation {
      artist(id: "example") {
        ...ArtistHeaderRecentAuctionResults_artist
      }
    }
  `,
})

const makeAuctionResult = (index: number) => {
  return {
    node: {
      internalID: `auction-result-${index}`,
      title: `Lot ${index}`,
      dateText: null,
      saleDate: null,
      performance: null,
      images: { thumbnail: null },
      priceRealized: {
        display: `$${index + 1}`,
        centsUSD: (index + 1) * 100,
      },
    },
  }
}

const renderRail = (count: number) => {
  return renderWithRelay({
    Artist: () => ({
      internalID: "artist-id",
      slug: "pablo-picasso",
      href: "/artist/pablo-picasso",
      recentAuctionResultsConnection: {
        edges: Array.from({ length: count }, (_, index) => {
          return makeAuctionResult(index)
        }),
      },
    }),
  })
}

describe("ArtistHeaderRecentAuctionResults", () => {
  beforeEach(() => {
    trackEvent.mockClear()
  })

  it("renders the header with a View More link", () => {
    renderRail(1)

    expect(screen.getByText("Recent Auction Results")).toBeInTheDocument()
    expect(screen.getByText("View More").closest("a")).toHaveAttribute(
      "href",
      "/artist/pablo-picasso/auction-results?scroll_to_market_signals=true",
    )
  })

  it("renders nothing when there are no results", () => {
    renderRail(0)

    expect(screen.queryByText("Recent Auction Results")).not.toBeInTheDocument()
  })

  it("tracks a click on the View More link", () => {
    renderRail(1)

    fireEvent.click(screen.getByText("View More"))

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedAuctionResultItem",
      context_module: "artistHeader",
      context_page_owner_type: "artist",
      context_page_owner_id: "4d8b92b34eb68a1b2c0003f4",
      context_page_owner_slug: "pablo-picasso",
      destination_page_owner_type: "artistAuctionResults",
      destination_page_owner_id: "artist-id",
      destination_page_owner_slug: "pablo-picasso",
      type: "viewAll",
    })
  })

  it("shows the price for the first three items and gates the rest for signed-out visitors", () => {
    renderRail(5)

    expect(screen.getByText("$1")).toBeInTheDocument()
    expect(screen.getByText("$2")).toBeInTheDocument()
    expect(screen.getByText("$3")).toBeInTheDocument()
    expect(screen.queryByText("$4")).not.toBeInTheDocument()
    expect(screen.queryByText("$5")).not.toBeInTheDocument()
    expect(screen.getAllByText("Sign up to see price")).toHaveLength(2)
  })
})
