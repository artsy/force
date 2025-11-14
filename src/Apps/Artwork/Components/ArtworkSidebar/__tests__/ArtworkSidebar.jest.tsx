import { fireEvent, screen } from "@testing-library/react"
import { ArtworkSidebarFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebar"
import { ArtsyShippingEstimate } from "Components/ArtsyShippingEstimate"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { DateTime } from "luxon"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")

jest.mock("react-tracking")

const MockArtsyShippingEstimate = ArtsyShippingEstimate as jest.Mock
jest.mock("Components/ArtsyShippingEstimate", () => ({
  ArtsyShippingEstimate: jest.fn(() => <div>ArtsyShippingEstimate</div>),
}))

jest.mock(
  "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarAuctionTimer",
  () => ({
    ArtworkSidebarAuctionTimerFragmentContainer: () => <div>AuctionTimer</div>,
  }),
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
        screen.queryByText(/Get notifications for similar works/i),
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
        /Get notifications for similar works/i,
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
        /Get notifications for similar works/i,
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
        /Get notifications for similar works/i,
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
        /Get notifications for similar works/i,
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
          "Be covered by the Artsy Guarantee when you check out with Artsy",
        ),
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
          "Be covered by the Artsy Guarantee when you check out with Artsy",
        ),
      ).not.toBeInTheDocument()
    })

    it("should track click to expand/collapse the Artsy Guarantee section", () => {
      renderWithRelay({
        Artwork: () => ({
          isEligibleForArtsyGuarantee: true,
        }),
      })

      const button = screen.getByText(
        "Be covered by the Artsy Guarantee when you check out with Artsy",
      )

      fireEvent.click(button)

      expect(trackEvent).toHaveBeenCalledTimes(1)
      expect(trackEvent.mock.calls[0]).toEqual([
        {
          action: "toggledAccordion",
          context_module: "artworkSidebar",
          context_owner_type: "artwork",
          expand: true,
          subject:
            "Be covered by the Artsy Guarantee when you check out with Artsy",
        },
      ])

      fireEvent.click(button)

      expect(trackEvent).toHaveBeenCalledTimes(2)
      expect(trackEvent.mock.calls[1]).toEqual([
        {
          action: "toggledAccordion",
          context_module: "artworkSidebar",
          context_owner_type: "artwork",
          expand: false,
          subject:
            "Be covered by the Artsy Guarantee when you check out with Artsy",
        },
      ])
    })
  })

  describe("Shipping and taxes section", () => {
    describe("Shipping estimate feature flag enabled", () => {
      it("renders ArtsyShippingEstimate if work is arta shipped globablly", () => {
        renderWithRelay({
          Artwork: () => ({
            isAcquireable: true,
            artsyShippingDomestic: true,
            artsyShippingInternational: true,
            internationalShippingFee: null,
          }),
        })

        expect(MockArtsyShippingEstimate).toHaveBeenCalled()
      })
      it("renders ArtsyShippingEstimate if work is arta shipped domestically and no international shipping defined", () => {
        renderWithRelay({
          Artwork: () => ({
            isAcquireable: true,
            artsyShippingDomestic: true,
            artsyShippingInternational: false,
            internationalShippingFee: null,
          }),
        })

        expect(MockArtsyShippingEstimate).toHaveBeenCalled()
      })
      it("does not render ArtsyShippingEstimate if work is not arta shipped", () => {
        renderWithRelay({
          Artwork: () => ({
            isAcquireable: true,
            artsyShippingDomestic: false,
            artsyShippingInternational: false,
            internationalShippingFee: {
              major: 1234,
            },
          }),
        })

        expect(MockArtsyShippingEstimate).not.toHaveBeenCalled()
      })
      it("does not render ArtsyShippingEstimate if work is arta shipped domestically but international shipping is different", () => {
        renderWithRelay({
          Artwork: () => ({
            isAcquireable: true,
            artsyShippingDomestic: true,
            artsyShippingInternational: false,
            internationalShippingFee: {
              major: 1234,
            },
          }),
        })

        expect(MockArtsyShippingEstimate).not.toHaveBeenCalled()
      })
      it("does not render ArtsyShippingEstimate if work has multiple editions", () => {
        renderWithRelay({
          Artwork: () => ({
            isAcquireable: true,
            artsyShippingDomestic: true,
            artsyShippingInternational: true,
            isEdition: true,
            editionSets: [{ internalID: "set1" }, { internalID: "set2" }],
          }),
        })

        expect(MockArtsyShippingEstimate).not.toHaveBeenCalled()
      })
      it("renders ArtsyShippingEstimate if work has only one edition set", () => {
        renderWithRelay({
          Artwork: () => ({
            isAcquireable: true,
            artsyShippingDomestic: true,
            artsyShippingInternational: true,
            isEdition: true,
            editionSets: [{ internalID: "set1" }],
          }),
        })

        expect(MockArtsyShippingEstimate).toHaveBeenCalled()
      })
    })

    it("should track click to expand/collapse the Shipping and taxes section", () => {
      renderWithRelay({
        Artwork: () => ({
          isSold: false,
          isAcquireable: true,
        }),
      })

      const button = screen.getByText("Shipping and taxes")

      fireEvent.click(button)

      expect(trackEvent).toHaveBeenCalledTimes(1)
      expect(trackEvent.mock.calls[0]).toEqual([
        {
          action: "toggledAccordion",
          context_module: "artworkSidebar",
          context_owner_type: "artwork",
          expand: true,
          subject: "Shipping and taxes",
        },
      ])

      fireEvent.click(button)

      expect(trackEvent).toHaveBeenCalledTimes(2)
      expect(trackEvent.mock.calls[1]).toEqual([
        {
          action: "toggledAccordion",
          context_module: "artworkSidebar",
          context_owner_type: "artwork",
          expand: false,
          subject: "Shipping and taxes",
        },
      ])
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
