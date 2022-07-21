import {
  ArtworkOfferableFromInquiryPriceExact,
  ArtworkOfferableFromInquiryPriceRange,
  ArtworkOfferableAndInquireablePriceHidden,
  ForSaleArtworkWithMultipleEditions,
  ArtworkSold,
  ArtworkBuyNowMakeOffer,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarCommercial"

import { commitMutation as _commitMutation, graphql } from "react-relay"

import { ArtworkSidebarCommercialFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercial"
import { SystemContextProvider } from "System"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"

jest.unmock("react-relay")

describe("ArtworkSidebarCommercial RTL", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: ({ artwork }: any) => {
      return (
        <SystemContextProvider>
          <ArtworkSidebarCommercialFragmentContainer artwork={artwork} />
        </SystemContextProvider>
      )
    },
    query: graphql`
      query ArtworkSidebarCommercial2_Test_Query @relay_test_operation {
        artwork(id: "pretty-drawing-111") {
          ...ArtworkSidebarCommercial_artwork
        }
      }
    `,
  })

  it("displays both Make an Offer and Contact Gallery CTAs when offerable from inquiry and exact price listed", () => {
    renderWithRelay({
      Artwork: () => ArtworkOfferableFromInquiryPriceExact,
    })

    expect(screen.getByText("Make an Offer")).toBeInTheDocument()
    expect(screen.getByText("Contact Gallery")).toBeInTheDocument()
  })

  it("displays both Make an Offer and Contact Galleryt CTAs when offerable from inquiry and price range", () => {
    renderWithRelay({
      Artwork: () => ArtworkOfferableFromInquiryPriceRange,
    })

    expect(screen.getByText("Make an Offer")).toBeInTheDocument()
    expect(screen.getByText("Contact Gallery")).toBeInTheDocument()
  })

  it("does not display Make an Offer CTA and only the Contact Gallery CTA when offerable from inquiry and price hidden", () => {
    renderWithRelay({
      Artwork: () => ArtworkOfferableAndInquireablePriceHidden,
    })

    expect(screen.queryByText("Make an Offer")).not.toBeInTheDocument()
    expect(screen.getByText("Contact Gallery")).toBeInTheDocument()
  })

  it("displays radio buttons for Edition Sets for inquirable artworks", () => {
    renderWithRelay({
      Artwork: () => ForSaleArtworkWithMultipleEditions,
    })

    expect(screen.getAllByRole("radio").length).toBe(4)
  })

  it("displays 'Taxes may apply at checkout.'", () => {
    renderWithRelay({
      Artwork: () => ArtworkBuyNowMakeOffer,
    })

    expect(screen.getByText("Taxes may apply at checkout.")).toBeInTheDocument()
  })

  it("does not display 'Taxes may apply at checkout.' if artwork is sold", () => {
    renderWithRelay({
      Artwork: () => ArtworkSold,
    })

    expect(
      screen.queryByText("Taxes may apply at checkout.")
    ).not.toBeInTheDocument()
  })
})
