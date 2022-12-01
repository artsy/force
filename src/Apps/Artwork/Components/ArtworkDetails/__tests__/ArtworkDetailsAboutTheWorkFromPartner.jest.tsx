import { graphql } from "react-relay"
import { screen } from "@testing-library/react"

import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ArtworkDetailsAboutTheWorkFromPartnerFragmentContainer } from "Apps/Artwork/Components/ArtworkDetails/ArtworkDetailsAboutTheWorkFromPartner"
import { ArtworkDetailsAboutTheWorkFromPartner_Test_Query } from "__generated__/ArtworkDetailsAboutTheWorkFromPartner_Test_Query.graphql"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<
  ArtworkDetailsAboutTheWorkFromPartner_Test_Query
>({
  Component: ArtworkDetailsAboutTheWorkFromPartnerFragmentContainer,
  query: graphql`
    query ArtworkDetailsAboutTheWorkFromPartner_Test_Query($slug: String!)
      @relay_test_operation {
      artwork(id: $slug) {
        ...ArtworkDetailsAboutTheWorkFromPartner_artwork
      }
    }
  `,
})

describe("ArtworkDetailsAboutTheWorkFromPartner", () => {
  it("renders a link to gallery partner", () => {
    renderWithRelay({
      Artwork: () => ({
        partner: {
          type: "Gallery",
          name: "Nice Gallery",
          slug: "nice-gallery",
          href: "/auction/nice-gallery",
        },
      }),
    })

    expect(screen.queryByText("Nice Gallery")).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/auction/nice-gallery"
    )
  })

  it("does not render a link to auction partner", () => {
    renderWithRelay({
      Artwork: () => ({
        partner: {
          type: "Auction House",
          name: "Hammer Time",
          slug: "hammer-time",
          href: "/auction/hammer-time",
        },
      }),
    })

    expect(screen.queryByText("Hammer Time")).toBeInTheDocument()
    expect(screen.queryByRole("link")).not.toBeInTheDocument()
  })
})

it.skip("opens auth modal with expected args when following an artist", () => {
  // TODO
})
