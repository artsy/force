import { render, screen } from "@testing-library/react"
import {
  ArtistHeaderRecentAuctionResults,
  type RecentAuctionResult,
} from "Apps/Artist/Components/ArtistHeader/ArtistHeaderRecentAuctionResults"
import { MockBoot } from "DevTools/MockBoot"

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: () => ({ user: null }),
}))

const makeAuctionResult = (index: number): RecentAuctionResult => {
  return {
    internalID: `auction-result-${index}`,
    title: `Lot ${index}`,
    dateText: null,
    images: { thumbnail: null },
    priceRealized: { display: `$${index}`, centsUSD: index + 1 },
  } as RecentAuctionResult
}

describe("ArtistHeaderRecentAuctionResults", () => {
  it("renders the header with a View More link", () => {
    render(
      <MockBoot>
        <ArtistHeaderRecentAuctionResults
          artistSlug="pablo-picasso"
          auctionResults={[makeAuctionResult(0)]}
        />
      </MockBoot>,
    )

    expect(screen.getByText("Recent Auction Results")).toBeInTheDocument()
    expect(screen.getByText("View More").closest("a")).toHaveAttribute(
      "href",
      "/artist/pablo-picasso/auction-results?scroll_to_market_signals=true",
    )
  })

  it("shows the price for the first three items and gates the rest for signed-out visitors", () => {
    const auctionResults = [0, 1, 2, 3, 4].map(makeAuctionResult)

    render(
      <MockBoot>
        <ArtistHeaderRecentAuctionResults
          artistSlug="pablo-picasso"
          auctionResults={auctionResults}
        />
      </MockBoot>,
    )

    expect(screen.getByText("$0")).toBeInTheDocument()
    expect(screen.getByText("$1")).toBeInTheDocument()
    expect(screen.getByText("$2")).toBeInTheDocument()
    expect(screen.queryByText("$3")).not.toBeInTheDocument()
    expect(screen.queryByText("$4")).not.toBeInTheDocument()
    expect(screen.getAllByText("Sign up to see price")).toHaveLength(2)
  })
})
