import { MockBoot, renderRelayTree } from "v2/DevTools"
import React from "react"
import { GeneArtworkFilterRefetchContainer } from "../GeneArtworkFilter"
import { graphql } from "react-relay"
import { GeneArtworkFilter_QueryRawResponse } from "v2/__generated__/GeneArtworkFilter_Query.graphql"
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

describe("GeneArtworkFilter", () => {
  const trackEvent = jest.fn()

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  const getWrapper = async (
    response: GeneArtworkFilter_QueryRawResponse = GENE_ARTWORK_FILTER
  ) => {
    return renderRelayTree({
      Component: ({ gene }) => {
        return (
          <MockBoot user={{ id: "percy-z" }}>
            <GeneArtworkFilterRefetchContainer gene={gene} />
          </MockBoot>
        )
      },
      query: graphql`
        query GeneArtworkFilter_Query($slug: String!) @raw_response_type {
          gene(id: $slug) {
            ...GeneArtworkFilter_gene @arguments(shouldFetchCounts: true)
          }
        }
      `,
      variables: { slug: "representations-of-architecture" },
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
    const ArtistFilterWrapper = wrapper.find("ArtistsFilter")

    expect(ArtistFilterWrapper.length).toBe(1)

    ArtistFilterWrapper.find("ChevronIcon").simulate("click")

    expect(ArtistFilterWrapper.text()).toMatch("Artists I follow (15)")
  })

  it("includes the medium filter", async () => {
    const wrapper = await getWrapper()

    expect(wrapper.find("MediumFilter").length).toBe(1)
  })

  it("includes the price range filter", async () => {
    const wrapper = await getWrapper()

    expect(wrapper.find("PriceRangeFilter").length).toBe(1)
  })

  it("includes the rarity filter", async () => {
    const wrapper = await getWrapper()

    expect(wrapper.find("AttributionClassFilter").length).toBe(1)
  })

  it("includes the size filter", async () => {
    const wrapper = await getWrapper()

    expect(wrapper.find("SizeFilter").length).toBe(1)
  })

  it("includes the ways to buy filter", async () => {
    const wrapper = await getWrapper()

    expect(wrapper.find("WaysToBuyFilter").length).toBe(1)
  })

  it("includes the time period filter", async () => {
    const wrapper = await getWrapper()

    expect(wrapper.find("TimePeriodFilter").length).toBe(1)
  })

  it("includes the color filter", async () => {
    const wrapper = await getWrapper()

    expect(wrapper.find("ColorFilter").length).toBe(1)
  })
})

const GENE_ARTWORK_FILTER: GeneArtworkFilter_QueryRawResponse = {
  gene: {
    id: "gene-id",
    slug: "representations-of-architecture",
    internalID: "4d90d193dcdd5f44a5000082",
    filtered_artworks: {
      counts: {
        followedArtists: 15,
      },
      id: "some-unique-id",
      pageInfo: {
        hasNextPage: true,
        endCursor: "endCursor",
      },
      pageCursors: {
        around: [
          {
            cursor: "pageCursorsOne",
            page: 1,
            isCurrent: true,
          },
          {
            cursor: "pageCursorsTwo",
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
          id: "edge-id-one",
          node: {
            id: "edge-one",
            slug: "edge-slug-one",
            href: "/artwork/edge-href-one",
            internalID: "edge-internal-id-one",
            image: {
              aspect_ratio: 1,
              placeholder: "100.1027397260274%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/eFuQAUcV2SBmcL-sRkSI5w/large.jpg",
            },
            title: "EL SOL NO ES PARA TODOS",
            image_title: "Antonio Seguí, 'EL SOL NO ES PARA TODOS', 2003",
            artistNames: "Antonio Seguí",
            date: "2003",
            sale_message: "$85,000",
            cultural_maker: null,
            artists: [
              {
                id: "author-one-id",
                href: "/artist/antonio-segui",
                name: "Antonio Seguí",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Gallery Art",
              href: "/gallery-art",
              id: "edge-partner-id",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge-id-two",
          node: {
            id: "edge-two",
            slug: "edge-slug-two",
            href: "/artwork/edge-href-one",
            internalID: "edge-internal-id-one",
            image: {
              aspect_ratio: 0.75,
              placeholder: "133.31702544031313%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/KkmXba7qtNYh2AiMY3O2Yw/large.jpg",
            },
            title: "One more sleep",
            image_title: "Yves Scherer, 'One more sleep', 2020",
            artistNames: "Yves Scherer",
            date: "2020",
            sale_message: "$20,000",
            cultural_maker: null,
            artists: [
              {
                id: "author-two-id",
                href: "/artist/yves-scherer",
                name: "Yves Scherer",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Cassina Projects",
              href: "/cassina-projects",
              id: "UGFydG5lcjo1YTY2MWQzOGEwOWE2NzE3YzllODkzMjM=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
      ],
    },
    sidebarAggregations: {
      id: "aggregation-id",
      aggregations: [
        {
          slice: "ARTIST",
          counts: [
            {
              count: 483,
              name: "Massimo Listri",
              value: "massimo-listri",
            },
          ],
        },
      ],
    },
  },
}
