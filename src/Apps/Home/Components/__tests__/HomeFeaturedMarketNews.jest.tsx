import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fireEvent, screen } from "@testing-library/react"
import { HomeFeaturedMarketNewsFragmentContainer } from "Apps/Home/Components/HomeFeaturedMarketNews"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL({
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

beforeAll(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
})

afterEach(() => {
  trackEvent.mockClear()
})

describe("HomeFeaturedMarketNews", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Article: () => ({
        href: "/article/example-article",
        title: "Example Article",
        publishedAt: "Jun 23, 2021",
      }),
    })

    expect(screen.getByText("Artsy Editorial")).toBeInTheDocument()
    expect(screen.getByText("Explore Editorial")).toBeInTheDocument()
    expect(screen.getAllByRole("link")[1]).toHaveAttribute(
      "href",
      "/article/example-article"
    )
  })

  describe("tracking", () => {
    it("tracks item clicks", () => {
      renderWithRelay()

      fireEvent.click(screen.getAllByRole("link")[1])

      expect(trackEvent).toBeCalledWith({
        action: "clickedArticleGroup",
        context_module: "marketNews",
        context_page_owner_id: "<Article-mock-id-1>",
        context_page_owner_slug: '<mock-value-for-field-"slug">',
        context_page_owner_type: "home",
        destination_page_owner_type: "article",
        type: "thumbnail",
      })
    })

    it("tracks view all", () => {
      renderWithRelay()

      fireEvent.click(screen.getAllByRole("link")[0])

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
