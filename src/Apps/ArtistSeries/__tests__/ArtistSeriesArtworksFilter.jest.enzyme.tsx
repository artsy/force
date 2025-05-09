import { ArtistSeriesArtworksFilterRefetchContainer } from "Apps/ArtistSeries/Components/ArtistSeriesArtworksFilter"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import type { ArtistSeriesArtworksFilter_Query } from "__generated__/ArtistSeriesArtworksFilter_Query.graphql"
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

const { getWrapper } = setupTestWrapper<ArtistSeriesArtworksFilter_Query>({
  Component: ({ artistSeries }) => (
    <MockBoot user={{ id: "percy-z" }}>
      <ArtistSeriesArtworksFilterRefetchContainer
        artistSeries={artistSeries!}
      />
    </MockBoot>
  ),
  query: graphql`
    query ArtistSeriesArtworksFilter_Query($slug: ID!) @relay_test_operation {
      artistSeries(id: $slug) {
        ...ArtistSeriesArtworksFilter_artistSeries
      }
    }
  `,
  variables: { slug: "kaws-spongebob" },
})

describe("ArtistSeriesArtworksFilter", () => {
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders correctly", () => {
    const { wrapper } = getWrapper()
    expect(wrapper.find("ArtworkFilterArtworkGrid").length).toBe(1)
    expect(wrapper.find("ArtworkGridItem").length).toBe(1)
  })

  it("renders filters in correct order", () => {
    const { wrapper } = getWrapper({
      FilterArtworksConnection: () => ({
        counts: {
          followedArtists: 10,
        },
        aggregations: [
          {
            slice: "PARTNER",
          },
          { slice: "LOCATION_CITY" },
          { slice: "MEDIUM" },
          { slice: "MATERIALS_TERMS" },
        ],
      }),
    })
    const filterWrappers = wrapper.find("FilterExpandable")
    const filters = [
      {
        label: "Keyword Search",
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
