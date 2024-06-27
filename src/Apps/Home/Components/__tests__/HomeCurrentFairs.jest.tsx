import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fireEvent, screen } from "@testing-library/react"
import { HomeCurrentFairsFragmentContainer } from "Apps/Home/Components/HomeCurrentFairs"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return <HomeCurrentFairsFragmentContainer viewer={props.viewer!} />
  },
  query: graphql`
    query HomeCurrentFairs_Test_Query @relay_test_operation {
      viewer {
        ...HomeCurrentFairs_viewer
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

describe("HomeCurrentFairs", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Viewer: () => ({
        fairs: [
          {
            name: "Test Fair",
            href: "/fair/test-href",
          },
        ],
      }),
    })

    expect(screen.getByText("Current Fairs & Events")).toBeInTheDocument()
    expect(screen.getByText("View All Fairs & Events")).toBeInTheDocument()
    expect(screen.getByText("Test Fair")).toBeInTheDocument()
    expect(screen.getAllByRole("link")[1]).toHaveAttribute(
      "href",
      "/fair/test-href"
    )
  })

  it("returns null when no data is received", () => {
    renderWithRelay({
      Viewer: () => ({
        fairs: null,
      }),
    })

    expect(screen.queryByText("Current Fairs & Events")).not.toBeInTheDocument()
  })

  describe("tracking", () => {
    it("tracks item clicks", () => {
      renderWithRelay()

      fireEvent.click(screen.getAllByRole("link")[1])

      expect(trackEvent).toBeCalledWith({
        action: "clickedFairGroup",
        context_module: "fairRail",
        context_page_owner_type: "home",
        destination_page_owner_id: "<Fair-mock-id-1>",
        destination_page_owner_slug: "<Fair-mock-id-2>",
        destination_page_owner_type: "fair",
        type: "thumbnail",
      })
    })

    it("tracks view all", () => {
      renderWithRelay()

      fireEvent.click(screen.getAllByRole("link")[0])

      expect(trackEvent).toBeCalledWith({
        action: "clickedFairGroup",
        context_module: "fairRail",
        context_page_owner_type: "home",
        destination_page_owner_type: "fairs",
        type: "viewAll",
      })
    })
  })
})
