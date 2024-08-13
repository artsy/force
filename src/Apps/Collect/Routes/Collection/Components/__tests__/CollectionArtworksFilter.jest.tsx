import { MockBoot } from "DevTools/MockBoot"
import { CollectionArtworksFilterRefetchContainer as CollectionArtworksFilter } from "Apps/Collect/Routes/Collection/Components/CollectionArtworksFilter"
import { graphql } from "react-relay"
import { CollectionArtworksFilter_Query } from "__generated__/CollectionArtworksFilter_Query.graphql"
import { useTracking } from "react-tracking"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import {
  artistAggregation,
  artistNationalityAggregation,
  locationCityAggregation,
  materialsTermsAggregation,
  mediumAggregation,
  partnerAggregation,
} from "Apps/__tests__/Fixtures/aggregations"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

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
jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => false),
}))

const { getWrapper } = setupTestWrapper<CollectionArtworksFilter_Query>({
  Component: ({ collection }) => (
    <MockBoot user={{ id: "percy-z" }}>
      <CollectionArtworksFilter
        counts={{
          followedArtists: 10,
        }}
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
    query CollectionArtworksFilter_Query(
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
  const mockUseFeatureFlag = useFeatureFlag as jest.Mock

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    mockUseFeatureFlag.mockImplementation(() => true)
  })

  it("renders correctly", () => {
    const { wrapper } = getWrapper()
    expect(wrapper.find("ArtworkFilterArtworkGrid").length).toBe(1)
    expect(wrapper.find("ArtworkGridItem").length).toBe(1)
  })

  it("renders filters in correct order for just collection", () => {
    const { wrapper } = getWrapper({
      MarketingCollectionQuery: () => ({
        artistIDs: [],
      }),
    })
    const filterWrappers = wrapper.find("FilterExpandable")
    const filters = [
      {
        label: "Artists",
        expanded: true,
      },
      {
        label: "Rarity",
        expanded: true,
      },
      {
        label: "Medium",
        expanded: true,
      },
      {
        label: "Price",
        expanded: true,
      },
      {
        label: "Size",
        expanded: true,
      },
      {
        label: "Availability",
        expanded: true,
      },
      {
        label: "Ways to Buy",
        expanded: true,
      },
      {
        label: "Material",
        expanded: true,
      },
      {
        label: "Artist Nationality or Ethnicity",
        expanded: true,
      },
      {
        label: "Artwork Location",
        expanded: true,
      },
      {
        label: "Time Period",
        expanded: true,
      },
      {
        label: "Color",
        expanded: true,
      },
      {
        label: "Galleries and Institutions",
        expanded: true,
      },
    ]

    filters.forEach((filter, filterIndex) => {
      const { label, expanded } = filter

      expect(filterWrappers.at(filterIndex).prop("label")).toEqual(label)
      expect(filterWrappers.at(filterIndex).prop("expanded")).toEqual(expanded)
    })
  })

  it("renders filters in correct order for artist's collection", () => {
    const { wrapper } = getWrapper({
      MarketingCollectionQuery: () => ({
        artistIDs: ["some-unique-artist-id"],
      }),
    })
    const filterWrappers = wrapper.find("FilterExpandable")
    const filters = [
      {
        label: "Rarity",
        expanded: true,
      },
      {
        label: "Medium",
        expanded: true,
      },
      {
        label: "Price",
        expanded: true,
      },
      {
        label: "Size",
        expanded: true,
      },
      {
        label: "Availability",
        expanded: true,
      },
      {
        label: "Ways to Buy",
        expanded: true,
      },
      {
        label: "Material",
        expanded: true,
      },
      {
        label: "Artwork Location",
        expanded: true,
      },
      {
        label: "Time Period",
        expanded: true,
      },
      {
        label: "Color",
        expanded: true,
      },
      {
        label: "Galleries and Institutions",
        expanded: true,
      },
    ]

    filters.forEach((filter, filterIndex) => {
      const { label, expanded } = filter

      expect(filterWrappers.at(filterIndex).prop("label")).toEqual(label)
      expect(filterWrappers.at(filterIndex).prop("expanded")).toEqual(expanded)
    })
  })
})
