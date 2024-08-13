import { graphql } from "react-relay"
import { fireEvent, screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { HomeRecentlyViewedRailFragmentContainer } from "Apps/Home/Components/HomeRecentlyViewedRail"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <HomeRecentlyViewedRailFragmentContainer homePage={props.homePage!} />
    )
  },
  query: graphql`
    query HomeRecentlyViewedRail_Test_Query {
      homePage {
        ...HomeRecentlyViewedRail_homePage
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

describe("HomeRecentlyViewedRail", () => {
  it("renders correctly", () => {
    renderWithRelay({
      HomePage: () => ({
        artworkModule: {
          results: [
            {
              title: "Test Artist",
              href: "/test-href",
            },
          ],
        },
      }),
    })

    expect(screen.getByText("Test Artist")).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute("href", "/test-href")
  })

  describe("tracking", () => {
    it("tracks item clicks", () => {
      renderWithRelay()
      fireEvent.click(screen.getByTestId("ShelfArtwork"))
      expect(trackEvent).toBeCalledWith({
        action: "clickedArtworkGroup",
        context_module: "recentlyViewedRail",
        context_page_owner_type: "home",
        destination_page_owner_id: '<mock-value-for-field-"internalID">',
        destination_page_owner_slug: '<mock-value-for-field-"slug">',
        destination_page_owner_type: "artwork",
        type: "thumbnail",
      })
    })
  })
})
