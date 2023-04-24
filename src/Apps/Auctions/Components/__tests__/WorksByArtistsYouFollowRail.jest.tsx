import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fireEvent, screen } from "@testing-library/react"
import { useTracking as baseUseTracking } from "react-tracking"
import { WorksByArtistsYouFollowRailFragmentContainer } from "Apps/Auctions/Components/WorksByArtistsYouFollowRail"

jest.mock("react-tracking")
jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <WorksByArtistsYouFollowRailFragmentContainer viewer={props.viewer} />
    )
  },
  query: graphql`
    query WorksByArtistsYouFollowRail_Test_Query @relay_test_operation {
      viewer {
        ...WorksByArtistsYouFollowRail_viewer
      }
    }
  `,
})

describe("WorksByArtistsYouFollowRail", () => {
  const useTracking = baseUseTracking as jest.Mock
  const trackEvent = jest.fn()

  beforeAll(() => {
    useTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders 'No Works to Show' and no carousel with null data", () => {
    renderWithRelay({
      SaleArtworksConnection: () => ({
        edges: null,
      }),
    })

    expect(screen.getByText("No Works To Show")).toBeInTheDocument()
    expect(screen.queryByTestId("ShelfArtwork")).not.toBeInTheDocument()
  })

  it("renders 'No Works To Show' and no carousel when there are no followed artists", () => {
    renderWithRelay({
      SaleArtworksConnection: () => ({
        edges: [],
      }),
    })

    expect(screen.getByText("No Works To Show")).toBeInTheDocument()
    expect(screen.queryByTestId("ShelfArtwork")).not.toBeInTheDocument()
  })

  it("renders carousel", () => {
    renderWithRelay({
      SaleArtworksConnection: () => ({
        edges: [{ node: { sale: { isClosed: false } } }],
      }),
    })

    expect(screen.queryByText("No Works To Show")).not.toBeInTheDocument()
    expect(screen.queryByTestId("ShelfArtwork")).toBeInTheDocument()
  })

  it("tracks clicks", async () => {
    renderWithRelay({
      SaleArtworksConnection: () => ({
        edges: [{ node: { sale: { isClosed: false } } }],
      }),
    })
    const link = (await screen.findAllByRole("link"))[2]

    fireEvent(
      link,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    )

    expect(trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
      [
        {
          "action": "clickedArtworkGroup",
          "context_module": "worksByArtistsYouFollowRail",
          "context_page_owner_type": undefined,
          "destination_page_owner_id": "<Artwork-mock-id-1>",
          "destination_page_owner_slug": "<Artwork-mock-id-2>",
          "destination_page_owner_type": "artwork",
          "horizontal_slide_position": 0,
          "type": "thumbnail",
        },
      ]
    `)
  })
})
