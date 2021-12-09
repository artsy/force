import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeFeaturedMarketNewsFragmentContainer } from "../Components/HomeFeaturedMarketNews"
import { HomeFeaturedMarketNews_Test_Query } from "v2/__generated__/HomeFeaturedMarketNews_Test_Query.graphql"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")

const { getWrapper } = setupTestWrapper<HomeFeaturedMarketNews_Test_Query>({
  Component: HomeFeaturedMarketNewsFragmentContainer,
  query: graphql`
    query HomeFeaturedMarketNews_Test_Query @relay_test_operation {
      articles {
        ...HomeFeaturedMarketNews_articles
      }
    }
  `,
})

const trackEvent = jest.fn()

beforeEach(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
})

afterEach(() => {
  trackEvent.mockClear()
})

describe("HomeFeaturedMarketNews", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Article: () => ({
        href: "/article/example-article",
        title: "Example Article",
        publishedAt: "Jun 23, 2021",
      }),
    })

    expect(wrapper.text()).toContain("Market News")
    expect(wrapper.text()).toContain("Explore Editorial")
    expect(wrapper.html()).toContain("/article/example-article")
  })

  describe("tracking", () => {
    it("tracks item clicks", () => {
      const wrapper = getWrapper()
      wrapper.find("RouterLink").last().simulate("click")
      expect(trackEvent).toBeCalledWith({
        action: "clickedArticleGroup",
        context_module: "marketNews",
        context_page_owner_id: '<mock-value-for-field-"internalID">',
        context_page_owner_slug: '<mock-value-for-field-"slug">',
        context_page_owner_type: "home",
        destination_page_owner_type: "article",
        type: "thumbnail",
      })
    })

    it("tracks view all", () => {
      const wrapper = getWrapper()
      wrapper.find("RouterLink").first().simulate("click")
      expect(trackEvent).toBeCalledWith({
        action: "clickedArticleGroup",
        context_module: "marketNews",
        context_page_owner_type: "home",
        destination_page_owner_type: "articles",
        type: "viewAll",
      })
    })
  })
})
