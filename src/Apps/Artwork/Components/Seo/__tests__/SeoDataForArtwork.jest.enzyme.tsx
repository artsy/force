import { screen } from "@testing-library/react"
import { SeoDataForArtworkFragmentContainer } from "Apps/Artwork/Components/Seo/SeoDataForArtwork"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("sharify", () => ({
  data: {
    APP_URL: "test-url",
  },
}))

interface DangerousHTML {
  __html: string
}

jest.mock("react-head", () => ({
  Meta: ({ dangerouslySetInnerHTML, type }: any) => (
    <script
      type={type}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      data-testid="meta-tag"
    />
  ),
}))

describe("SeoDataForArtwork", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: SeoDataForArtworkFragmentContainer,
    query: graphql`
      query SeoDataForArtworkTestQuery
      @raw_response_type
      @relay_test_operation {
        artwork(id: "artwork-id") {
          ...SeoDataForArtwork_artwork
        }
      }
    `,
  })

  const defaultArtwork = {
    artistNames: "Example Artist",
    availability: "for sale",
    category: "Painting",
    date: "2020",
    dimensions: { in: "1 × 2 in", cm: null },
    editionOf: null,
    href: "/artwork/an-artwork",
    id: "artwork-id",
    isPriceHidden: false,
    listPrice: null,
    medium: "Oil on canvas",
    meta: { description: "artwork description", title: "artwork title" },
    metaImage: {
      resized: { url: "artwork-image", height: null, width: null },
    },
    partner: {
      id: "partner-id",
      name: "Wright",
      type: "Gallery",
      profile: {
        id: "profile-id",
        image: {
          resized: {
            url: "partner-image",
          },
        },
      },
    },
  }

  const getSchemaData = () => {
    const metaTag = screen.getByTestId("meta-tag")
    const html = metaTag.getAttribute(
      "dangerouslySetInnerHTML",
    ) as unknown as DangerousHTML
    if (!html || typeof html !== "object" || !("__html" in html)) {
      throw new Error("Invalid meta tag content")
    }
    return JSON.parse(html.__html)
  }

  describe("SeoDataForArtworkFragmentContainer", () => {
    it("Renders without a partner", () => {
      renderWithRelay({
        Artwork: () => ({
          ...defaultArtwork,
          partner: {
            id: "partner-id",
            name: null,
            type: null,
            profile: null,
          },
        }),
      })

      const data = getSchemaData()
      expect(data["@type"]).toBe("VisualArtwork")
    })

    it("Renders a CreativeWork for an institution", () => {
      renderWithRelay({
        Artwork: () => ({
          ...defaultArtwork,
          partner: {
            ...defaultArtwork.partner,
            type: "Institution",
          },
        }),
      })

      const data = getSchemaData()
      expect(data).toEqual({
        "@context": "https://schema.org",
        "@type": "VisualArtwork",
        creator: {
          "@type": "Person",
          name: "Example Artist",
        },
        description: "artwork description",
        image: "artwork-image",
        name: "artwork title",
        url: "test-url/artwork/an-artwork",
        width: {
          "@type": "Distance",
          name: "1 in",
        },
        height: {
          "@type": "Distance",
          name: "2 in",
        },
        artMedium: "Oil on canvas",
        artform: "Painting",
        dateCreated: "2020",
      })
    })

    it("Renders a Product for a non-institution", () => {
      renderWithRelay({
        Artwork: () => ({
          ...defaultArtwork,
          listPrice: {
            __typename: "Money",
            major: 1000,
            currencyCode: "USD",
          },
        }),
      })

      const data = getSchemaData()
      expect(data).toEqual({
        "@context": "https://schema.org",
        "@type": "VisualArtwork",
        creator: {
          "@type": "Person",
          name: "Example Artist",
        },
        category: "Painting",
        description: "artwork description",
        image: "artwork-image",
        name: "artwork title",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          price: 1000,
          priceCurrency: "USD",
          seller: {
            "@type": "ArtGallery",
            image: "partner-image",
            name: "Wright",
          },
        },
        productionDate: "2020",
        url: "test-url/artwork/an-artwork",
        width: {
          "@type": "Distance",
          name: "1 in",
        },
        height: {
          "@type": "Distance",
          name: "2 in",
        },
        artMedium: "Oil on canvas",
        artform: "Painting",
        dateCreated: "2020",
      })
    })

    describe("Artwork availability", () => {
      it("Renders InStock when 'for sale'", () => {
        renderWithRelay({
          Artwork: () => ({
            ...defaultArtwork,
            listPrice: {
              __typename: "Money",
              major: 1000,
              currencyCode: "USD",
            },
          }),
        })

        const data = getSchemaData()
        expect(data.offers.availability).toBe("https://schema.org/InStock")
      })

      it("Renders OutOfStock when not 'for sale'", () => {
        renderWithRelay({
          Artwork: () => ({
            ...defaultArtwork,
            availability: "sold",
            listPrice: {
              __typename: "Money",
              major: 1000,
              currencyCode: "USD",
            },
          }),
        })

        const data = getSchemaData()
        expect(data.offers.availability).toBe("https://schema.org/OutOfStock")
      })
    })

    describe("Artwork price", () => {
      it("renders CreativeWork when price is hidden", () => {
        renderWithRelay({
          Artwork: () => ({
            ...defaultArtwork,
            isPriceHidden: true,
          }),
        })

        const data = getSchemaData()
        expect(data["@type"]).toBe("VisualArtwork")
        expect(data.offers).toBeUndefined()
      })

      it("Renders AggregateOffer when price range", () => {
        renderWithRelay({
          Artwork: () => ({
            ...defaultArtwork,
            listPrice: {
              __typename: "PriceRange",
              maxPrice: {
                major: 1000,
              },
              minPrice: {
                major: 100,
                currencyCode: "USD",
              },
            },
          }),
        })

        const data = getSchemaData()
        expect(data.offers).toEqual({
          "@type": "AggregateOffer",
          lowPrice: 100,
          highPrice: 1000,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "ArtGallery",
            image: "partner-image",
            name: "Wright",
          },
        })
      })

      it("renders CreativeWork when price range and no low bound", () => {
        renderWithRelay({
          Artwork: () => ({
            ...defaultArtwork,
            listPrice: {
              __typename: "PriceRange",
              minPrice: null,
              maxPrice: {
                major: 1000,
              },
            },
          }),
        })

        const data = getSchemaData()
        expect(data["@type"]).toBe("VisualArtwork")
        expect(data.offers).toBeUndefined()
      })

      it("Does not render seller within offer when profile image (required) is not present", () => {
        renderWithRelay({
          Artwork: () => ({
            ...defaultArtwork,
            partner: {
              id: "partner-id",
              name: "Wright",
              type: "Gallery",
              profile: {
                id: "profile-id",
                image: null,
              },
            },
            listPrice: {
              __typename: "Money",
              major: 1000,
              currencyCode: "USD",
            },
          }),
        })

        const data = getSchemaData()
        expect(data.offers.seller).toBeUndefined()
      })
    })

    describe("Artwork dimensions", () => {
      it("renders no dimensions when dimensions aren't parseable", () => {
        renderWithRelay({
          Artwork: () => ({
            ...defaultArtwork,
            dimensions: {
              in: "one point twenty one gigawatts",
              cm: null,
            },
          }),
        })

        const data = getSchemaData()
        expect(data.width).toBeUndefined()
        expect(data.height).toBeUndefined()
        expect(data.depth).toBeUndefined()
      })

      it("renders width and height when given two dimensions", () => {
        renderWithRelay({
          Artwork: () => ({
            ...defaultArtwork,
            dimensions: {
              in: "2 × 4 in",
              cm: null,
            },
          }),
        })

        const data = getSchemaData()
        expect(data.width).toEqual({
          "@type": "Distance",
          name: "2 in",
        })
        expect(data.height).toEqual({
          "@type": "Distance",
          name: "4 in",
        })
        expect(data.depth).toBeUndefined()
      })

      it("renders width, height, and depth when given three dimensions", () => {
        renderWithRelay({
          Artwork: () => ({
            ...defaultArtwork,
            dimensions: {
              in: "2 × 4 × 6 in",
              cm: null,
            },
          }),
        })

        const data = getSchemaData()
        expect(data.width).toEqual({
          "@type": "Distance",
          name: "2 in",
        })
        expect(data.height).toEqual({
          "@type": "Distance",
          name: "4 in",
        })
        expect(data.depth).toEqual({
          "@type": "Distance",
          name: "6 in",
        })
      })

      it("successfully handles case when no dimensions are present", () => {
        renderWithRelay({
          Artwork: () => ({
            ...defaultArtwork,
            dimensions: null,
          }),
        })

        const data = getSchemaData()
        expect(data.width).toBeUndefined()
        expect(data.height).toBeUndefined()
        expect(data.depth).toBeUndefined()
      })
    })
  })
})
