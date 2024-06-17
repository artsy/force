import { renderRelayTree } from "DevTools/renderRelayTree"
import { graphql } from "react-relay"
import { FairCollectionFragmentContainer } from "Apps/Fair/Components/FairCollections/FairCollection"
import { FairCollection_Query$rawResponse } from "__generated__/FairCollection_Query.graphql"
import { useTracking } from "react-tracking"
import { RouterLink } from "System/Components/RouterLink"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"

jest.unmock("react-relay")
jest.mock("react-tracking")

describe("FairCollection", () => {
  let trackEvent

  const getWrapper = async (
    response: FairCollection_Query$rawResponse = FAIR_COLLECTION_FIXTURE
  ) => {
    return renderRelayTree({
      Component: ({ marketingCollection: collection }) => {
        return (
          <AnalyticsCombinedContextProvider
            contextPageOwnerId="abc1234"
            path="/fair/miart-2020"
          >
            <FairCollectionFragmentContainer
              collection={collection}
              carouselIndex={2}
            />
          </AnalyticsCombinedContextProvider>
        )
      },
      query: graphql`
        query FairCollection_Query($slug: String!)
          @raw_response_type
          @relay_test_operation {
          marketingCollection(slug: $slug) {
            ...FairCollection_collection
          }
        }
      `,
      variables: {
        slug: "xxx",
      },
      mockData: response,
    })
  }

  beforeAll(() => {
    trackEvent = jest.fn()
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders correctly", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()
    expect(wrapper.text()).toContain("Contemporary Street Art")
    expect(wrapper.text()).toContain("10 works")
    expect(wrapper.find("img").length).toBe(3)
    expect(html).toContain("first.jpg")
    expect(html).toContain("second.jpg")
    expect(html).toContain("third.jpg")
  })

  it("renders despite missing images", async () => {
    const wrapper = await getWrapper({
      marketingCollection: {
        id: "xxx",
        slug: "street-art-now",
        title: "Contemporary Street Art",
        artworks: {
          id: "xxx1",
          counts: {
            total: 10,
          },
          edges: [
            {
              node: {
                id: "xxx2",
                image: {
                  url: "https://example.com/first.jpg",
                },
              },
            },
            {
              node: {
                id: "xxx3",
                image: {
                  url: "https://example.com/second.jpg",
                },
              },
            },
            {
              node: {
                id: "xxx4",
                // Artwork missing image
                image: null,
              },
            },
          ],
        },
      },
    })

    const html = wrapper.html()

    expect(wrapper.text()).toContain("Contemporary Street Art")
    expect(wrapper.text()).toContain("10 works")
    expect(wrapper.find("img").length).toBe(2)
    expect(html).toContain("first.jpg")
    expect(html).toContain("second.jpg")
    expect(html).not.toContain("third.jpg")
  })

  it("tracks clicks", async () => {
    const wrapper = await getWrapper()
    wrapper.find(RouterLink).simulate("click")

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedCollectionGroup",
      context_module: "curatedHighlightsRail",
      context_page_owner_id: "abc1234",
      context_page_owner_slug: "miart-2020",
      context_page_owner_type: "fair",
      destination_page_owner_id: "xxx",
      destination_page_owner_slug: "street-art-now",
      destination_page_owner_type: "collection",
      horizontal_slide_position: 2,
      type: "thumbnail",
    })
  })
})

const FAIR_COLLECTION_FIXTURE: FairCollection_Query$rawResponse = {
  marketingCollection: {
    id: "xxx",
    slug: "street-art-now",
    title: "Contemporary Street Art",
    artworks: {
      id: "xxx1",
      counts: {
        total: 10,
      },
      edges: [
        {
          node: {
            id: "xxx2",
            image: {
              url: "https://example.com/first.jpg",
            },
          },
        },
        {
          node: {
            id: "xxx3",
            image: {
              url: "https://example.com/second.jpg",
            },
          },
        },
        {
          node: {
            id: "xxx4",
            image: {
              url: "https://example.com/third.jpg",
            },
          },
        },
      ],
    },
  },
}
