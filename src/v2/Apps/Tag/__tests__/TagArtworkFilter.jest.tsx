import { MockBoot, renderRelayTree } from "v2/DevTools"
import React from "react"
import { TagArtworkFilterRefetchContainer } from "../Components/TagArtworkFilter"
import { graphql } from "react-relay"
import { TagArtworkFilter_QueryRawResponse } from "v2/__generated__/TagArtworkFilter_Query.graphql"
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

describe("TagArtworkFilter", () => {
  const trackEvent = jest.fn()

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  const getWrapper = async (
    response: TagArtworkFilter_QueryRawResponse = TAG_ARTWORK_FILTER
  ) => {
    return renderRelayTree({
      Component: ({ tag }) => {
        return (
          <MockBoot user={{ id: "percy-z" }}>
            <TagArtworkFilterRefetchContainer tag={tag} />
          </MockBoot>
        )
      },
      query: graphql`
        query TagArtworkFilter_Query($slug: String!) @raw_response_type {
          tag(id: $slug) {
            ...TagArtworkFilter_tag @arguments(shouldFetchCounts: true)
          }
        }
      `,
      variables: { slug: "tag" },
      mockData: response,
    })
  }

  it("renders correctly", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find("ArtworkFilterArtworkGrid").length).toBe(1)
    expect(wrapper.find("GridItem__ArtworkGridItem").length).toBe(2)
  })

  it("renders filters in correct order", async () => {
    const wrapper = await getWrapper()
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
        label: "Ways to buy",
        expanded: true,
      },
      {
        label: "Material",
      },
      {
        label: "Artist nationality or ethnicity",
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

const TAG_ARTWORK_FILTER: TagArtworkFilter_QueryRawResponse = {
  tag: {
    id: "tag-id",
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
        {
          slice: "PARTNER",
          counts: [
            {
              name: "Rago/Wright",
              value: "rago-slash-wright",
              count: 2,
            },
          ],
        },
        {
          slice: "LOCATION_CITY",
          counts: [
            {
              name: "New York, NY, USA",
              value: "New York, NY, USA",
              count: 10,
            },
          ],
        },
        {
          slice: "MEDIUM",
          counts: [
            {
              name: "Painting",
              value: "painting",
              count: 472023,
            },
          ],
        },
        {
          slice: "MATERIALS_TERMS",
          counts: [
            {
              name: "Canvas",
              value: "canvas",
              count: 17,
            },
          ],
        },
        {
          slice: "ARTIST_NATIONALITY",
          counts: [
            {
              name: "American",
              value: "American",
              count: 21,
            },
          ],
        },
      ],
    },
  },
}
