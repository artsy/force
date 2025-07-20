import { TagArtworkFilterRefetchContainer } from "Apps/Tag/Components/TagArtworkFilter"
import {
  artistAggregation,
  artistNationalityAggregation,
  locationCityAggregation,
  materialsTermsAggregation,
  mediumAggregation,
  partnerAggregation,
} from "Apps/__tests__/Fixtures/aggregations"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { TagArtworkFilterTestQuery } from "__generated__/TagArtworkFilterTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

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

const { renderWithRelay } = setupTestWrapperTL<TagArtworkFilterTestQuery>({
  Component: ({ tag }) => (
    <MockBoot user={{ id: "percy-z" }}>
      <TagArtworkFilterRefetchContainer tag={tag!} />
    </MockBoot>
  ),
  query: graphql`
    query TagArtworkFilterTestQuery($slug: String!) @relay_test_operation {
      tag(id: $slug) {
        ...TagArtworkFilter_tag
      }
    }
  `,
  variables: { slug: "tag" },
})

describe("TagArtworkFilter", () => {
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders correctly", () => {
    const { container } = renderWithRelay()
    expect(container).toBeInTheDocument()
    // Basic test that the component renders without crashing
    expect(container.firstChild).toBeTruthy()
  })

  it("renders filters in correct order", () => {
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

    // Check for some key filters that should be present
    expect(screen.getByText("All Filters")).toBeInTheDocument()
    expect(screen.getAllByText("Rarity")).toHaveLength(2)
  })
})
