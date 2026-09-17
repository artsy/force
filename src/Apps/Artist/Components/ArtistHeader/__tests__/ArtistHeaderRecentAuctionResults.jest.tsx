import { fireEvent, render, screen } from "@testing-library/react"
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

  it("uses the same horizontal gap between cards as the card's own vertical gap", () => {
    const { container } = render(
      <MockBoot>
        <ArtistHeaderRecentAuctionResults
          artistSlug="pablo-picasso"
          auctionResults={[0, 1].map(makeAuctionResult)}
        />
      </MockBoot>,
    )

    const cells = container.querySelectorAll("li")
    expect(cells).toHaveLength(2)
    // Swiper's own default is a responsive [10px, 20px] gap — this
    // matches the card's own flat 10px image-to-text gap instead, and
    // the last cell keeps no trailing padding.
    expect(cells[0]).toHaveStyle({ paddingRight: "10px" })
    expect(cells[1]).not.toHaveStyle({ paddingRight: "10px" })
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

  describe("navigation", () => {
    // jsdom never computes real layout, so scrollWidth/clientWidth are
    // always 0 — these tests fake realistic scroll metrics directly on the
    // underlying element (the same node the component reads from) and fire
    // a scroll event to trigger the component's listener, since setting
    // properties via defineProperty doesn't dispatch one on its own.
    const setScrollMetrics = (
      element: HTMLElement,
      metrics: { scrollLeft: number; scrollWidth: number; clientWidth: number },
    ) => {
      Object.entries(metrics).forEach(([key, value]) => {
        Object.defineProperty(element, key, {
          value,
          writable: true,
          configurable: true,
        })
      })
    }

    const renderRail = (auctionResults: RecentAuctionResult[]) => {
      const { container } = render(
        <MockBoot>
          <ArtistHeaderRecentAuctionResults
            artistSlug="pablo-picasso"
            auctionResults={auctionResults}
          />
        </MockBoot>,
      )

      const viewport = container.querySelector("ul")
        ?.parentElement as HTMLElement

      return { viewport }
    }

    it("disables the previous button and enables the next button when there is more to scroll", () => {
      const { viewport } = renderRail([0, 1, 2].map(makeAuctionResult))

      setScrollMetrics(viewport, {
        scrollLeft: 0,
        scrollWidth: 1000,
        clientWidth: 300,
      })
      fireEvent.scroll(viewport)

      expect(
        screen.getByRole("button", { name: "See previous auction results" }),
      ).toBeDisabled()
      expect(
        screen.getByRole("button", { name: "See more auction results" }),
      ).toBeEnabled()
    })

    it("enables the previous button and disables the next button once scrolled to the end", () => {
      const { viewport } = renderRail([0, 1, 2].map(makeAuctionResult))

      setScrollMetrics(viewport, {
        scrollLeft: 700,
        scrollWidth: 1000,
        clientWidth: 300,
      })
      fireEvent.scroll(viewport)

      expect(
        screen.getByRole("button", { name: "See previous auction results" }),
      ).toBeEnabled()
      expect(
        screen.getByRole("button", { name: "See more auction results" }),
      ).toBeDisabled()
    })

    it("scrolls the viewport by one page when the next button is clicked", () => {
      const { viewport } = renderRail([0, 1, 2].map(makeAuctionResult))

      setScrollMetrics(viewport, {
        scrollLeft: 0,
        scrollWidth: 1000,
        clientWidth: 300,
      })
      fireEvent.scroll(viewport)

      // jsdom doesn't implement scrollBy at all, so there's nothing for
      // jest.spyOn to wrap — assign a stub directly instead.
      const scrollBySpy = jest.fn()
      viewport.scrollBy = scrollBySpy

      fireEvent.click(
        screen.getByRole("button", { name: "See more auction results" }),
      )

      expect(scrollBySpy).toHaveBeenCalledWith({ left: 300 })
    })
  })

  describe("progress indicator", () => {
    it("renders the scroll progress bar", () => {
      const auctionResults = [0, 1, 2].map(makeAuctionResult)

      render(
        <MockBoot>
          <ArtistHeaderRecentAuctionResults
            artistSlug="pablo-picasso"
            auctionResults={auctionResults}
          />
        </MockBoot>,
      )

      expect(screen.getByRole("scrollbar")).toBeInTheDocument()
    })
  })
})
