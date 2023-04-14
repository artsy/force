import { graphql } from "react-relay"
import { fireEvent, screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { AuctionArtworksRailFragmentContainer } from "Apps/Auctions/Components/AuctionArtworksRail"
import { useTracking as baseUseTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <AuctionArtworksRailFragmentContainer
        sale={props.sale}
        tabType="current"
      />
    )
  },
  query: graphql`
    query AuctionArtworksRail_Test_Query @relay_test_operation {
      sale(id: "xxx") {
        ...AuctionArtworksRail_sale
      }
    }
  `,
})

describe("AuctionArtworksRail", () => {
  const useTracking = baseUseTracking as jest.Mock
  const trackEvent = jest.fn()

  beforeAll(() => {
    useTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders correct components and data", () => {
    renderWithRelay({
      Sale: () => ({
        internalID: "testid123",
        href: "/auction/test-href",
        name: "Test Href",
        formattedStartDateTime: "Ends Apr 10 at 8:27pm UTC",
      }),
    })

    expect(screen.getByText("Test Href")).toBeInTheDocument()
    expect(screen.getByText("Ends Apr 10 at 8:27pm UTC")).toBeInTheDocument()
    expect(screen.queryByTestId("ShelfArtwork")).toBeInTheDocument()
  })

  it("tracks clicks", async () => {
    renderWithRelay({
      Sale: () => ({
        internalID: "sale-id",
        slug: "sale-slug",
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
          "context_module": "currentAuctions",
          "context_page_owner_type": undefined,
          "destination_page_owner_id": "sale-id",
          "destination_page_owner_slug": "sale-slug",
          "destination_page_owner_type": "sale",
          "type": "viewAll",
        },
      ]
    `)
  })
})
