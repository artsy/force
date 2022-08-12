import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "relay-runtime"
import { MyCollectionArtworkSidebarMetadataTestQuery } from "__generated__/MyCollectionArtworkSidebarMetadataTestQuery.graphql"
import { MyCollectionArtworkSidebarMetadataFragmentContainer } from "../MyCollectionArtworkSidebarMetadata"

jest.unmock("react-relay")

describe("MyCollectionArtworkSidebarMetadata", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    MyCollectionArtworkSidebarMetadataTestQuery
  >({
    Component: props => {
      if (props?.artwork) {
        return (
          <MyCollectionArtworkSidebarMetadataFragmentContainer
            {...(props as any)}
          />
        )
      }
      return null
    },
    query: graphql`
      query MyCollectionArtworkSidebarMetadataTestQuery @relay_test_operation {
        artwork(id: "foo") {
          ...MyCollectionArtworkSidebarMetadata_artwork
        }
      }
    `,
  })

  describe("for artwork with metadata", () => {
    beforeEach(() => {
      renderWithRelay(mockResolversWithData, false)
    })

    it("displays artists names and title", () => {
      expect(screen.getByText("Jean-Michel Basquiat")).toBeInTheDocument()
      expect(
        screen.getByText(
          "Basquiat hand-painted sweatshirt 1979/1980 (early Jean-Michel Basquiat)"
        )
      ).toBeInTheDocument()
    })

    it("displays metadata", () => {
      expect(
        screen.getByText("Acrylic on cotton sweatshirt.")
      ).toBeInTheDocument()
      expect(
        screen.getByText("Drawing, Collage or other Work on Paper")
      ).toBeInTheDocument()
      expect(screen.getByText("22 × 16 1/2 in")).toBeInTheDocument()
      expect(screen.getByText("55.9 × 41.9 cm")).toBeInTheDocument()
      expect(screen.getByText("Bought in a gallery")).toBeInTheDocument()
      expect(screen.getByText("This is a unique work")).toBeInTheDocument()
      expect(screen.getByText("€25,300")).toBeInTheDocument()
      expect(screen.getByText("Berlin")).toBeInTheDocument()
    })
  })

  describe("for artwork with minimal metadata", () => {
    beforeEach(() => {
      renderWithRelay(emptyMockResolvers, false)
    })

    it("displays artists names and title", () => {
      expect(screen.getByText("Jean-Michel Basquiat")).toBeInTheDocument()
      expect(
        screen.getByText(
          "Basquiat hand-painted sweatshirt 1979/1980 (early Jean-Michel Basquiat)"
        )
      ).toBeInTheDocument()
    })

    it("displays minimal metadata", () => {
      expect(
        screen.getByText("Acrylic on cotton sweatshirt.")
      ).toBeInTheDocument()
      expect(
        screen.getByText("Drawing, Collage or other Work on Paper")
      ).toBeInTheDocument()

      // shows labels when no data are available
      expect(screen.getByText("Size")).toBeInTheDocument()
      expect(screen.getByText("Provenance")).toBeInTheDocument()
      expect(screen.getByText("Rarity")).toBeInTheDocument()
      expect(screen.getByText("Price Paid")).toBeInTheDocument()
      expect(screen.getByText("Location")).toBeInTheDocument()

      // replaces empty values with ----
      expect(screen.getAllByText("----")).toHaveLength(5)
    })
  })
})

const mockResolversWithData = {
  Artwork: () => ({
    artistNames: "Jean-Michel Basquiat",
    title:
      "Basquiat hand-painted sweatshirt 1979/1980 (early Jean-Michel Basquiat)",
    category: "Drawing, Collage or other Work on Paper",
    medium: "Acrylic on cotton sweatshirt.",
    dimensions: {
      in: "22 × 16 1/2 in",
      cm: "55.9 × 41.9 cm",
    },
    provenance: "Bought in a gallery",
    attributionClass: {
      shortDescription: "This is a unique work",
    },
    pricePaid: {
      display: "€25,300",
    },
    artworkLocation: "Berlin",
  }),
}

const emptyMockResolvers = {
  Artwork: () => ({
    artistNames: "Jean-Michel Basquiat",
    title:
      "Basquiat hand-painted sweatshirt 1979/1980 (early Jean-Michel Basquiat)",
    category: "Drawing, Collage or other Work on Paper",
    medium: "Acrylic on cotton sweatshirt.",
    dimensions: null,
    provenance: null,
    attributionClass: null,
    pricePaid: null,
    artworkLocation: null,
  }),
}
