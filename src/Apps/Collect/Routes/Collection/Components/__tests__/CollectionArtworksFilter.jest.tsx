import {
  artistAggregation,
  artistNationalityAggregation,
  locationCityAggregation,
  materialsTermsAggregation,
  mediumAggregation,
  partnerAggregation,
} from "Apps/__tests__/Fixtures/aggregations"
import { CollectionArtworksFilterRefetchContainer as CollectionArtworksFilter } from "Apps/Collect/Routes/Collection/Components/CollectionArtworksFilter"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { CollectionArtworksFilterTestQuery } from "__generated__/CollectionArtworksFilterTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: { query: {} },
    },
  }),
}))
jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

const { renderWithRelay } =
  setupTestWrapperTL<CollectionArtworksFilterTestQuery>({
    Component: ({ collection }) => (
      <MockBoot user={{ id: "percy-z" }}>
        <CollectionArtworksFilter
          aggregations={[
            artistAggregation,
            partnerAggregation,
            locationCityAggregation,
            mediumAggregation,
            materialsTermsAggregation,
            artistNationalityAggregation,
          ]}
          collection={collection!}
        />
      </MockBoot>
    ),
    query: graphql`
      query CollectionArtworksFilterTestQuery(
        $input: FilterArtworksInput
        $slug: String!
      ) @relay_test_operation {
        collection: marketingCollection(slug: $slug) {
          ...CollectionArtworksFilter_collection @arguments(input: $input)
        }
      }
    `,
    variables: { slug: "representations-of-architecture" },
  })

describe("CollectionArtworksFilter", () => {
  const trackEvent = jest.fn()
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders correctly", () => {
    renderWithRelay({})
    expect(screen.getByTestId("artwork-link")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "All Filters" }),
    ).toBeInTheDocument()
  })

  it("renders filters for just collection", () => {
    renderWithRelay({
      MarketingCollectionQuery: () => ({
        artistIDs: [],
      }),
    })

    expect(
      screen.getByRole("button", { name: "All Filters" }),
    ).toBeInTheDocument()
  })

  it("renders filters for artist's collection", () => {
    renderWithRelay({
      MarketingCollectionQuery: () => ({
        artistIDs: ["some-unique-artist-id"],
      }),
    })

    expect(
      screen.getByRole("button", { name: "All Filters" }),
    ).toBeInTheDocument()
  })
})
