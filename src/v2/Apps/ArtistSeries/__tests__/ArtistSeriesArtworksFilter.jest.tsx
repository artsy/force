import { MockBoot, renderRelayTree } from "v2/DevTools"
import React from "react"
import { ArtistSeriesArtworksFilterRefetchContainer } from "../Components/ArtistSeriesArtworksFilter"
import { graphql } from "react-relay"
import { ArtistSeriesArtworksFilter_QueryRawResponse } from "v2/__generated__/ArtistSeriesArtworksFilter_Query.graphql"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.unmock("react-relay")
jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: { query: {} },
    },
  }),
}))
jest.mock("v2/System/Analytics/useTracking")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => ({}),
}))

describe("ArtistSeriesArtworksFilter", () => {
  const trackEvent = jest.fn()

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  const getWrapper = async (
    response: ArtistSeriesArtworksFilter_QueryRawResponse = RESPONSE_FIXTURE
  ) => {
    return renderRelayTree({
      Component: ({ artistSeries }) => {
        return (
          <MockBoot user={{ id: "percy-z" }}>
            <ArtistSeriesArtworksFilterRefetchContainer
              aggregations={artistSeries.sidebarAggregations.aggregations}
              artistSeries={artistSeries}
            />
          </MockBoot>
        )
      },
      query: graphql`
        query ArtistSeriesArtworksFilter_Query($slug: ID!) @raw_response_type {
          artistSeries(id: $slug) @principalField {
            ...ArtistSeriesArtworksFilter_artistSeries
            sidebarAggregations: filterArtworksConnection(first: 1) {
              aggregations {
                slice
                counts {
                  name
                  value
                  count
                }
              }
            }
          }
        }
      `,
      variables: { slug: "kaws-spongebob" },
      mockData: response,
    })
  }

  it("renders correctly", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find("ArtworkFilterArtworkGrid").length).toBe(1)
    expect(wrapper.find("GridItem__ArtworkGridItem").length).toBe(1)
  })

  it("renders filters in correct order", async () => {
    const wrapper = await getWrapper()
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
        label: "Ways to buy",
        expanded: true,
      },
      {
        label: "Material",
      },
      {
        label: "Artwork location",
      },
      {
        label: "Time period",
      },
      {
        label: "Color",
      },
      {
        label: "Galleries and institutions",
      },
    ]

    filters.forEach((filter, filterIndex) => {
      const { label, expanded } = filter

      expect(filterWrappers.at(filterIndex).prop("label")).toEqual(label)
      expect(filterWrappers.at(filterIndex).prop("expanded")).toEqual(expanded)
    })
  })
})

const RESPONSE_FIXTURE: ArtistSeriesArtworksFilter_QueryRawResponse = {
  artistSeries: {
    sidebarAggregations: {
      id: "sidebar-id",
      aggregations: [
        {
          slice: "PARTNER",
          counts: [
            {
              name: "Ross+Kramer Gallery",
              value: "ross-plus-kramer-gallery",
              count: 4,
            },
          ],
        },
        {
          slice: "LOCATION_CITY",
          counts: [
            {
              name: "New York, NY, USA",
              value: "New York, NY, USA",
              count: 4,
            },
          ],
        },
        {
          slice: "MEDIUM",
          counts: [
            {
              name: "Prints",
              value: "prints",
              count: 25,
            },
          ],
        },
        {
          slice: "MATERIALS_TERMS",
          counts: [
            {
              name: "Screen print",
              value: "screen print",
              count: 22,
            },
          ],
        },
        {
          slice: "MAJOR_PERIOD",
          counts: [
            {
              name: "2010",
              value: "2010",
              count: 25,
            },
          ],
        },
      ],
    },
    filtered_artworks: {
      id: "id",
      pageInfo: {
        hasNextPage: false,
        endCursor: "endCursor",
      },
      pageCursors: {
        around: [
          {
            cursor: "cursor",
            page: 1,
            isCurrent: true,
          },
        ],
        first: null,
        last: null,
        previous: null,
      },
      edges: [
        {
          id: "node-id",
          node: {
            id: "node-id",
            slug: "kaws-kawsbob-black-1",
            href: "/artwork/kaws-kawsbob-black-1",
            internalID: "5ae9b5f41a1e8613605274de",
            image: {
              aspect_ratio: 1,
              placeholder: "100%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/ufFlHZO7t5LVMTq6RBILXQ/large.jpg",
            },
            title: "Kawsbob Black",
            image_title: "KAWS, ‘Kawsbob Black’, 2011",
            artistNames: "KAWS",
            date: "2011",
            sale_message: "Sold",
            cultural_maker: null,
            artists: [
              {
                id: "artist-id",
                href: "/artist/kaws",
                name: "KAWS",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Dope! Gallery",
              href: "/dope-gallery",
              id: "partner-id",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
      ],
    },
  },
}
