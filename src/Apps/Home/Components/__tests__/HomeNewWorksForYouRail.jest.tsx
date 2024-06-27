import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fireEvent, screen } from "@testing-library/react"
import { HomeNewWorksForYouRailFragmentContainer } from "Apps/Home/Components/HomeNewWorksForYouRail"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <HomeNewWorksForYouRailFragmentContainer
        artworksForUser={props.artworksForUser!}
      />
    )
  },
  query: graphql`
    query HomeNewWorksForYouRail_Test_Query @relay_test_operation {
      artworksForUser(includeBackfill: true, first: 20) {
        ...HomeNewWorksForYouRail_artworksForUser
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

describe("HomeNewWorksForYouRail", () => {
  it("renders correctly", () => {
    renderWithRelay({
      ArtworkConnection: () => ({
        edges: [
          {
            node: {
              title: "Test Artist",
              href: "/test-href",
            },
          },
        ],
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
        context_module: "newWorksForYouRail",
        context_page_owner_type: "home",
        destination_page_owner_id: "<Artwork-mock-id-1>",
        destination_page_owner_slug: "<Artwork-mock-id-2>",
        destination_page_owner_type: "artwork",
        type: "thumbnail",
      })
    })
  })
})
