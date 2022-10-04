import { graphql } from "react-relay"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ArtworkSidebar2FragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar2/ArtworkSidebar2"

jest.unmock("react-relay")

const ARTWORKSIDEBAR2_TEST_QUERY = graphql`
  query ArtworkSidebar2_Test_Query @relay_test_operation {
    artwork(id: "josef-albers-homage-to-the-square-85") {
      ...ArtworkSidebar2_artwork
    }
  }
`

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtworkSidebar2FragmentContainer,
  query: ARTWORKSIDEBAR2_TEST_QUERY,
})

describe("ArtworkSidebar2Artists", () => {
  describe("should display the create alert section", () => {
    it("renders the create alert section", () => {
      renderWithRelay()

      expect(screen.queryByText(/Create Alert/i)).toBeInTheDocument()
      expect(
        screen.queryByText(/Get notifications for similar works/i)
      ).toBeInTheDocument()
    })

    it("for artworks that are on loan", () => {
      renderWithRelay({
        Artwork: () => ({
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
    it("for bidding closed artworks if there are no associated artists", () => {
      renderWithRelay({
        Artwork: () => ({
          isInAuction: true,
          artists: [],
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
  })

  it("if there are no associated artists", () => {
    renderWithRelay({
      Artwork: () => ({
        artists: [],
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
