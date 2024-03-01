import { ArtistMeta_artist$data } from "__generated__/ArtistMeta_artist.graphql"
import {
  offersAttributes,
  productAttributes,
  sellerFromPartner,
  structuredDataAttributes,
} from "Apps/Artist/Components/ArtistMeta/helpers"

jest.mock("sharify", () => ({
  data: {
    APP_URL: "https://www.artsy-test.net",
  },
}))

describe("Meta", () => {
  const artist: ArtistMeta_artist$data = {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    " $fragmentRefs": null,
    " $refType": null,
    alternate_names: null,
    birthday: "1929",
    blurb: null,
    artworks_connection: {
      edges: [
        {
          node: {
            date: "1993",
            availability: "for sale",
            title:
              "'25 Years Studio',  1993, SIGNED by the BIG-8 Contemporary Artists, Gemini G.E.L.",
            category: "Drawing, Collage or other Work on Paper",
            description: null,
            listPrice: {
              __typename: "Money",
              major: 1000,
              currencyCode: "USD",
            },
            price_currency: "USD",
            href:
              "/artwork/robert-rauschenberg-25-years-studio-1993-signed-by-the-big-8-contemporary-artists-gemini-gel",
            image: {
              large:
                "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/large.jpg",
              small:
                "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/small.jpg",
            },
            partner: {
              href: "/vince-fine-arts-slash-ephemera",
              name: "VINCE fine arts/ephemera",
              profile: {
                image: {
                  large:
                    "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
                  small:
                    "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
                },
              },
            },
          },
        },
      ],
    },
    counts: null,
    deathday: null,
    gender: "male",
    href: "/artist/claes-oldenburg",
    name: "Claes Oldenburg",
    image: {
      large:
        "https://d32dm0rphc51dk.cloudfront.net/6q6LeyKvA_vpT5YzHRSNUA/large.jpg",
      square:
        "https://d32dm0rphc51dk.cloudfront.net/6q6LeyKvA_vpT5YzHRSNUA/square.jpg",
      versions: ["small", "large"],
    },
    slug: "claes-oldenburg",
    meta: {
      title: "Claes Oldenburg - Artworks for Sale & More | Artsy",
      description:
        "Discover and purchase Claes Oldenburg’s artworks, available for sale. Browse our selection of paintings, prints, and sculptures by the artist, and find art you love.",
    },
    nationality: "Swedish",
  }

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  type ArtworkMeta = ArtistMeta_artist["artworks_connection"]["edges"][number]["node"]

  const artistWithArtworkOverrides = (
    artwork: Partial<ArtworkMeta>
  ): ArtistMeta_artist$data => {
    return {
      ...artist,
      artworks_connection: {
        edges: [
          {
            node: {
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              ...artist.artworks_connection.edges[0].node,
              ...artwork,
            },
          },
        ],
      },
    }
  }

  describe("structured data", () => {
    it("Constructs a json object from data", () => {
      const json = structuredDataAttributes(artist)

      expect(json).toEqual({
        additionalType: "Artist",
        birthDate: "1929",
        description:
          "Discover and purchase Claes Oldenburg’s artworks, available for sale. Browse our selection of paintings, prints, and sculptures by the artist, and find art you love.",
        gender: "male",
        mainEntityOfPage: "https://www.artsy-test.net/artist/claes-oldenburg",
        makesOffer: [
          {
            "@type": "Offer",
            availability: "InStock",
            itemOffered: {
              "@type": "Product",
              additionalType: "Drawing, Collage or other Work on Paper",
              brand: {
                "@type": "Person",
                name: "Claes Oldenburg",
              },
              image: {
                "@type": "ImageObject",
                thumbnailUrl:
                  "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/small.jpg",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/large.jpg",
              },
              name:
                "'25 Years Studio',  1993, SIGNED by the BIG-8 Contemporary Artists, Gemini G.E.L.",
              offers: {
                "@type": "Offer",
                availability: "InStock",
                price: 1000,
                priceCurrency: "USD",
              },
              productionDate: "1993",
              url:
                "https://www.artsy-test.net/artwork/robert-rauschenberg-25-years-studio-1993-signed-by-the-big-8-contemporary-artists-gemini-gel",
            },
            priceCurrency: "USD",
            seller: {
              "@context": "http://schema.org",
              "@type": "ArtGallery",
              image: {
                "@type": "ImageObject",
                thumbnailUrl:
                  "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
              },
              name: "VINCE fine arts/ephemera",
              url: "https://www.artsy-test.net/vince-fine-arts-slash-ephemera",
            },
          },
        ],
        name: "Claes Oldenburg",
        nationality: {
          "@type": "Country",
          name: "Swedish",
        },
        url: "https://www.artsy-test.net/artist/claes-oldenburg",
      })
    })

    it("Omits empty keys", () => {
      const json = structuredDataAttributes(artist)
      expect(Object.keys(json).includes("deathday")).toBe(false)
    })

    it("#artistToJsonOffers constructs offers array from artist", () => {
      const json = offersAttributes(artist)
      expect(json).toEqual([
        {
          "@type": "Offer",
          availability: "InStock",
          itemOffered: {
            "@type": "Product",
            additionalType: "Drawing, Collage or other Work on Paper",
            brand: {
              "@type": "Person",
              name: "Claes Oldenburg",
            },
            image: {
              "@type": "ImageObject",
              thumbnailUrl:
                "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/small.jpg",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/large.jpg",
            },
            name:
              "'25 Years Studio',  1993, SIGNED by the BIG-8 Contemporary Artists, Gemini G.E.L.",
            offers: {
              "@type": "Offer",
              availability: "InStock",
              price: 1000,
              priceCurrency: "USD",
            },
            productionDate: "1993",
            url:
              "https://www.artsy-test.net/artwork/robert-rauschenberg-25-years-studio-1993-signed-by-the-big-8-contemporary-artists-gemini-gel",
          },
          priceCurrency: "USD",
          seller: {
            "@context": "http://schema.org",
            "@type": "ArtGallery",
            image: {
              "@type": "ImageObject",
              thumbnailUrl:
                "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
            },
            name: "VINCE fine arts/ephemera",
            url: "https://www.artsy-test.net/vince-fine-arts-slash-ephemera",
          },
        },
      ])
    })

    it("#productFromArtistArtwork construct product object from artist/artwork", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const artwork = artist.artworks_connection.edges[0].node
      const json = productAttributes(artist, artwork)

      expect(json).toEqual({
        "@type": "Product",
        additionalType: "Drawing, Collage or other Work on Paper",
        brand: {
          "@type": "Person",
          name: "Claes Oldenburg",
        },
        image: {
          "@type": "ImageObject",
          thumbnailUrl:
            "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/small.jpg",
          url:
            "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/large.jpg",
        },
        name:
          "'25 Years Studio',  1993, SIGNED by the BIG-8 Contemporary Artists, Gemini G.E.L.",
        offers: {
          "@type": "Offer",
          availability: "InStock",
          price: 1000,
          priceCurrency: "USD",
        },
        productionDate: "1993",
        url:
          "https://www.artsy-test.net/artwork/robert-rauschenberg-25-years-studio-1993-signed-by-the-big-8-contemporary-artists-gemini-gel",
      })
    })

    it("#productFromArtistArtwork doesn't include a product if there's no price", () => {
      const modifiedArtist = artistWithArtworkOverrides({
        listPrice: null,
      })
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const artwork = modifiedArtist.artworks_connection.edges[0].node
      const json = productAttributes(modifiedArtist, artwork)
      expect(json).toBeFalsy()
    })

    it("#productFromArtistArtwork with a price range includes an AggregateOffer", () => {
      const modifiedArtist = artistWithArtworkOverrides({
        listPrice: {
          __typename: "PriceRange",
          maxPrice: {
            major: 1000,
          },
          minPrice: {
            currencyCode: "USD",
            major: 100,
          },
        } as const,
      })
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const artwork = modifiedArtist.artworks_connection.edges[0].node
      const json = productAttributes(modifiedArtist, artwork)
      expect(json).toMatchObject({
        offers: {
          "@type": "AggregateOffer",
          highPrice: 1000,
          lowPrice: 100,
        },
      })
    })

    it("#productFromArtistArtwork doesn't include a product if price range doesn't have low bound", () => {
      const modifiedArtist = artistWithArtworkOverrides({
        listPrice: {
          __typename: "PriceRange",
          maxPrice: {
            major: 1000,
          },
          minPrice: null,
        } as const,
      })
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const artwork = modifiedArtist.artworks_connection.edges[0].node
      const json = productAttributes(modifiedArtist, artwork)
      expect(json).toBeFalsy()
    })

    it("#productFromArtistArtwork with a price range includes an AggregateOffer and low bound if price range only has low bound", () => {
      const modifiedArtist = artistWithArtworkOverrides({
        listPrice: {
          __typename: "PriceRange",
          maxPrice: null,
          minPrice: {
            currencyCode: "USD",
            major: 100,
          },
        } as const,
      })
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const artwork = modifiedArtist.artworks_connection.edges[0].node
      const json = productAttributes(modifiedArtist, artwork)
      expect(json).toMatchObject({
        offers: {
          "@type": "AggregateOffer",
          lowPrice: 100,
        },
      })
    })

    it("#sellerFromPartner constructs seller object from partner", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const partner = artist.artworks_connection.edges[0].node.partner
      const json = sellerFromPartner(partner)
      expect(json).toEqual({
        "@context": "http://schema.org",
        "@type": "ArtGallery",
        image: {
          "@type": "ImageObject",
          thumbnailUrl:
            "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
          url:
            "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
        },
        name: "VINCE fine arts/ephemera",
        url: "https://www.artsy-test.net/vince-fine-arts-slash-ephemera",
      })
    })
  })
})
