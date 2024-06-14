import { MockBoot } from "DevTools/MockBoot"
import { SearchResultsArtworksRouteFragmentContainer as SearchResultsArtworks } from "Apps/Search/Routes/SearchResultsArtworks"
import { graphql } from "react-relay"
import { SearchResultsArtworks_Query } from "__generated__/SearchResultsArtworks_Query.graphql"
import { useTracking } from "react-tracking"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"
import {
  artistAggregation,
  artistNationalityAggregation,
  locationCityAggregation,
  materialsTermsAggregation,
  mediumAggregation,
  partnerAggregation,
} from "Apps/__tests__/Fixtures/aggregations"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: { query: {}, pathname: "" },
    },
  }),
}))
jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

const { renderWithRelay } = setupTestWrapperTL<SearchResultsArtworks_Query>({
  Component: ({ viewer }) => (
    <MockBoot user={{ id: "percy-z" }}>
      <SearchResultsArtworks viewer={viewer!} />
    </MockBoot>
  ),
  query: graphql`
    query SearchResultsArtworks_Query @relay_test_operation {
      viewer {
        ...SearchResultsArtworks_viewer @arguments(shouldFetchCounts: true)
      }
    }
  `,
})

describe("SearchResultsArtworks", () => {
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders correctly", () => {
    renderWithRelay({
      Artwork: () => ({
        title: "Artwork title",
      }),
    })

    expect(screen.getByText("Artwork title")).toBeInTheDocument()
  })

  it("renders filters", () => {
    renderWithRelay({
      FilterArtworksConnection: () => ({
        counts: {
          followedArtists: 10,
        },
        aggregations: [
          artistAggregation,
          partnerAggregation,
          locationCityAggregation,
          mediumAggregation,
          materialsTermsAggregation,
          artistNationalityAggregation,
        ],
      }),
    })

    expect(screen.getByText("Artists")).toBeInTheDocument()

    // Quick filters share same label
    expect(screen.getAllByText("Rarity")).toHaveLength(2)
    expect(screen.getAllByText("Medium")).toHaveLength(2)

    expect(screen.getByText("Price")).toBeInTheDocument()
    expect(screen.getByText("Size")).toBeInTheDocument()
    expect(screen.getByText("Ways to Buy")).toBeInTheDocument()
    expect(screen.getByText("Material")).toBeInTheDocument()
    expect(
      screen.getByText("Artist Nationality or Ethnicity")
    ).toBeInTheDocument()
    expect(screen.getByText("Artwork Location")).toBeInTheDocument()
    expect(screen.getByText("Time Period")).toBeInTheDocument()
    expect(screen.getByText("Color")).toBeInTheDocument()
    expect(screen.getByText("Galleries and Institutions")).toBeInTheDocument()
  })

  it("renders sort input", () => {
    renderWithRelay()

    expect(screen.getByText("Sort: Recommended")).toBeInTheDocument()
  })
})
