import { FairCollectionFragmentContainer } from "Apps/Fair/Components/FairCollections/FairCollection"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"
import { fireEvent, screen } from "@testing-library/react"
import type { FairCollectionQuery } from "__generated__/FairCollectionQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

describe("FairCollection", () => {
  let trackEvent

  const { renderWithRelay } = setupTestWrapperTL<FairCollectionQuery>({
    Component: ({ marketingCollection: collection }) => {
      return (
        <AnalyticsCombinedContextProvider
          contextPageOwnerId="abc1234"
          path="/fair/miart-2020"
        >
          <FairCollectionFragmentContainer
            collection={collection!}
            carouselIndex={2}
          />
        </AnalyticsCombinedContextProvider>
      )
    },
    query: graphql`
      query FairCollectionQuery($slug: String!)
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
  })

  beforeAll(() => {
    trackEvent = jest.fn()
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders correctly", async () => {
    const { container } = renderWithRelay({
      MarketingCollection: () => FAIR_COLLECTION_FIXTURE.marketingCollection,
    })

    expect(screen.getByText("Contemporary Street Art")).toBeInTheDocument()
    expect(screen.getByText("10 works")).toBeInTheDocument()
    expect(container.querySelectorAll("img")).toHaveLength(3)
    expect(container.innerHTML).toContain("first.jpg")
    expect(container.innerHTML).toContain("second.jpg")
    expect(container.innerHTML).toContain("third.jpg")
  })

  it("renders despite missing images", async () => {
    const { container } = renderWithRelay({
      MarketingCollection: () => ({
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
      }),
    })

    expect(screen.getByText("Contemporary Street Art")).toBeInTheDocument()
    expect(screen.getByText("10 works")).toBeInTheDocument()
    expect(container.querySelectorAll("img")).toHaveLength(2)
    expect(container.innerHTML).toContain("first.jpg")
    expect(container.innerHTML).toContain("second.jpg")
    expect(container.innerHTML).not.toContain("third.jpg")
  })

  it("tracks clicks", async () => {
    const { container } = renderWithRelay({
      MarketingCollection: () => FAIR_COLLECTION_FIXTURE.marketingCollection,
    })

    const link = container.querySelector("a")
    expect(link).toBeInTheDocument()

    if (link) {
      fireEvent.click(link)
    }

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

const FAIR_COLLECTION_FIXTURE = {
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
