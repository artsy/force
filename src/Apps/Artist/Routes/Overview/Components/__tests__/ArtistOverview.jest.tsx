import { screen } from "@testing-library/react"
import { useFlag } from "@unleash/proxy-client-react"
import { ArtistOverviewFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistOverview"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("@unleash/proxy-client-react", () => ({ useFlag: jest.fn() }))

jest.mock("Apps/Artist/Components/ArtistHeader/ArtistHeader", () => ({
  getArtistHeaderNumberOfInsights: () => 0,
}))
jest.mock("Components/ArtistSeriesRail/ArtistSeriesRail", () => ({
  ArtistSeriesRailQueryRenderer: () => null,
  ArtistSeriesRailPlaceholder: () => null,
}))
jest.mock("../ArtistAchievements", () => ({
  ArtistAchievementsQueryRenderer: () => <div>Achievements section</div>,
}))
jest.mock("../ArtistCareerHighlights", () => ({
  ArtistCareerHighlightsQueryRenderer: () => <div>Highlights section</div>,
  ArtistCareerHighlightsPlaceholder: () => null,
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: props => {
    return (
      <MockBoot breakpoint="lg">
        <ArtistOverviewFragmentContainer {...(props as any)} />
      </MockBoot>
    )
  },
  query: graphql`
    query ArtistOverview_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistOverview_artist
      }
    }
  `,
})

describe("ArtistOverview", () => {
  const artist = {
    internalID: "artist-id",
    href: "/artist/example",
    insights: [{ __typename: "ArtistInsight" }],
    articlesConnection: { totalCount: 0 },
    artistSeriesConnection: { totalCount: 0 },
    showsConnection: { totalCount: 0 },
    counts: { relatedArtists: 0 },
    related: { genes: { edges: [] } },
  }

  beforeEach(() => {
    ;(useFlag as jest.Mock).mockReturnValue(true)
  })

  it("shows the achievements accordions when the artist has a Story", () => {
    renderWithRelay({
      Artist: () => ({ ...artist, featuredStory: { internalID: "story-id" } }),
    })

    expect(screen.getByText("Achievements section")).toBeInTheDocument()
    expect(screen.queryByText("Highlights section")).not.toBeInTheDocument()
  })

  it("keeps today's highlights when the artist has no Story", () => {
    renderWithRelay({
      Artist: () => ({ ...artist, featuredStory: null }),
    })

    expect(screen.getByText("Highlights section")).toBeInTheDocument()
    expect(screen.queryByText("Achievements section")).not.toBeInTheDocument()
  })

  it("keeps today's highlights when the flag is off, even with a Story", () => {
    ;(useFlag as jest.Mock).mockReturnValue(false)

    renderWithRelay({
      Artist: () => ({ ...artist, featuredStory: { internalID: "story-id" } }),
    })

    expect(screen.getByText("Highlights section")).toBeInTheDocument()
    expect(screen.queryByText("Achievements section")).not.toBeInTheDocument()
  })
})
