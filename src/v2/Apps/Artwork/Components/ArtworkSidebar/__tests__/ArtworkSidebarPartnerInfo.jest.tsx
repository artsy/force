import {
  ArtworkFromPartnerWithLocations,
  ArtworkInNonAuctionSale,
} from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarPartnerInfo"
import { ArtworkSidebarPartnerInfoFragmentContainer } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarPartnerInfo"
import { screen, fireEvent } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { useSystemContext } from "v2/System/useSystemContext"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("v2/System/useSystemContext")
jest.mock("react-tracking")

const trackEvent = jest.fn()

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => (
    <ArtworkSidebarPartnerInfoFragmentContainer artwork={props.artwork} />
  ),
  query: graphql`
    query ArtworkSidebarPartnerInfo_Test_Query @relay_test_operation {
      artwork(id: "artwork_from_partner_with_locations") {
        ...ArtworkSidebarPartnerInfo_artwork
      }
    }
  `,
})

describe("ArtworkSidebarPartnerInfo", () => {
  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent,
    }))
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      featureFlags: { "conversational-buy-now": { flagEnabled: true } },
    }))
  })

  describe("Non-auction Sales display", () => {
    it("displays sale name", () => {
      const { sale } = ArtworkInNonAuctionSale

      renderWithRelay({
        Artwork: () => ArtworkInNonAuctionSale,
      })

      const element = screen.getByText(sale.name)
      expect(element).toBeInTheDocument()
      expect(element).toHaveAttribute("href", sale.href)
    })
  })

  describe("Partners display", () => {
    it("displays partner name", () => {
      const { partner } = ArtworkFromPartnerWithLocations

      renderWithRelay({
        Artwork: () => ArtworkFromPartnerWithLocations,
      })

      const element = screen.getByText(partner.name)
      expect(element).toBeInTheDocument()
      expect(element).toHaveAttribute("href", partner.href)
    })

    it("displays partner name without href", () => {
      const { partner } = ArtworkFromPartnerWithLocations

      renderWithRelay({
        Artwork: () => ({
          ...ArtworkFromPartnerWithLocations,
          partner: { ...partner, href: null },
        }),
      })

      const element = screen.getByText(partner.name)
      expect(element).toBeInTheDocument()
      expect(element).not.toHaveAttribute("href")
    })

    it("displays partner locations", () => {
      renderWithRelay({
        Artwork: () => ArtworkFromPartnerWithLocations,
      })

      const text = [
        "New York",
        "Beverly Hills",
        "San Francisco",
        "London",
        "Paris",
        "Le Bourget",
        "Rome",
        "Geneva",
        "Athens",
        "Central",
        "Hong Kong",
      ].join(", ")
      expect(screen.getByText(text)).toBeInTheDocument()
    })

    it("displays partner without locations", () => {
      const { partner } = ArtworkFromPartnerWithLocations

      renderWithRelay({
        Artwork: () => ({
          ...ArtworkFromPartnerWithLocations,
          partner: { ...partner, locations: [] },
        }),
      })

      expect(screen.getByText(partner.name)).toBeInTheDocument()
    })
  })

  describe("Contact Gallery CTA", () => {
    it("acquirable artwork (BN only) displays button", () => {
      renderWithRelay({
        Artwork: () => ({
          ...ArtworkFromPartnerWithLocations,
          isAcquireable: true,
        }),
      })

      expect(screen.queryByText("Contact Gallery")).toBeInTheDocument()
    })

    it("acquirable and offerable artwork (BNMO) displays button", () => {
      renderWithRelay({
        Artwork: () => ({
          ...ArtworkFromPartnerWithLocations,
          isOfferable: true,
          isAcquireable: true,
        }),
      })

      expect(screen.queryByText("Contact Gallery")).toBeInTheDocument()
    })

    it("offerable artwork (MO only) displays button", () => {
      renderWithRelay({
        Artwork: () => ({
          ...ArtworkFromPartnerWithLocations,
          isOfferable: true,
        }),
      })

      expect(screen.queryByText("Contact Gallery")).toBeInTheDocument()
    })

    it("inquirable and offerable artwork doesn't display button", () => {
      renderWithRelay({
        Artwork: () => ({
          ...ArtworkFromPartnerWithLocations,
          isOfferable: true,
          isInquireable: true,
        }),
      })

      expect(screen.queryByText("Contact Gallery")).not.toBeInTheDocument()
    })

    it("inquirable artwork doesn't display button", () => {
      renderWithRelay({
        Artwork: () => ({
          ...ArtworkFromPartnerWithLocations,
          isInquireable: true,
        }),
      })

      expect(screen.queryByText("Contact Gallery")).not.toBeInTheDocument()
    })

    it("tracks the right event when clicked", () => {
      renderWithRelay({
        Artwork: () => ({
          ...ArtworkFromPartnerWithLocations,
          slug: "test-slug",
          isAcquireable: true,
        }),
      })

      fireEvent.click(screen.getByText("Contact Gallery"))
      expect(trackEvent).toBeCalledWith({
        action_type: 'Clicked "Contact Gallery"',
        artwork_id: "artwork_from_partner_with_locations",
        artwork_slug: "test-slug",
        context_module: "Sidebar",
        subject: "Contact Gallery",
      })
    })
  })
})
