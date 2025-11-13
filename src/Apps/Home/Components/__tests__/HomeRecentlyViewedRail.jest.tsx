import { HomeRecentlyViewedRailFragmentContainer } from "Apps/Home/Components/HomeRecentlyViewedRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { fireEvent, screen } from "@testing-library/react"
import { graphql } from "react-relay"
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
      renderWithRelay({
        HomePage: () => ({
          artworkModule: {
            results: [
              {
                title: "Test Artist",
                href: "/test-href",
                internalID: "123",
                slug: "test-slug",
                collectorSignals: null,
              },
            ],
          },
        }),
      })

      fireEvent.click(screen.getByTestId("ShelfArtwork"))

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtworkGroup",
        context_module: "recentlyViewedRail",
        context_page_owner_type: "home",
        destination_page_owner_id: "123",
        destination_page_owner_slug: "test-slug",
        destination_page_owner_type: "artwork",
        type: "thumbnail",
        signal_label: "",
      })
    })
  })
})
