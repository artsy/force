import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fireEvent, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { HomeAuctionLotsForYouRailFragmentContainer } from "Apps/Home/Components/HomeAuctionLotsForYouRail"

jest.mock("react-tracking")
jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <HomeAuctionLotsForYouRailFragmentContainer
        artworksForUser={props.artworksForUser}
      />
    )
  },
  query: graphql`
    query HomeAuctionLotsForYouRail_Test_Query @relay_test_operation {
      artworksForUser(includeBackfill: true, first: 20) {
        ...HomeAuctionLotsForYouRail_artworksForUser
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

describe("HomeAuctionLotsForYouRail", () => {
  it("renders correctly", () => {
    renderWithRelay({
      ArtworkConnection: () => ({
        edges: [
          {
            node: {
              title: "Test Auction",
              href: "test-href",
            },
          },
        ],
      }),
    })

    expect(screen.getByText("Test Auction")).toBeInTheDocument()
    expect(screen.queryByTestId("ShelfArtwork")).toBeInTheDocument()
  })

  describe("tracking", () => {
    it("tracks artwork click", async () => {
      renderWithRelay({
        ArtworkConnection: () => ({
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
        context_module: "lotsForYouRail",
        context_page_owner_type: "home",
        destination_page_owner_id: "test-internal-id",
        destination_page_owner_slug: "test-href",
        destination_page_owner_type: "artwork",
        type: "thumbnail",
      })
    })
  })
})
