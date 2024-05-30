import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { MyCollectionArtworkSidebarTestQuery } from "__generated__/MyCollectionArtworkSidebarTestQuery.graphql"
import { MyCollectionArtworkSidebarFragmentContainer } from ".."

jest.unmock("react-relay")

describe("MyCollectionArtworkSidebar", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    MyCollectionArtworkSidebarTestQuery
  >({
    Component: props => {
      if (props?.artwork) {
        return (
          <MyCollectionArtworkSidebarFragmentContainer {...(props as any)} />
        )
      }
      return null
    },
    query: graphql`
      query MyCollectionArtworkSidebarTestQuery @relay_test_operation {
        artwork(id: "foo") {
          ...MyCollectionArtworkSidebarTitleInfo_artwork
          ...MyCollectionArtworkSidebarMetadata_artwork
        }
      }
    `,
  })

  describe("for artwork with metadata", () => {
    beforeEach(() => {
      renderWithRelay({ Artwork: () => mockResolversWithData })
    })

    it("displays artists names and title with the artist url", () => {
      expect(screen.getByText("Jean-Michel Basquiat")).toBeInTheDocument()
      expect(screen.getByText("Jean-Michel Basquiat")).toHaveAttribute(
        "href",
        "/artist/artist-id"
      )

      expect(
        screen.getByText(
          "Basquiat hand-painted sweatshirt 1979/1980 (early Jean-Michel Basquiat)"
        )
      ).toBeInTheDocument()
      expect(screen.getByText(", 1979")).toBeInTheDocument()
    })

    it("displays metadata", () => {
      expect(
        screen.getByText("Acrylic on cotton sweatshirt.")
      ).toBeInTheDocument()
      expect(
        screen.getByText("Drawing, Collage or other Work on Paper")
      ).toBeInTheDocument()
      expect(
        screen.getByText("22 × 16 1/2 in", {
          collapseWhitespace: true,
        })
      ).toBeInTheDocument()
      expect(screen.getByText("Bought in a gallery")).toBeInTheDocument()
      expect(screen.getByText("Unique work")).toBeInTheDocument()
      expect(screen.getByText("€25,300")).toBeInTheDocument()
      expect(screen.getByText("Berlin, Berlin, Germany")).toBeInTheDocument()
    })

    it("includes Notes when notes are present", () => {
      renderWithRelay({
        Artwork: () => ({
          ...mockResolversWithData,
          confidentialNotes: "A short text",
        }),
      })
      expect(screen.getByText("A short text")).toBeInTheDocument()
    })

    describe("when the artwork is part of limited edition", () => {
      beforeEach(() => {
        renderWithRelay({
          Artwork: () => ({
            ...mockResolversWithData,
            attributionClass: {
              shortDescription: "Part of a limited edition set",
            },
            editionOf: "Edition 7/11",
          }),
        })
      })

      it("displays edition info", () => {
        expect(
          screen.getByText("Part of a limited edition set Edition 7/11", {
            collapseWhitespace: true,
          })
        ).toBeInTheDocument()
      })
    })

    describe("when metric is set to 'cm'", () => {
      beforeEach(() => {
        renderWithRelay({
          Artwork: () => ({ ...mockResolversWithData, metric: "cm" }),
        })
      })

      it("displays dimensions in cm", () => {
        expect(
          screen.getByText("55.9 × 41.9 cm", {
            collapseWhitespace: true,
          })
        ).toBeInTheDocument()
      })
    })
  })

  describe("for artwork with minimal metadata", () => {
    beforeEach(() => {
      renderWithRelay({ Artwork: () => emptyMockResolvers })
    })

    it("displays artists names and title", () => {
      expect(screen.getByText("Jean-Michel Basquiat")).toBeInTheDocument()
      expect(screen.getByText("Jean-Michel Basquiat")).toHaveAttribute(
        "href",
        "/artist/artist-id"
      )

      expect(
        screen.getByText(
          "Basquiat hand-painted sweatshirt 1979/1980 (early Jean-Michel Basquiat)"
        )
      ).toBeInTheDocument()
      expect(screen.getByText(", 1979")).toBeInTheDocument()
    })

    it("displays minimal metadata", () => {
      expect(
        screen.getByText("Acrylic on cotton sweatshirt.")
      ).toBeInTheDocument()
      expect(
        screen.getByText("Drawing, Collage or other Work on Paper")
      ).toBeInTheDocument()

      // shows labels when no data are available
      expect(screen.getByText("Dimensions")).toBeInTheDocument()
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
  artistNames: "Jean-Michel Basquiat",
  artist: {
    href: "/artist/artist-id",
  },
  title:
    "Basquiat hand-painted sweatshirt 1979/1980 (early Jean-Michel Basquiat)",
  category: "Drawing, Collage or other Work on Paper",
  date: "1979",
  medium: "Acrylic on cotton sweatshirt.",
  metric: "in",
  dimensions: {
    in: "22 × 16 1/2 in",
    cm: "55.9 × 41.9 cm",
  },
  provenance: "Bought in a gallery",
  attributionClass: {
    shortDescription: "Unique work",
  },
  editionOf: null,
  pricePaid: {
    display: "€25,300",
  },
  collectorLocation: {
    city: "Berlin",
    state: "Berlin",
    country: "Germany",
  },
}

const emptyMockResolvers = {
  artistNames: "Jean-Michel Basquiat",
  artist: {
    href: "/artist/artist-id",
  },
  title:
    "Basquiat hand-painted sweatshirt 1979/1980 (early Jean-Michel Basquiat)",
  date: "1979",
  category: "Drawing, Collage or other Work on Paper",
  medium: "Acrylic on cotton sweatshirt.",
  dimensions: null,
  provenance: null,
  attributionClass: null,
  editionOf: null,
  pricePaid: null,
  collectorLocation: null,
}
