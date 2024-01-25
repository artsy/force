import { useTracking } from "react-tracking"
import { graphql } from "react-relay"
import { fireEvent, screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ArtworkSidebarFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebar"
import { DateTime } from "luxon"

jest.unmock("react-relay")

jest.mock("react-tracking")

jest.mock(
  "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarAuctionTimer",
  () => ({
    ArtworkSidebarAuctionTimerFragmentContainer: () => <div>AuctionTimer</div>,
  })
)

const ArtworkSidebar_TEST_QUERY = graphql`
  query ArtworkSidebar_Test_Query @relay_test_operation {
    artwork(id: "josef-albers-homage-to-the-square-85") {
      ...ArtworkSidebar_artwork
    }
  }
`

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtworkSidebarFragmentContainer,
  query: ArtworkSidebar_TEST_QUERY,
})

describe("ArtworkSidebarArtists", () => {
  const trackEvent = jest.fn()
  const mockTracking = useTracking as jest.Mock

  beforeAll(() => {
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("should display the create alert section", () => {
    it("renders the create alert section", () => {
      renderWithRelay({
        Artwork: () => ({
          isEligibleToCreateAlert: true,
        }),
      })

      expect(screen.queryByText(/Create Alert/i)).toBeInTheDocument()
      expect(
        screen.queryByText(/Get notifications for similar works/i)
      ).toBeInTheDocument()
    })

    it("for artworks that are on loan", () => {
      renderWithRelay({
        Artwork: () => ({
          isEligibleToCreateAlert: true,
          saleMessage: "On loan",
        }),
      })

      const button = screen.queryByText(/Create Alert/i)
      const description = screen.queryByText(
        /Get notifications for similar works/i
      )

      expect(button).toBeInTheDocument()
      expect(description).toBeInTheDocument()
    })

    it("for artworks that are on a permanent collection", () => {
      renderWithRelay({
        Artwork: () => ({
          isEligibleToCreateAlert: true,
          saleMessage: "Permanent collection",
        }),
      })

      const button = screen.queryByText(/Create Alert/i)
      const description = screen.queryByText(
        /Get notifications for similar works/i
      )

      expect(button).toBeInTheDocument()
      expect(description).toBeInTheDocument()
    })
  })

  describe("should not display the create alert section", () => {
    it("for bidding closed artworks if artwork is ineligible for alerts", () => {
      renderWithRelay({
        Artwork: () => ({
          isInAuction: true,
          isEligibleToCreateAlert: false,
        }),
        Sale: () => ({
          isClosed: true,
        }),
      })

      const button = screen.queryByText(/Create Alert/i)
      const description = screen.queryByText(
        /Get notifications for similar works/i
      )

      expect(button).not.toBeInTheDocument()
      expect(description).not.toBeInTheDocument()
    })

    it("if artwork is ineligible for alerts", () => {
      renderWithRelay({
        Artwork: () => ({
          isEligibleToCreateAlert: false,
        }),
      })

      const button = screen.queryByText(/Create Alert/i)
      const description = screen.queryByText(
        /Get notifications for similar works/i
      )

      expect(button).not.toBeInTheDocument()
      expect(description).not.toBeInTheDocument()
    })
  })

  describe("Artsy Guarantee section", () => {
    it("should be displayed when eligible for artsy guarantee", () => {
      renderWithRelay({
        Artwork: () => ({
          isEligibleForArtsyGuarantee: true,
        }),
      })

      expect(
        screen.queryByText(
          "Be covered by the Artsy Guarantee when you checkout with Artsy"
        )
      ).toBeInTheDocument()
    })

    it("should not be displayed when ineligible for artsy guarantee", () => {
      renderWithRelay({
        Artwork: () => ({
          isEligibleForArtsyGuarantee: false,
        }),
      })

      expect(
        screen.queryByText(
          "Be covered by the Artsy Guarantee when you checkout with Artsy"
        )
      ).not.toBeInTheDocument()
    })

    it("should track click to expand/collapse the Artsy Guarantee section", () => {
      renderWithRelay({
        Artwork: () => ({
          isEligibleForArtsyGuarantee: true,
        }),
      })

      const button = screen.getByText(
        "Be covered by the Artsy Guarantee when you checkout with Artsy"
      )

      fireEvent.click(button)

      expect(trackEvent).toHaveBeenCalledTimes(1)
      expect(trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
        [
          {
            "action": "toggledAccordion",
            "context_module": "artworkSidebar",
            "context_owner_type": "artwork",
            "expand": true,
            "subject": "Be covered by the Artsy Guarantee when you checkout with Artsy",
          },
        ]
      `)

      fireEvent.click(button)

      expect(trackEvent).toHaveBeenCalledTimes(2)
      expect(trackEvent.mock.calls[1]).toMatchInlineSnapshot(`
        [
          {
            "action": "toggledAccordion",
            "context_module": "artworkSidebar",
            "context_owner_type": "artwork",
            "expand": false,
            "subject": "Be covered by the Artsy Guarantee when you checkout with Artsy",
          },
        ]
      `)
    })
  })

  describe("Shipping and Taxes section", () => {
    it("should track click to expand/collapse the Shipping and Taxes section", () => {
      renderWithRelay({
        Artwork: () => ({
          isSold: false,
          isAcquireable: true,
        }),
      })

      const button = screen.getByText("Shipping and Taxes")

      fireEvent.click(button)

      expect(trackEvent).toHaveBeenCalledTimes(1)
      expect(trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
        [
          {
            "action": "toggledAccordion",
            "context_module": "artworkSidebar",
            "context_owner_type": "artwork",
            "expand": true,
            "subject": "Shipping and Taxes",
          },
        ]
      `)

      fireEvent.click(button)

      expect(trackEvent).toHaveBeenCalledTimes(2)
      expect(trackEvent.mock.calls[1]).toMatchInlineSnapshot(`
        [
          {
            "action": "toggledAccordion",
            "context_module": "artworkSidebar",
            "context_owner_type": "artwork",
            "expand": false,
            "subject": "Shipping and Taxes",
          },
        ]
      `)
    })
  })

  describe("Auction Timer", () => {
    it("should show if the artwork is in an auction", () => {
      renderWithRelay({
        Artwork: () => ({
          isInAuction: true,
        }),
        SaleArtwork: () => ({
          endAt: new Date(DateTime.local().toMillis() - 1000),
        }),
        Sale: () => ({
          isAuction: true,
          isClosed: false,
          endAt: new Date(DateTime.local().toMillis() - 10000),
        }),
      })

      expect(screen.queryByText("Bidding closed")).toBeInTheDocument()
      expect(screen.queryByText("AuctionTimer")).toBeInTheDocument()
    })

    it("should show if the artwork is in a timed sale", () => {
      renderWithRelay({
        Artwork: () => ({
          isInAuction: false,
        }),
        Sale: () => ({
          isAuction: false,
          isClosed: false,
          endAt: new Date(DateTime.local().toMillis() + 10000),
        }),
        SaleArtwork: () => ({
          endedAt: null,
        }),
      })

      expect(screen.queryByText("AuctionTimer")).toBeInTheDocument()
    })

    it("should not show if the artwork is in a timed sale that has ended", () => {
      renderWithRelay({
        Artwork: () => ({
          isInAuction: false,
        }),
        Sale: () => ({
          isAuction: false,
          isClosed: true,
          endAt: "2020-08-19T08:00:00+00:00",
        }),
      })

      expect(screen.queryByText("AuctionTimer")).not.toBeInTheDocument()
    })
  })
})
