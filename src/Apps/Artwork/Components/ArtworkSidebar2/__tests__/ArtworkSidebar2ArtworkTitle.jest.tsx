import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkSidebar2ArtworkTitle_Test_Query } from "__generated__/ArtworkSidebar2ArtworkTitle_Test_Query.graphql"
import { screen } from "@testing-library/react"
import { ArtworkSidebar2ArtworkTitleFragmentContainer } from "../ArtworkSidebar2ArtworkTitle"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<
  ArtworkSidebar2ArtworkTitle_Test_Query
>({
  Component: ({ artwork }) => {
    // @ts-ignore RELAY UPGRADE 13
    return <ArtworkSidebar2ArtworkTitleFragmentContainer artwork={artwork!} />
  },
  query: graphql`
    query ArtworkSidebar2ArtworkTitle_Test_Query @relay_test_operation {
      artwork(id: "josef-albers-homage-to-the-square-85") {
        ...ArtworkSidebar2ArtworkTitle_artwork
      }
    }
  `,
})

describe("ArtworkSidebar2ArtworkTitle", () => {
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
