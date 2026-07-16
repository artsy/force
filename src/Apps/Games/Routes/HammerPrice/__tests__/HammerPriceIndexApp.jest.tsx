import { render, screen } from "@testing-library/react"
import { HammerPriceIndexApp } from "Apps/Games/Routes/HammerPrice/HammerPriceIndexApp"
import { hammerPriceProgressStore } from "Apps/Games/Routes/HammerPrice/Utils/gameProgressStore"
import { MockBoot } from "DevTools/MockBoot"
import { useClientQuery } from "Utils/Hooks/useClientQuery"

jest.mock("Utils/Hooks/useClientQuery", () => ({
  useClientQuery: jest.fn(),
}))

interface RowFixture {
  internalID: string
  title: string
  artist: { name: string }
  priceRealized: { centsUSD: number | null }
}

const ROW_FIXTURES: Record<string, RowFixture> = {
  "7318095": {
    internalID: "7318095",
    title: "No. 15 (Two Greens and Red Stripe)",
    artist: { name: "Mark Rothko" },
    priceRealized: { centsUSD: 9_838_500_000 },
  },
}

const mockUseClientQuery = useClientQuery as jest.Mock

const mockLoadedRows = () => {
  mockUseClientQuery.mockImplementation(({ variables }) => ({
    data: {
      auctionResult: ROW_FIXTURES[variables.auctionResultId] ?? {
        internalID: variables.auctionResultId,
        title: "Untitled",
        artist: { name: "Some Artist" },
        priceRealized: { centsUSD: 100_000_00 },
      },
    },
    loading: false,
    error: null,
  }))
}

describe("HammerPriceIndexApp", () => {
  beforeEach(() => {
    localStorage.clear()
    mockUseClientQuery.mockReset()
  })

  it("lists browsable puzzles newest first with links", () => {
    mockLoadedRows()

    render(
      <MockBoot>
        <HammerPriceIndexApp />
      </MockBoot>,
    )

    expect(screen.getByText("Hammer Price")).toBeInTheDocument()

    const links = screen.getAllByRole("link")

    expect(links.length).toBeGreaterThan(0)
    // Newest first: the Rothko (2026-07-14) leads
    expect(links[0]).toHaveAttribute(
      "href",
      "/games/hammer-price/puzzles/7318095",
    )

    expect(screen.getByText(/Mark Rothko/)).toBeInTheDocument()
    expect(screen.getAllByText("Not started").length).toBeGreaterThan(0)
  })

  it("shows completion state from persisted progress", () => {
    mockLoadedRows()

    hammerPriceProgressStore.saveProgress({
      auctionResultId: "7318095",
      guesses: ["98385000"],
      updatedAt: "2026-07-14T00:00:00.000Z",
    })

    render(
      <MockBoot>
        <HammerPriceIndexApp />
      </MockBoot>,
    )

    expect(screen.getByText("Solved 1/6")).toBeInTheDocument()
  })

  it("shows placeholder rows while loading", () => {
    mockUseClientQuery.mockImplementation(() => ({
      data: null,
      loading: true,
      error: null,
    }))

    render(
      <MockBoot>
        <HammerPriceIndexApp />
      </MockBoot>,
    )

    // No artist names render while loading, but the rows themselves do
    expect(screen.queryByText(/Mark Rothko/)).not.toBeInTheDocument()
    expect(screen.getAllByRole("link").length).toBeGreaterThan(0)
  })
})
