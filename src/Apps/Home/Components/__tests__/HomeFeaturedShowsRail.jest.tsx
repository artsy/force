import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fireEvent, screen } from "@testing-library/react"
import { HomeFeaturedShowsRailFragmentContainer } from "Apps/Home/Components/HomeFeaturedShowsRail"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL({
  Component: HomeFeaturedShowsRailFragmentContainer,
  query: graphql`
    query HomeFeaturedShowsRail_Test_Query @relay_test_operation {
      orderedSet(id: "example") {
        ...HomeFeaturedShowsRail_orderedSet
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

describe("HomeFeaturedShowsRail", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Show: () => ({
        name: "Example Show",
        exhibitionPeriod: "June 9 – 25",
        href: "/show/partner-show",
      }),
      Partner: () => ({
        name: "Example Partner",
      }),
    })

    expect(screen.getByText("Featured Shows")).toBeInTheDocument()
    expect(screen.getByText("Explore All Shows")).toBeInTheDocument()
    expect(screen.getByText("Example Show")).toBeInTheDocument()
    expect(screen.getByText("Example Partner")).toBeInTheDocument()
    expect(screen.getByText("June 9 – 25 — Opening Soon")).toBeInTheDocument()
    expect(screen.getAllByRole("link")[2]).toHaveAttribute(
      "href",
      "/show/partner-show"
    )
  })

  describe("tracking", () => {
    it("tracks item clicks", () => {
      renderWithRelay()

      fireEvent.click(screen.getAllByRole("link")[2])

      expect(trackEvent).toBeCalledWith({
        action: "clickedShowGroup",
        context_module: "featuredShowsRail",
        context_page_owner_type: "home",
        destination_page_owner_id: "<Show-mock-id-1>",
        destination_page_owner_slug: "<Show-mock-id-2>",
        destination_page_owner_type: "show",
        type: "thumbnail",
      })
    })

    it("tracks view all", () => {
      renderWithRelay()
      fireEvent.click(screen.getAllByRole("link")[1])
      expect(trackEvent).toBeCalledWith({
        action: "clickedShowGroup",
        context_module: "featuredShowsRail",
        context_page_owner_type: "home",
        destination_page_owner_type: "shows",
        type: "viewAll",
      })
    })
  })
})
