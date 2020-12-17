import { MockBoot, renderRelayTree } from "v2/DevTools"
import React from "react"
import { FairArtworksRefetchContainer } from "../FairArtworks"
import { graphql } from "react-relay"
import { FairArtworks_QueryRawResponse } from "v2/__generated__/FairArtworks_Query.graphql"
import { useTracking } from "v2/Artsy/Analytics/useTracking"

jest.unmock("react-relay")
jest.mock("v2/Artsy/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: { query: {} },
    },
  }),
}))
jest.mock("v2/Artsy/Analytics/useTracking")

describe("FairArtworks", () => {
  const trackEvent = jest.fn()

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  const getWrapper = async (
    response: FairArtworks_QueryRawResponse = FAIR_ARTWORKS_FIXTURE
  ) => {
    return renderRelayTree({
      Component: ({ fair }) => {
        return (
          <MockBoot user={{ id: "percy-z" }}>
            <FairArtworksRefetchContainer fair={fair} />
          </MockBoot>
        )
      },
      mockData: response,
      query: graphql`
        query FairArtworks_Query($slug: String!) @raw_response_type {
          fair(id: $slug) {
            ...FairArtworks_fair @arguments(shouldFetchCounts: true)
          }
        }
      `,
      variables: { slug: "miart-2020" },
    })
  }

  it("renders correctly", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find("ArtworkFilterArtworkGrid").length).toBe(1)
    expect(wrapper.find("GridItem__ArtworkGridItem").length).toBe(2)
  })

  it("includes the artist filter", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find("ArtistsFilter").length).toBe(1)
    expect(wrapper.find("ArtistsFilter").text()).toMatch(
      "Artists I follow (10)"
    )
  })
})

const FAIR_ARTWORKS_FIXTURE: FairArtworks_QueryRawResponse = {
  fair: {
    filtered_artworks: {
      aggregations: [
        {
          counts: [],
          slice: "INSTITUTION",
        },
        {
          counts: [
            {
              count: 22222,
              name: "Sculpture",
              value: "sculpture",
            },
          ],
          slice: "MEDIUM",
        },
        {
          counts: [
            {
              count: 1,
              name: "2020",
              value: "2020",
            },
          ],
          slice: "MAJOR_PERIOD",
        },
        {
          counts: [
            {
              count: 4,
              name: "Important Gallery",
              value: "important-gallery",
            },
          ],
          slice: "GALLERY",
        },
        {
          counts: [
            {
              count: 4,
              name: "Catty Artist",
              value: "catty-artst",
            },
          ],
          slice: "ARTIST",
        },
      ],
      counts: {
        followedArtists: 10,
      },
      edges: [
        {
          id: "nodeidabc",
          node: {
            href: "/artwork/yayoi-kusama-pumpkin-2222222222222222",
            id: "ggg123",
            image: {
              aspect_ratio: 1.27,
              placeholder: "78.76427829698858%",
              url: "https://test.artsy.net/image",
            },
            image_title: "Yayoi Kusama, ‘Pumpkin’, 2222",
            slug: "yayoi-kusama-pumpkin-2222222222222222",
            date: "2020",
            internalID: "zzz123",
            cultural_maker: null,
            title: "Pumpkin",
            artists: [
              {
                href: "/artist/yayoi-kusama",
                id: "artistabc123",
                name: "Yayoi Kusama",
              },
            ],
            collecting_institution: null,
            sale_message: "Contact For Price",
            is_inquireable: true,
            partner: {
              href: "/auction/important-auction-house",
              id: "ahabc123",
              name: "Important Auction House",
              type: "Auction House",
            },
            is_biddable: true,
            sale: {
              is_auction: true,
              id: "saleabc123",
              is_closed: false,
              is_live_open: false,
              is_open: true,
              display_timely_at: "live in 3d",
              is_preview: false,
            },
            is_saved: false,
            sale_artwork: {
              counts: {
                bidder_positions: 0,
              },
              highest_bid: {
                display: null,
              },
              opening_bid: {
                display: "USD $2222",
              },
              id: "idabc123",
            },
          },
        },
        {
          id: "nodeid123",
          node: {
            href: "/artwork/yayoi-kusama-pumpkin-33333333333333333",
            id: "abc123",
            image: {
              aspect_ratio: 1.43,
              placeholder: "69.82024597918638%",
              url: "https://test.artsy.net/image2",
            },
            image_title: "Yayoi Kusama, ‘Pumpkin’, 3333",
            slug: "yayoi-kusama-pumpkin-33333333333333333",
            date: "2020",
            internalID: "xxx123",
            cultural_maker: null,
            title: "Pumpkin",
            artists: [
              {
                href: "/artist/yayoi-kusama",
                id: "artistabc123",
                name: "Yayoi Kusama",
              },
            ],
            collecting_institution: null,
            sale_message: "Contact For Price",
            is_inquireable: true,
            partner: {
              href: "/important-gallery",
              id: "galleryabc123",
              name: "Important Gallery",
              type: "Gallery",
            },
            is_biddable: false,
            sale: null,
            is_saved: false,
            sale_artwork: null,
          },
        },
      ],
      id: "filteredartworksabc123",
      pageCursors: {
        around: [
          {
            cursor: "pageOneCursor",
            isCurrent: true,
            page: 1,
          },
          {
            cursor: "pageTwoCursor",
            isCurrent: false,
            page: 2,
          },
        ],
        first: null,
        last: null,
        previous: null,
      },
      pageInfo: {
        endCursor: "endCursor",
        hasNextPage: true,
      },
    },
    id: "xxx",
    internalID: "bson-fair",
    slug: "cool-fair",
  },
}
