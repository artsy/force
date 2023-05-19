import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fireEvent, screen } from "@testing-library/react"
import { useTracking as baseUseTracking } from "react-tracking"
import { TrendingLotsRailFragmentContainer } from "Apps/Auctions/Components/TrendingLotsRail"

jest.mock("react-tracking")
jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return <TrendingLotsRailFragmentContainer viewer={props.viewer} />
  },
  query: graphql`
    query TrendingLotsRail_Test_Query @relay_test_operation {
      viewer {
        ...TrendingLotsRail_viewer
      }
    }
  `,
})

describe("TrendingLotsRail", () => {
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

    expect(
      screen.queryByText("Works with the most bids today")
    ).not.toBeInTheDocument()
    expect(screen.getByText("No Works To Show")).toBeInTheDocument()
    expect(screen.queryByTestId("ShelfArtwork")).not.toBeInTheDocument()
  })

  it("renders 'No Works To Show' and no carousel when there are no trending lots", () => {
    renderWithRelay({
      SaleArtworksConnection: () => ({
        edges: [],
      }),
    })

    expect(
      screen.queryByText("Works with the most bids today")
    ).not.toBeInTheDocument()
    expect(screen.queryByText("No Works To Show")).toBeInTheDocument()
    expect(screen.queryByTestId("ShelfArtwork")).not.toBeInTheDocument()
  })

  it("renders the correct components", () => {
    renderWithRelay({
      SaleArtworksConnection: () => ({
        edges: [{ node: { sale: { isClosed: true } } }],
      }),
    })
    expect(
      screen.getByText("Works with the most bids today")
    ).toBeInTheDocument()
    expect(screen.queryByText("No Works To Show")).not.toBeInTheDocument()
    expect(screen.queryByTestId("ShelfArtwork")).toBeInTheDocument()
  })

  it("skips closed lots", () => {
    renderWithRelay({
      Boolean: () => true,
      SaleArtworksConnection: () => {
        return {
          edges: [{ node: { sale: { isClosed: true } } }],
        }
      },
    })

    expect(screen.queryByText("No Works To Show")).toBeInTheDocument()
  })

  it("tracks clicks", async () => {
    renderWithRelay({
      SaleArtworksConnection: () => {
        return {
          edges: [{ node: { sale: { isClosed: false } } }],
        }
      },
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
          "context_module": "trendingLots",
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
