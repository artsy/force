import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { TrendingSearches } from "../TrendingSearches"

jest.mock("Utils/Hooks/useClientQuery", () => ({ useClientQuery: jest.fn() }))

jest.mock("Components/Artwork/SaveButton/SaveButton", () => ({
  SaveButtonFragmentContainer: () => <button type="button">Save</button>,
}))

const BANKSY_ID = "4dd1584de0091e000100207c"
const RABARAMA_ID = "69ef1a335bdeb20008bcebdc"

const mockData = {
  artists: [
    {
      internalID: BANKSY_ID,
      slug: "banksy",
      name: "Banksy",
      href: "/artist/banksy",
      initials: "B",
      coverArtwork: null,
    },
  ],
  artworks: {
    edges: [
      {
        node: {
          internalID: RABARAMA_ID,
          slug: "rabarama-dhyana",
          href: "/artwork/rabarama-dhyana",
          title: "Dhyana",
          date: "2019",
          artistNames: "Rabarama",
          saleMessage: "US$10,000",
          partner: { name: "Schellmann Art" },
          image: {
            resized: {
              src: "https://example.com/image.jpg",
              srcSet: "https://example.com/image.jpg 1x",
              width: 165,
              height: 230,
            },
          },
        },
      },
    ],
  },
}

describe("TrendingSearches", () => {
  beforeEach(() => {
    ;(useClientQuery as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
    })
  })

  it("renders the heading and the three time-window tabs", () => {
    render(<TrendingSearches />)

    expect(screen.getByText("Trending on Artsy")).toBeInTheDocument()
    expect(screen.getByText("Today")).toBeInTheDocument()
    expect(screen.getByText("Past 7 Days")).toBeInTheDocument()
    expect(screen.getByText("Past 30 days")).toBeInTheDocument()
  })

  it("renders a trending artist with name and nationality, without a growth indicator", () => {
    render(<TrendingSearches />)

    expect(screen.getByText("Banksy")).toBeInTheDocument()
    expect(screen.getAllByText("British").length).toBeGreaterThan(0)
    expect(screen.queryByText(/%/)).not.toBeInTheDocument()
    expect(screen.queryByText("New")).not.toBeInTheDocument()
  })

  it("renders an artwork card with artist, title, partner, price, and save button", () => {
    render(<TrendingSearches />)

    expect(screen.getByText("Rabarama")).toBeInTheDocument()
    expect(screen.getByText("Dhyana, 2019")).toBeInTheDocument()
    expect(screen.getByText("Schellmann Art")).toBeInTheDocument()
    expect(screen.getByText("US$10,000")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
  })

  it("switches windows when a tab is clicked", async () => {
    render(<TrendingSearches />)

    await userEvent.click(screen.getByText("Past 30 days"))

    // The heading remains and the newly-selected window renders its content.
    expect(screen.getByText("Trending on Artsy")).toBeInTheDocument()
  })
})
