import { FairArtworksRefetchContainer } from "Apps/Fair/Routes/FairArtworks"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type {
  FairArtworksQuery,
  FairArtworksQuery$rawResponse,
} from "__generated__/FairArtworksQuery.graphql"
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

describe("FairArtworks", () => {
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  const { renderWithRelay } = setupTestWrapperTL<FairArtworksQuery>({
    Component: ({ fair }) => (
      <MockBoot user={{ id: "percy-z" }}>
        <FairArtworksRefetchContainer fair={fair!} />
      </MockBoot>
    ),
    query: graphql`
      query FairArtworksQuery($slug: String!)
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
    const { container } = renderWithRelay({
      Fair: () => FAIR_ARTWORKS_FIXTURE.fair,
    })

    expect(
      container.querySelectorAll('[data-test="artworkGrid"]'),
    ).toHaveLength(1)
    expect(
      container.querySelectorAll('[data-testid="artwork-link"]'),
    ).toHaveLength(2)
  })

  it("includes the artist filter", async () => {
    renderWithRelay({
      Fair: () => FAIR_ARTWORKS_FIXTURE.fair,
    })

    expect(screen.getByText("Artists")).toBeInTheDocument()
  })
})

const FAIR_ARTWORKS_FIXTURE: FairArtworksQuery$rawResponse = {
  fair: {
    id: "xxx",
    slug: "cool-fair",
    internalID: "bson-fair",
    featuredKeywords: ["cats", "dogs"],
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
          immersiveArtworkNode: {
            formattedMetadata: "Yayoi Kusama, 'Pumpkin', 2222",
            id: "ggg123",
            image: {
              aspectRatio: 1.27,
              blurhash: null,
              url: "https://test.artsy.net/image",
            },
            slug: "yayoi-kusama-pumpkin-2222222222222222",
            internalID: "yyy123",
          },
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
            },
            title: "Pumpkin",
            image_title: "Yayoi Kusama, 'Pumpkin', 2222",
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
              isOpen: true,
              is_closed: false,
              id: "saleabc123",
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
            attributionClass: null,
            mediumType: null,
          },
          id: "nodeidabc",
        },
        {
          immersiveArtworkNode: {
            formattedMetadata: "Yayoi Kusama, 'Pumpkin', 3333",
            id: "abc123",
            image: {
              aspectRatio: 1.43,
              blurhash: null,
              url: "https://test.artsy.net/image2",
            },
            slug: "yayoi-kusama-pumpkin-33333333333333333",
            internalID: "xxx123",
          },
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
            },
            title: "Pumpkin",
            image_title: "Yayoi Kusama, 'Pumpkin', 3333",
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
