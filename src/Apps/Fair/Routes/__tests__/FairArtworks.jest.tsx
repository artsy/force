import { FairArtworksRefetchContainer } from "Apps/Fair/Routes/FairArtworks"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { FairArtworks_Query$rawResponse } from "__generated__/FairArtworks_Query.graphql"

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

describe("FairArtworks", () => {
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <MockBoot user={{ id: "percy-z" }}>
          <FairArtworksRefetchContainer {...props} />
        </MockBoot>
      )
    },
    query: graphql`
      query FairArtworks_Query($slug: String!)
        @raw_response_type
        @relay_test_operation {
        fair(id: $slug) {
          ...FairArtworks_fair
        }
      }
    `,
    variables: { slug: "miart-2020" },
  })

  it("renders correctly", async () => {
    const { wrapper } = await getWrapper({
      Fair: () => FAIR_ARTWORKS_FIXTURE.fair,
    })

    expect(wrapper.find("ArtworkFilterArtworkGrid").length).toBe(1)
    expect(wrapper.find("ArtworkGridItem").length).toBe(2)
  })

  it("includes the artist filter", async () => {
    const { wrapper } = await getWrapper({
      Fair: () => FAIR_ARTWORKS_FIXTURE.fair,
    })

    const artistFilter = wrapper.find("ArtistsFilter")
    expect(artistFilter.length).toBe(1)

    artistFilter.find("button").simulate("click")
    expect(artistFilter.find("Checkbox").at(0).text()).toMatch(
      "Artists You Follow"
    )
  })
})

const FAIR_ARTWORKS_FIXTURE: FairArtworks_Query$rawResponse = {
  fair: {
    id: "xxx",
    slug: "cool-fair",
    internalID: "bson-fair",
    filtered_artworks: {
      __isArtworkConnectionInterface: "FilterArtworksConnection",
      id: "filteredartworksabc123",
      counts: {
        followedArtists: 10,
        total: 10,
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
              internalID: "imageabc123",
              resized: {
                src: "",
                srcSet: "",
                width: 10,
                height: 200,
              },
              aspectRatio: 1.27,
              placeholder: "78.76427829698858%",
              url: "https://test.artsy.net/image",
              versions: [],
              blurhashDataURL: null,
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
            },
            sale: {
              is_auction: true,
              is_closed: false,
              id: "saleabc123",
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
              lotID: "lot-id",
            },
            sale_artwork: {
              lotID: "lot-id",
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
              extendedBiddingEndAt: null,
            },
            isSaved: false,
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
              internalID: "yyy123",
              resized: {
                src: "",
                srcSet: "",
                width: 10,
                height: 200,
              },
              aspectRatio: 1.43,
              placeholder: "69.82024597918638%",
              url: "https://test.artsy.net/image2",
              versions: [],
              blurhashDataURL: null,
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
            },
            sale: null,
            sale_artwork: null,
            saleArtwork: null,
            isSaved: false,
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
