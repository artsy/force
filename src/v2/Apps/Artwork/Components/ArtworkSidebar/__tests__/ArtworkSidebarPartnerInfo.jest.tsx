import {
  ArtworkFromPartnerWithLocations,
  ArtworkInNonAuctionSale,
} from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarPartnerInfo"
import { ArtworkSidebarPartnerInfoFragmentContainer } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarPartnerInfo"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")

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
    it("acquirable artwork (BN only) with exact price displays button", () => {
      renderWithRelay({
        Artwork: () => ({
          ...ArtworkFromPartnerWithLocations,
          isOfferable: false,
          isAcquireable: true,
          isInquireable: false,
          isPriceRange: false,
        }),
      })

      expect(screen.queryByText("Contact Gallery")).toBeInTheDocument()
    })

    it("acquirable and offerable artwork (BNMO) with exact price displays button", () => {
      renderWithRelay({
        Artwork: () => ({
          ...ArtworkFromPartnerWithLocations,
          isOfferable: true,
          isAcquireable: true,
          isInquireable: false,
          isPriceRange: false,
        }),
      })

      expect(screen.queryByText("Contact Gallery")).toBeInTheDocument()
    })

    it("offerable artwork (MO only) with exact price displays button", () => {
      renderWithRelay({
        Artwork: () => ({
          ...ArtworkFromPartnerWithLocations,
          isOfferable: true,
          isAcquireable: false,
          isInquireable: false,
          isPriceRange: false,
        }),
      })

      expect(screen.queryByText("Contact Gallery")).toBeInTheDocument()
    })

    it("offerable artwork (MO only) with price range displays button", () => {
      renderWithRelay({
        Artwork: () => ({
          ...ArtworkFromPartnerWithLocations,
          isOfferable: true,
          isAcquireable: false,
          isInquireable: false,
          isPriceRange: true,
        }),
      })

      expect(screen.queryByText("Contact Gallery")).toBeInTheDocument()
    })

    it("inquirible and offerable artwork with exact price doesn't display button", () => {
      renderWithRelay({
        Artwork: () => ({
          ...ArtworkFromPartnerWithLocations,
          isOfferable: true,
          isAcquireable: false,
          isInquireable: true,
          isPriceRange: false,
        }),
      })

      expect(screen.queryByText("Contact Gallery")).not.toBeInTheDocument()
    })

    it("inquirible and offerable artwork with price range displays button", () => {
      renderWithRelay({
        Artwork: () => ({
          ...ArtworkFromPartnerWithLocations,
          isOfferable: true,
          isAcquireable: false,
          isInquireable: true,
          isPriceRange: true,
        }),
      })

      expect(screen.queryByText("Contact Gallery")).toBeInTheDocument()
    })

    it("inquirible artwork with exact price doesn't display button", () => {
      renderWithRelay({
        Artwork: () => ({
          ...ArtworkFromPartnerWithLocations,
          isOfferable: false,
          isAcquireable: false,
          isInquireable: true,
          isPriceRange: false,
        }),
      })

      expect(screen.queryByText("Contact Gallery")).not.toBeInTheDocument()
    })

    it("inquirible artwork with price range doesn't display button", () => {
      renderWithRelay({
        Artwork: () => ({
          ...ArtworkFromPartnerWithLocations,
          isOfferable: false,
          isAcquireable: false,
          isInquireable: true,
          isPriceRange: true,
        }),
      })

      expect(screen.queryByText("Contact Gallery")).not.toBeInTheDocument()
    })
  })
})
