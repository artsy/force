import { graphql } from "react-relay"
import { fireEvent, screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { HomeAuctionLotsRailFragmentContainer } from "Apps/Home/Components/HomeAuctionLotsRail"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return <HomeAuctionLotsRailFragmentContainer viewer={props.viewer!} />
  },
  query: graphql`
    query HomeAuctionLotsRail_Test_Query @relay_test_operation {
      viewer {
        ...HomeAuctionLotsRail_viewer
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

describe("HomeAuctionLotsRail", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Viewer: () => ({
        artworksConnection: {
          edges: [
            {
              node: {
                title: "Test Auction",
                href: "test-href",
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("Test Auction")).toBeInTheDocument()
    expect(screen.queryByTestId("ShelfArtwork")).toBeInTheDocument()
  })

  describe("tracking", () => {
    it("tracks artwork click", async () => {
      renderWithRelay({
        Viewer: () => ({
          artworksConnection: {
            edges: [
              {
                node: {
                  internalID: "test-internal-id",
                  title: "Test Auction",
                  slug: "test-href",
                  href: "test-href",
                },
              },
            ],
          },
        }),
      })

      const link = (await screen.findAllByRole("link"))[0]

      fireEvent(
        link,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      )

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtworkGroup",
        context_module: "topAuctionLotsRail",
        context_page_owner_type: "home",
        destination_page_owner_id: "test-internal-id",
        destination_page_owner_slug: "test-href",
        destination_page_owner_type: "artwork",
        type: "thumbnail",
      })
    })
  })
})
