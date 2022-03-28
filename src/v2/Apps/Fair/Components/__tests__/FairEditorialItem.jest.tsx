import { graphql } from "relay-runtime"
import { useTracking as baseUseTracking } from "react-tracking"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { FairEditorialItemFragmentContainer } from "../FairEditorial/FairEditorialItem"
import { AnalyticsContextProvider } from "v2/System/Analytics/AnalyticsContext"
import { OwnerType } from "@artsy/cohesion"

jest.mock("react-tracking")
jest.unmock("react-relay")

describe("FairEditorialItem", () => {
  const useTracking = baseUseTracking as jest.Mock
  const trackEvent = jest.fn()

  let wrapper

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <AnalyticsContextProvider
          value={{
            contextPageOwnerId: "example-article-id",
            contextPageOwnerSlug: "example-article-slug",
            contextPageOwnerType: OwnerType.article,
          }}
        >
          <FairEditorialItemFragmentContainer
            article={props.article}
            size="large"
          />
        </AnalyticsContextProvider>
      )
    },
    query: graphql`
      query FairEditorialItem_Test_Query @relay_test_operation {
        article(id: "test") {
          ...FairEditorialItem_article
        }
      }
    `,
  })

  beforeEach(() => {
    wrapper = getWrapper({
      Article: () => ({
        internalID: "test-id",
        slug: "test slug",
        title: "Test Title",
        href: "/test",
        publishedAt: "May 25, 2021",
        thumbnailImage: {
          large: {
            width: 320,
            height: 220,
            src: "articleImageSrc",
            srcSet: "articleImageSrcSet",
          },
        },
      }),
    })

    useTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders 2 links with proper href", () => {
    expect(wrapper.find("RouterLink").length).toBe(2)
    for (let i = 0; i < 2; i++) {
      expect(wrapper.find("RouterLink").at(i).props().to).toBe("/test")
    }
  })

  it("renders image with proper props", () => {
    expect(wrapper.find("Image")).toBeDefined()
    expect(wrapper.find("Image").props().src).toEqual("articleImageSrc")
    expect(wrapper.find("Image").props().srcSet).toEqual("articleImageSrcSet")
  })

  it("contains correct text", () => {
    const text = wrapper.text()
    expect(text).toContain("Test Title")
    expect(text).toContain("May 25, 2021")
  })

  it("tracks clicks", () => {
    wrapper.find("RouterLink").first().simulate("click")

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedArticleGroup",
      context_module: "relatedArticles",
      context_page_owner_type: "article",
      context_page_owner_id: "example-article-id",
      context_page_owner_slug: "example-article-slug",
      destination_page_owner_id: "test-id",
      destination_page_owner_slug: "test slug",
      destination_page_owner_type: "article",
      type: "thumbnail",
    })

    wrapper.find("RouterLink").first().simulate("click")
    expect(trackEvent).toHaveBeenCalledTimes(2)
  })
})
