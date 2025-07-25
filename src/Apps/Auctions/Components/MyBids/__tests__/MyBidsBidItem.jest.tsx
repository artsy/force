import { MyBidsBidItemFragmentContainer } from "Apps/Auctions/Components/MyBids/MyBidsBidItem"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen, fireEvent } from "@testing-library/react"
import { graphql } from "react-relay"
import { useTracking as baseUseTracking } from "react-tracking"

jest.mock("react-tracking")
jest.unmock("react-relay")

describe("MyBidsBidItem", () => {
  const useTracking = baseUseTracking as jest.Mock
  const trackEvent = jest.fn()

  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => {
      return (
        <MyBidsBidItemFragmentContainer
          saleArtwork={props.saleArtwork}
          horizontalSlidePosition={2}
        />
      )
    },
    query: graphql`
      query MyBidsBidItemTestQuery @relay_test_operation {
        saleArtwork(id: "foo") {
          ...MyBidsBidItem_saleArtwork
        }
      }
    `,
  })

  beforeAll(() => {
    useTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders correct components and data", () => {
    renderWithRelay({
      SaleArtwork: () => ({
        slug: "saleArtworkSlug",
        name: "saleArtworkName",
        formattedStartDateTime: "formattedStartDateTime",
        lotLabel: 1,
        isWatching: true,
        artwork: {
          artistNames: "artistNames",
          image: {
            cropped: {
              src: "artworkImageResizedSrc",
              srcSet: "artworkImageResizedSrcSet",
            },
          },
        },
        partner: {
          name: "partnerName",
        },
      }),
    })

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/artwork/saleArtworkSlug")

    const image = screen.getByRole("img")
    expect(image).toHaveAttribute("src", "artworkImageResizedSrc")
    expect(image).toHaveAttribute("srcset", "artworkImageResizedSrcSet")

    expect(screen.getByText("artistNames")).toBeInTheDocument()
    expect(screen.getByText("Lot 1")).toBeInTheDocument()
  })

  describe("component behavior", () => {
    describe("when watching", () => {
      it("shows highest bid amount", () => {
        renderWithRelay({
          SaleArtwork: () => ({
            isWatching: true,
            currentBid: {
              display: "currentBidDisplay",
            },
          }),
        })

        expect(screen.getByText("currentBidDisplay")).toBeInTheDocument()
      })

      it("shows estimate if no highest bid", () => {
        renderWithRelay({
          SaleArtwork: () => ({
            isWatching: true,
            estimate: "estimate",
            currentBid: {
              display: null,
            },
          }),
        })

        expect(screen.getByText("estimate")).toBeInTheDocument()
      })
    })

    describe("when not watching", () => {
      it("shows the current bid", () => {
        renderWithRelay({
          SaleArtwork: () => ({
            isWatching: false,
            currentBid: {
              display: "currentBidDisplay",
            },
          }),
        })

        expect(screen.getByText("currentBidDisplay")).toBeInTheDocument()
      })

      it("shows proper bid label when only one bid", () => {
        renderWithRelay({
          SaleArtwork: () => ({
            isWatching: false,
            lotState: {
              bidCount: 1,
            },
          }),
        })

        expect(screen.getByText("(1 bid)")).toBeInTheDocument()
      })

      it("shows proper bid label when multiple bids", () => {
        renderWithRelay({
          SaleArtwork: () => ({
            isWatching: false,
            lotState: {
              bidCount: 2,
            },
          }),
        })

        expect(screen.getByText("(2 bids)")).toBeInTheDocument()
      })
    })
  })

  it("tracks clicks", () => {
    renderWithRelay()

    const link = screen.getByRole("link")
    fireEvent.click(link)

    expect(trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
      [
        {
          "action": "clickedArtworkGroup",
          "context_module": "yourActiveBids",
          "context_page_owner_type": undefined,
          "destination_page_owner_id": "<SaleArtwork-mock-id-2>",
          "destination_page_owner_slug": "<SaleArtwork-mock-id-3>",
          "destination_page_owner_type": "artwork",
          "horizontal_slide_position": 2,
          "signal_bid_count": 42,
          "signal_lot_watcher_count": 42,
          "type": "thumbnail",
        },
      ]
    `)
  })
})
