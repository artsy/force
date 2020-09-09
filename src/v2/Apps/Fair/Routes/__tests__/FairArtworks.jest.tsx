import { MockBoot, renderRelayTree } from "v2/DevTools"
import React from "react"
import { FairArtworksRefetchContainer } from "../FairArtworks"
import { graphql } from "react-relay"
import { FairArtworks_QueryRawResponse } from "v2/__generated__/FairArtworks_Query.graphql"

jest.unmock("react-relay")

describe("FairArtworks", () => {
  const getWrapper = async (
    response: FairArtworks_QueryRawResponse = FAIR_ARTWORKS_FIXTURE
  ) => {
    return renderRelayTree({
      Component: ({ fair }) => {
        return (
          <MockBoot>
            <FairArtworksRefetchContainer fair={fair} />
          </MockBoot>
        )
      },
      query: graphql`
        query FairArtworks_Query($slug: String!) @raw_response_type {
          fair(id: $slug) {
            ...FairArtworks_fair
          }
        }
      `,
      variables: { slug: "miart-2020" },
      mockData: response,
    })
  }

  it("renders correctly", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find("ArtworkFilterArtworkGrid").length).toBe(1)
    expect(wrapper.find("GridItem__ArtworkGridItem").length).toBe(2)
  })
})

const FAIR_ARTWORKS_FIXTURE: FairArtworks_QueryRawResponse = {
  fair: {
    id: "xxx",
    filtered_artworks: {
      id: "filteredartworksabc123",
      aggregations: [
        {
          slice: "INSTITUTION",
          counts: [],
        },
        {
          slice: "MEDIUM",
          counts: [
            {
              value: "sculpture",
              name: "Sculpture",
              count: 22222,
            },
          ],
        },
        {
          slice: "MAJOR_PERIOD",
          counts: [
            {
              value: "2020",
              name: "2020",
              count: 1,
            },
          ],
        },
        {
          slice: "GALLERY",
          counts: [
            {
              value: "important-gallery",
              name: "Important Gallery",
              count: 4,
            },
          ],
        },
      ],
      pageInfo: {
        hasNextPage: true,
        endCursor: "endCursor",
      },
      pageCursors: {
        around: [
          {
            cursor: "pageOneCursor",
            page: 1,
            isCurrent: true,
          },
          {
            cursor: "pageTwoCursor",
            page: 2,
            isCurrent: false,
          },
        ],
        first: null,
        last: null,
        previous: null,
      },
      edges: [
        {
          node: {
            id: "ggg123",
            slug: "yayoi-kusama-pumpkin-2222222222222222",
            href: "/artwork/yayoi-kusama-pumpkin-2222222222222222",
            internalID: "zzz123",
            image: {
              aspect_ratio: 1.27,
              placeholder: "78.76427829698858%",
              url: "https://test.artsy.net/image",
            },
            title: "Pumpkin",
            image_title: "Yayoi Kusama, ‘Pumpkin’, 2222",
            date: "2020",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "artistabc123",
                href: "/artist/yayoi-kusama",
                name: "Yayoi Kusama",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Important Auction House",
              href: "/auction/important-auction-house",
              id: "ahabc123",
              type: "Auction House",
            },
            sale: {
              is_auction: true,
              is_closed: false,
              id: "saleabc123",
              is_live_open: false,
              is_open: true,
              is_preview: false,
              display_timely_at: "live in 3d",
            },
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
            is_inquireable: true,
            is_saved: false,
            is_biddable: true,
          },
          id: "nodeidabc",
        },
        {
          node: {
            id: "abc123",
            slug: "yayoi-kusama-pumpkin-33333333333333333",
            href: "/artwork/yayoi-kusama-pumpkin-33333333333333333",
            internalID: "xxx123",
            image: {
              aspect_ratio: 1.43,
              placeholder: "69.82024597918638%",
              url: "https://test.artsy.net/image2",
            },
            title: "Pumpkin",
            image_title: "Yayoi Kusama, ‘Pumpkin’, 3333",
            date: "2020",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "artistabc123",
                href: "/artist/yayoi-kusama",
                name: "Yayoi Kusama",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Important Gallery",
              href: "/important-gallery",
              id: "galleryabc123",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
          id: "nodeid123",
        },
      ],
    },
  },
}
