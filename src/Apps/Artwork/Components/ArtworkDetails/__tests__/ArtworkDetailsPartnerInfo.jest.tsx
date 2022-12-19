import { graphql } from "react-relay"
import { screen } from "@testing-library/react"

import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ArtworkDetailsPartnerInfoFragmentContainer } from "Apps/Artwork/Components/ArtworkDetails/ArtworkDetailsPartnerInfo"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtworkDetailsPartnerInfoFragmentContainer,
  query: graphql`
    query ArtworkDetailsPartnerInfo_Test_Query($slug: String!)
      @relay_test_operation {
      artwork(id: $slug) {
        ...ArtworkDetailsPartnerInfo_artwork
      }
    }
  `,
})

describe("ArtworkDetailsAboutTheWorkFromPartner", () => {
  it("renders a link when partner page is valid", () => {
    renderWithRelay({
      Artwork: () => ({
        partner: {
          name: "Nice Gallery",
          href: "/partner/nice-gallery",
          partnerPageEligible: true,
          isDefaultProfilePublic: true,
        },
      }),
    })

    expect(screen.queryByText("Nice Gallery")).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/partner/nice-gallery"
    )
  })

  it("does not render a link when partner is ineligible for a page", () => {
    renderWithRelay({
      Artwork: () => ({
        partner: {
          name: "Hammer Time",
          href: null,
          partnerPageEligible: false,
          isDefaultProfilePublic: true,
        },
      }),
    })

    expect(screen.queryByText("Hammer Time")).toBeInTheDocument()
    expect(screen.queryByRole("link")).not.toBeInTheDocument()
  })

  it("does not render a link when partner profile is private", () => {
    renderWithRelay({
      Artwork: () => ({
        partner: {
          name: "Galerie Edge Case",
          href: "/partner/galerie-edge-case",
          partnerPageEligible: true,
          isDefaultProfilePublic: false,
        },
      }),
    })

    expect(screen.queryByText("Galerie Edge Case")).toBeInTheDocument()
    expect(screen.queryByRole("link")).not.toBeInTheDocument()
  })
})
