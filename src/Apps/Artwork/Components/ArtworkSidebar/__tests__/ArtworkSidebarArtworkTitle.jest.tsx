import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkSidebarArtworkTitle_Test_Query } from "__generated__/ArtworkSidebarArtworkTitle_Test_Query.graphql"
import { screen } from "@testing-library/react"
import { ArtworkSidebarArtworkTitleFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarArtworkTitle"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<
  ArtworkSidebarArtworkTitle_Test_Query
>({
  Component: ({ artwork }) => {
    return <ArtworkSidebarArtworkTitleFragmentContainer artwork={artwork!} />
  },
  query: graphql`
    query ArtworkSidebarArtworkTitle_Test_Query @relay_test_operation {
      artwork(id: "josef-albers-homage-to-the-square-85") {
        ...ArtworkSidebarArtworkTitle_artwork
      }
    }
  `,
})

describe("ArtworkSidebarArtworkTitle", () => {
  describe("artwork has a year", () => {
    it("renders title followed by year", () => {
      renderWithRelay({
        Artwork: () => ({
          title: "Homage to the Square",
          date: "1985",
        }),
      })

      expect(screen.queryByText("Homage to the Square")).toBeInTheDocument()
      expect(screen.queryByText(", 1985")).toBeInTheDocument()
    })
  })
  describe("artwork does not have a year", () => {
    it("only renders title", () => {
      renderWithRelay({
        Artwork: () => ({
          title: "Homage to the Square",
          date: null,
        }),
      })

      expect(screen.queryByText("Homage to the Square")).toBeInTheDocument()
    })
  })
})
