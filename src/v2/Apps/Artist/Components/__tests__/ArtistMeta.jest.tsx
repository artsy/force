import { ArtistMeta_artist } from "v2/__generated__/ArtistMeta_artist.graphql"
import {
  offersAttributes,
  productAttributes,
  sellerFromPartner,
  structuredDataAttributes,
} from "../ArtistMeta"

jest.mock("sharify", () => ({
  data: {
    APP_URL: "https://www.artsy-test.net",
  },
}))

describe("Meta", () => {
  const artist: ArtistMeta_artist = {
    " $refType": null,
    " $fragmentRefs": null,
    slug: "claes-oldenburg",
    name: "Claes Oldenburg",
    nationality: "Swedish",
    birthday: "1929",
    alternate_names: null,
    counts: null,
    blurb: null,
    deathday: null,
    gender: "male",
    href: "/artist/claes-oldenburg",
    meta: {
      title: "cool art",
      description:
        "Find the latest shows, biography, and artworks for sale by Claes Oldenburg. “I am for an art that is political-erotical-mystical, that does something more th…",
    },
    image: {
      versions: ["small", "large"],
      large:
        "https://d32dm0rphc51dk.cloudfront.net/6q6LeyKvA_vpT5YzHRSNUA/large.jpg",
      square:
        "https://d32dm0rphc51dk.cloudfront.net/6q6LeyKvA_vpT5YzHRSNUA/square.jpg",
    },
    artworks_connection: {
      edges: [
        {
          node: {
            date: "1993",
            title:
              "'25 Years Studio',  1993, SIGNED by the BIG-8 Contemporary Artists, Gemini G.E.L.",
            availability: "for sale",
            description: null,
            category: "Drawing, Collage or other Work on Paper",
            price_currency: "USD",
            listPrice: {
              __typename: "Money",
              major: 1000,
              currencyCode: "USD",
            },
            href:
              "/artwork/robert-rauschenberg-25-years-studio-1993-signed-by-the-big-8-contemporary-artists-gemini-gel",
            image: {
              small:
                "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/small.jpg",
              large:
                "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/large.jpg",
            },
            partner: {
              name: "VINCE fine arts/ephemera",
              href: "/vince-fine-arts-slash-ephemera",
              profile: {
                image: {
                  small:
                    "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
                  large:
                    "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
                },
              },
            },
          },
        },
      ],
    },
  }

  type ArtworkMeta = ArtistMeta_artist["artworks_connection"]["edges"][number]["node"]

  const artistWithArtworkOverrides = (
    artwork: Partial<ArtworkMeta>
  ): ArtistMeta_artist => {
    return {
      ...artist,
      artworks_connection: {
        edges: [
          {
            node: {
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
        name: "Claes Oldenburg",
        url: "https://www.artsy-test.net/artist/claes-oldenburg",
        gender: "male",
        image:
          "https://d32dm0rphc51dk.cloudfront.net/6q6LeyKvA_vpT5YzHRSNUA/large.jpg",
        birthDate: "1929",
        mainEntityOfPage: "https://www.artsy-test.net/artist/claes-oldenburg",
        description:
          "Find the latest shows, biography, and artworks for sale by Claes Oldenburg. “I am for an art that is political-erotical-mystical, that does something more th…",
        nationality: {
          "@type": "Country",
          name: "Swedish",
        },
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
              name: "VINCE fine arts/ephemera",
              url: "https://www.artsy-test.net/vince-fine-arts-slash-ephemera",
              image: {
                "@type": "ImageObject",
                thumbnailUrl:
                  "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
              },
            },
          },
        ],
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
              url:
                "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/large.jpg",
              thumbnailUrl:
                "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/small.jpg",
            },
            productionDate: "1993",
            name:
              "'25 Years Studio',  1993, SIGNED by the BIG-8 Contemporary Artists, Gemini G.E.L.",
            offers: {
              "@type": "Offer",
              availability: "InStock",
              price: 1000,
              priceCurrency: "USD",
            },
            url:
              "https://www.artsy-test.net/artwork/robert-rauschenberg-25-years-studio-1993-signed-by-the-big-8-contemporary-artists-gemini-gel",
          },
          priceCurrency: "USD",
          seller: {
            "@context": "http://schema.org",
            "@type": "ArtGallery",
            name: "VINCE fine arts/ephemera",
            url: "https://www.artsy-test.net/vince-fine-arts-slash-ephemera",
            image: {
              "@type": "ImageObject",
              thumbnailUrl:
                "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
            },
          },
        },
      ])
    })

    it("#productFromArtistArtwork construct product object from artist/artwork", () => {
      const artwork = artist.artworks_connection.edges[0].node
      const json = productAttributes(artist, artwork)

      expect(json).toEqual({
        "@type": "Product",
        additionalType: "Drawing, Collage or other Work on Paper",
        productionDate: "1993",
        name:
          "'25 Years Studio',  1993, SIGNED by the BIG-8 Contemporary Artists, Gemini G.E.L.",
        offers: {
          "@type": "Offer",
          availability: "InStock",
          price: 1000,
          priceCurrency: "USD",
        },
        url:
          "https://www.artsy-test.net/artwork/robert-rauschenberg-25-years-studio-1993-signed-by-the-big-8-contemporary-artists-gemini-gel",
        image: {
          "@type": "ImageObject",
          thumbnailUrl:
            "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/small.jpg",
          url:
            "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/large.jpg",
        },
        brand: {
          "@type": "Person",
          name: "Claes Oldenburg",
        },
      })
    })

    it("#productFromArtistArtwork doesn't include a product if there's no price", () => {
      const modifiedArtist = artistWithArtworkOverrides({
        listPrice: null,
      })
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
            major: 100,
            currencyCode: "USD",
          },
        } as const,
      })
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
      const artwork = modifiedArtist.artworks_connection.edges[0].node
      const json = productAttributes(modifiedArtist, artwork)
      expect(json).toBeFalsy()
    })

    it("#productFromArtistArtwork with a price range includes an AggregateOffer and low bound if price range only has low bound", () => {
      const modifiedArtist = artistWithArtworkOverrides({
        listPrice: {
          __typename: "PriceRange",
          minPrice: {
            major: 100,
            currencyCode: "USD",
          },
          maxPrice: null,
        } as const,
      })
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
      const partner = artist.artworks_connection.edges[0].node.partner
      const json = sellerFromPartner(partner)
      expect(json).toEqual({
        "@context": "http://schema.org",
        "@type": "ArtGallery",
        name: "VINCE fine arts/ephemera",
        url: "https://www.artsy-test.net/vince-fine-arts-slash-ephemera",
        image: {
          "@type": "ImageObject",
          thumbnailUrl:
            "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
          url:
            "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
        },
      })
    })
  })
})
