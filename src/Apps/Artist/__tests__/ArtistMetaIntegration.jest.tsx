import { ArtistAppFragmentContainer } from "Apps/Artist/ArtistApp"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { HeadProvider } from "react-head"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const mockLocation = { pathname: "/artist/andy-warhol", query: {} }

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: { location: mockLocation, params: { artistID: "andy-warhol" } },
  }),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <HeadProvider>
        <ArtistAppFragmentContainer artist={props.artist}>
          <div data-testid="artist-content">Content goes here</div>
        </ArtistAppFragmentContainer>
      </HeadProvider>
    )
  },
  query: graphql`
    query ArtistMetaIntegration_Test_Query @relay_test_operation {
      artist(id: "andy-warhol") {
        ...ArtistApp_artist
      }
    }
  `,
})

const getMetaBy = (selectors: Record<string, string>): Element | null => {
  const attributeSelectors = Object.entries(selectors).map(
    ([key, value]) => `[${key}='${value}']`,
  )
  const querySelector = `meta${attributeSelectors.join("")}`
  const matchingTag = document.querySelector(querySelector)
  return matchingTag
}

describe("Artist Meta Integration Tests", () => {
  beforeEach(() => {
    // Clear any existing meta tags
    const existingMeta = document.querySelectorAll("meta, title, link")
    existingMeta.forEach(tag => tag.remove())
  })

  describe("Artist header-level meta tags", () => {
    it("renders basic meta tags from ArtistApp", () => {
      const artist = {
        slug: "andy-warhol",
        name: "Andy Warhol",
        nationality: "American",
        birthday: "August 6, 1928",
        deathday: "February 22, 1987",
        alternateNames: ["Andrew Warhola", "Andrew Warhola Jr."],
        href: "/artist/andy-warhol",
        isInSeoExperiment: false,
        internalID: "4d8b92b34eb68a1b2c0003f4",
        meta: {
          title: "Andy Warhol - Artworks, Bio & Shows on Artsy",
          description:
            "Find the latest shows, biography, and artworks for sale by Andy Warhol",
        },
        coverArtwork: {
          image: {
            large: "https://example.com/image.jpg",
          },
        },
      }

      renderWithRelay({ Artist: () => artist })

      // Basic meta tags
      expect(
        getMetaBy({ name: "description", content: artist.meta.description }),
      ).not.toBeNull()

      // OpenGraph tags
      expect(getMetaBy({ property: "og:url" })).not.toBeNull()

      expect(getMetaBy({ property: "og:type" })).not.toBeNull()

      expect(
        getMetaBy({ property: "og:nationality", content: artist.nationality }),
      ).not.toBeNull()

      expect(
        getMetaBy({ property: "og:birthyear", content: artist.birthday }),
      ).not.toBeNull()

      expect(
        getMetaBy({ property: "og:deathyear", content: artist.deathday }),
      ).not.toBeNull()

      // Alternate names
      expect(
        getMetaBy({
          name: "skos:prefLabel",
          content: "Andrew Warhola; Andrew Warhola Jr.",
        }),
      ).not.toBeNull()

      // Structured data
      const structuredDataTag = document.querySelector(
        "script[type='application/ld+json']",
      )
      expect(structuredDataTag).not.toBeNull()

      // Canonical link
      const canonicalLink = document.querySelector("link[rel='canonical']")
      expect(canonicalLink?.getAttribute("href")).toEqual("/artist/andy-warhol")
    })

    it("handles missing optional data gracefully", () => {
      const artist = {
        slug: "unknown-artist",
        name: "Unknown Artist",
        nationality: null,
        birthday: null,
        deathday: null,
        alternateNames: [],
        href: "/artist/unknown-artist",
        isInSeoExperiment: false,
        internalID: "unknown-id",
        meta: {
          title: "Unknown Artist",
          description: "Unknown artist description",
        },
        coverArtwork: null,
      }

      renderWithRelay({ Artist: () => artist })

      // Optional tags should not be present
      expect(getMetaBy({ property: "og:nationality" })).toBeNull()
      expect(getMetaBy({ property: "og:birthyear" })).toBeNull()
      expect(getMetaBy({ property: "og:deathyear" })).toBeNull()
      expect(getMetaBy({ name: "skos:prefLabel" })).toBeNull()

      // Required tags should still be present
      expect(
        getMetaBy({ name: "description", content: artist.meta.description }),
      ).not.toBeNull()
      expect(getMetaBy({ property: "og:url" })).not.toBeNull()
      expect(getMetaBy({ property: "og:type" })).not.toBeNull()
    })
  })

  describe("SEO experiment canonical handling", () => {
    it("handles SEO experiment canonical URLs", () => {
      const artist = {
        slug: "andy-warhol",
        name: "Andy Warhol",
        href: "/artist/andy-warhol",
        isInSeoExperiment: true,
        internalID: "4d8b92b34eb68a1b2c0003f4",
        meta: {
          title: "Andy Warhol - Artworks, Bio & Shows on Artsy",
          description:
            "Find the latest shows, biography, and artworks for sale by Andy Warhol",
        },
      }

      renderWithRelay({ Artist: () => artist })

      const canonicalLink = document.querySelector("link[rel='canonical']")
      expect(canonicalLink).not.toBeNull()
      // The useCanonicalHref hook should handle SEO experiment logic
    })
  })
})
