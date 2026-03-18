import { fireEvent, render, screen } from "@testing-library/react"
import { ArtistAuctionResultsEmptyState } from "Apps/Artist/Routes/AuctionResults/Components/ArtistAuctionResultsEmptyState"
import { useAuctionResultsTracking } from "Apps/Artist/Routes/AuctionResults/Components/Hooks/useAuctionResultsTracking"

jest.mock(
  "Apps/Artist/Routes/AuctionResults/Components/Hooks/useAuctionResultsTracking",
)
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerType: "artist",
  })),
}))

const trackClickedAuctionResultItem = jest.fn()

beforeAll(() => {
  ;(useAuctionResultsTracking as jest.Mock).mockImplementation(() => ({
    trackClickedAuctionResultItem,
  }))
})

afterEach(() => {
  trackClickedAuctionResultItem.mockClear()
})

describe("ArtistAuctionResultsEmptyState", () => {
  it("renders correctly", () => {
    render(<ArtistAuctionResultsEmptyState />)

    expect(
      screen.getByText(
        "There are currently no auction results for this artist.",
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /view the artsy database/i }),
    ).toBeInTheDocument()
  })

  it("tracks empty state button click", () => {
    render(<ArtistAuctionResultsEmptyState />)

    fireEvent.click(
      screen.getByRole("button", { name: /view the artsy database/i }),
    )

    expect(trackClickedAuctionResultItem).toBeCalledWith({
      type: "emptyState",
      context_page_owner_type: "artist",
    })
  })
})
