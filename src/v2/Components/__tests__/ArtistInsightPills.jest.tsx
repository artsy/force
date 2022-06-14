import { render, screen } from "@testing-library/react"
import { ArtistInsightPills } from "../ArtistInsightPills"
import { ArtistInsightPills_artist } from "v2/__generated__/ArtistInsightPills_artist.graphql"

let artist

describe("ArtistInsightPills", () => {
  beforeEach(() => {
    artist = ({
      insights: [
        {
          type: "ACTIVE_SECONDARY_MARKET",
          label: "",
          entities: [],
        },
      ],
      auctionResultsConnection: {
        edges: [
          {
            node: {
              price_realized: {
                display: "US$93.1m",
              },
              organization: "Christies",
              sale_date: "2021",
            },
          },
        ],
      },
      artistHighlights: {
        partnersConnection: {
          edges: [
            {
              node: {
                categories: [
                  {
                    slug: "blue-chip",
                  },
                ],
              },
            },
          ],
        },
      },
    } as unknown) as ArtistInsightPills_artist
  })

  it("renders artist insight pills", () => {
    render(<ArtistInsightPills artist={artist} />)
    expect(screen.queryByText("Blue Chip Representation")).toBeInTheDocument()
    expect(screen.queryByText("High Auction Record")).toBeInTheDocument()
  })

  it("does not render high auction record pill if not present on artist", () => {
    artist.auctionResultsConnection = null

    render(<ArtistInsightPills artist={artist} />)
    expect(screen.queryByText("High Auction Record")).not.toBeInTheDocument()
  })

  it("does not render blue chip pill if not present on artist", () => {
    artist.artistHighlights.partnersConnection = []

    render(<ArtistInsightPills artist={artist} />)
    expect(
      screen.queryByText("Blue Chip Representation")
    ).not.toBeInTheDocument()
  })

  it("does not render active secondary market pill if not present on artist", () => {
    artist.insights = [
      {
        type: "MAJOR_SOLO",
      },
    ]

    render(<ArtistInsightPills artist={artist} />)
    expect(
      screen.queryByText("Active Secondary Market")
    ).not.toBeInTheDocument()
  })
})
