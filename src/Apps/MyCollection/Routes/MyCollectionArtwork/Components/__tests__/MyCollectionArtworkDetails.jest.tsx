import { MyCollectionArtworkDetails } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkDetails"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { MyCollectionArtworkDetailsTestQuery } from "__generated__/MyCollectionArtworkDetailsTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("MyCollectionArtworkDetails", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<MyCollectionArtworkDetailsTestQuery>({
      Component: props => {
        if (props?.artwork) {
          return <MyCollectionArtworkDetails {...(props as any)} />
        }
        return null
      },
      query: graphql`
        query MyCollectionArtworkDetailsTestQuery @relay_test_operation {
          artwork(id: "foo") {
            ...MyCollectionArtworkDetails_artwork
          }
        }
      `,
    })

  describe("for artwork with metadata", () => {
    beforeEach(() => {
      renderWithRelay({ Artwork: () => mockResolversWithData })
    })

    it("displays metadata", () => {
      expect(
        screen.getByText("Acrylic on cotton sweatshirt."),
      ).toBeInTheDocument()
      expect(
        screen.getByText("Drawing, Collage or other Work on Paper"),
      ).toBeInTheDocument()
      expect(
        screen.getByText("22 × 16 1/2 in", {
          collapseWhitespace: true,
        }),
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
          additionalInformation: "This is my favorite artwork!",
          exhibitionHistory: "Previous exhibitions include, the Louvre.",
        }),
      })
      expect(screen.getByText("A short text")).toBeInTheDocument()
      expect(
        screen.getByText("This is my favorite artwork!"),
      ).toBeInTheDocument()
      expect(
        screen.getByText("Previous exhibitions include, the Louvre."),
      ).toBeInTheDocument()
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
          }),
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
          }),
        ).toBeInTheDocument()
      })
    })
  })

  describe("for artwork with minimal metadata", () => {
    beforeEach(() => {
      renderWithRelay({ Artwork: () => emptyMockResolvers })
    })

    it("displays minimal metadata", () => {
      expect(
        screen.getByText("Acrylic on cotton sweatshirt."),
      ).toBeInTheDocument()
      expect(
        screen.getByText("Drawing, Collage or other Work on Paper"),
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
  mediumType: {
    name: "Drawing, Collage or other Work on Paper",
  },
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
  mediumType: {
    name: "Drawing, Collage or other Work on Paper",
  },
  medium: "Acrylic on cotton sweatshirt.",
  dimensions: null,
  provenance: null,
  attributionClass: null,
  editionOf: null,
  pricePaid: null,
  collectorLocation: null,
}
