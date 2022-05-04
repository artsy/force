import { MockBoot, renderRelayTree } from "v2/DevTools"
import { FairArtworksRefetchContainer } from "../FairArtworks"
import { graphql } from "react-relay"
import { FairArtworks_QueryRawResponse } from "v2/__generated__/FairArtworks_Query.graphql"
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
  __internal__useMatchMedia: () => ({}),
}))

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
      query: graphql`
        query FairArtworks_Query($slug: String!)
          @raw_response_type
          @relay_test_operation {
          fair(id: $slug) {
            ...FairArtworks_fair @arguments(shouldFetchCounts: true)
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
    expect(wrapper.find("ArtworkGridItem").length).toBe(2)
  })

  it("includes the artist filter", async () => {
    const wrapper = await getWrapper()
    const artistFilter = wrapper.find("ArtistsFilter")
    expect(artistFilter.length).toBe(1)
    artistFilter.find("ChevronIcon").simulate("click")
    expect(artistFilter.find("Checkbox").at(0).text()).toMatch(
      "Artists I follow (10)"
    )
  })
})

const FAIR_ARTWORKS_FIXTURE: FairArtworks_QueryRawResponse = {
  fair: {
    id: "xxx",
    slug: "cool-fair",
    internalID: "bson-fair",
    filtered_artworks: {
      __isArtworkConnectionInterface: "FilterArtworksConnection",
      id: "filteredartworksabc123",
      counts: {
        followedArtists: 10,
      },
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
              resized: {
                src: "",
                srcSet: "",
                width: 10,
                height: 200,
              },
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
            artistNames: "Yayoi Kusama",
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
              cascadingEndTimeIntervalMinutes: null,
              extendedBiddingIntervalMinutes: null,
              extendedBiddingPeriodMinutes: null,
              startAt: "2022-03-11T12:33:37.000Z",
              endAt: "2022-03-12T12:33:37.000Z",
            },
            saleArtwork: {
              id: "saleArtworkabc123",
              endAt: "2022-03-12T12:33:37.000Z",
              extendedBiddingEndAt: null,
            },
            sale_artwork: {
              lotLabel: "0",
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
              endAt: "2022-03-12T12:33:37.000Z",
              formattedEndDateTime: "Mar 12 • 12:33pm GMT",
            },
            is_inquireable: true,
            is_saved: false,
            is_biddable: true,
            attributionClass: null,
            mediumType: null,
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
              resized: {
                src: "",
                srcSet: "",
                width: 10,
                height: 200,
              },
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
            artistNames: "Yayoi Kusama",
            collecting_institution: null,
            partner: {
              name: "Important Gallery",
              href: "/important-gallery",
              id: "galleryabc123",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            saleArtwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
            attributionClass: null,
            mediumType: null,
          },
          id: "nodeid123",
        },
      ],
    },
    sidebarAggregations: {
      id: "sidebar-id",
      aggregations: [
        {
          slice: "ARTIST",
          counts: [
            {
              count: 100,
              value: "cats",
              name: "Cats",
            },
          ],
        },
      ],
    },
  },
}
