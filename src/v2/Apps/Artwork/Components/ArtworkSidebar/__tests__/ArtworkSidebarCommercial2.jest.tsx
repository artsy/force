import {
  ArtworkOfferableFromInquiryPriceExact,
  ArtworkOfferableFromInquiryPriceRange,
  ArtworkOfferableAndInquireablePriceHidden,
} from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarCommercial"

import { commitMutation as _commitMutation, graphql } from "react-relay"

import { ArtworkSidebarCommercialFragmentContainer } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercial"
import { SystemContextProvider } from "v2/System"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"

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
      query ArtworkSidebarCommercial2_Test_Query @raw_response_type {
        artwork(id: "pretty-drawing-111") {
          ...ArtworkSidebarCommercial_artwork
        }
      }
    `,
  })

  it("displays both Make Offer and Contact Gallery CTAs when offerable from inquiry and exact price listed", () => {
    renderWithRelay({
      Artwork: () => ArtworkOfferableFromInquiryPriceExact,
    })

    expect(screen.getByText("Make offer")).toBeInTheDocument()
    expect(screen.getByText("Contact Gallery")).toBeInTheDocument()
  })

  it("displays both Make Offer and Contact Gallery CTAs when offerable from inquiry and price range", () => {
    renderWithRelay({
      Artwork: () => ArtworkOfferableFromInquiryPriceRange,
    })

    expect(screen.getByText("Make offer")).toBeInTheDocument()
    expect(screen.getByText("Contact Gallery")).toBeInTheDocument()
  })

  it("does not display Make Offer CTA and only the Contact Gallery CTA when offerable from inquiry and price hidden", () => {
    renderWithRelay({
      Artwork: () => ArtworkOfferableAndInquireablePriceHidden,
    })

    expect(screen.queryByText("Make offer")).not.toBeInTheDocument()
    expect(screen.getByText("Contact Gallery")).toBeInTheDocument()
  })
})
