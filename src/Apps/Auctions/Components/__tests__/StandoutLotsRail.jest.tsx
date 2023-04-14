import { graphql } from "react-relay"
import { fireEvent, screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useTracking as baseUseTracking } from "react-tracking"
import { StandoutLotsRailFragmentContainer } from "Apps/Auctions/Components/StandoutLotsRail"

jest.mock("react-tracking")
jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return <StandoutLotsRailFragmentContainer viewer={props.viewer} />
  },
  query: graphql`
    query StandoutLotsRail_Test_Query @relay_test_operation {
      viewer {
        ...StandoutLotsRail_viewer
      }
    }
  `,
})

describe("StandoutLotsRail", () => {
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
      FilterArtworksConnection: () => ({
        edges: null,
      }),
    })

    expect(
      screen.queryByText("Works that Artsy curators love")
    ).not.toBeInTheDocument()
    expect(screen.getByText("No Works To Show")).toBeInTheDocument()
    expect(screen.queryByTestId("ShelfArtwork")).not.toBeInTheDocument()
  })

  it("renders 'No Works To Show' and no carousel when there are no trending lots", () => {
    renderWithRelay({
      FilterArtworksConnection: () => ({
        edges: [],
      }),
    })

    expect(
      screen.queryByText("Works that Artsy Curators love")
    ).not.toBeInTheDocument()
    expect(screen.queryByText("No Works To Show")).toBeInTheDocument()
    expect(screen.queryByTestId("ShelfArtwork")).not.toBeInTheDocument()
  })

  it('renders "Works that Artsy curators love" and a carousel', () => {
    renderWithRelay({
      FilterArtworksConnection: () => ({
        edges: [{ node: { sale: { isClosed: false } } }],
      }),
    })
    expect(
      screen.getByText("Works that Artsy curators love")
    ).toBeInTheDocument()
    expect(screen.queryByText("No Works To Show")).not.toBeInTheDocument()
    expect(screen.queryByTestId("ShelfArtwork")).toBeInTheDocument()
  })

  it("tracks clicks", async () => {
    renderWithRelay({
      FilterArtworksConnection: () => ({
        edges: [{ node: { sale: { isClosed: false } } }],
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

    expect(trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
      [
        {
          "action": "clickedArtworkGroup",
          "context_module": "standoutLots",
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
