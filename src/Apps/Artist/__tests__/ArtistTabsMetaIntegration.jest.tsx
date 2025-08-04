import { ArtistOverviewRouteFragmentContainer } from "Apps/Artist/Routes/Overview/ArtistOverviewRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { HeadProvider } from "react-head"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const mockLocation = { pathname: "/artist/andy-warhol/about", query: {} }

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: { location: mockLocation, params: { artistID: "andy-warhol" } },
  }),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <HeadProvider>
        <ArtistOverviewRouteFragmentContainer artist={props.artist} />
      </HeadProvider>
    )
  },
  query: graphql`
    query ArtistTabsMetaIntegration_AboutTab_Test_Query @relay_test_operation {
      artist(id: "andy-warhol") {
        ...ArtistOverviewRoute_artist
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

describe("Artist Tabs Meta Integration Tests", () => {
  beforeEach(() => {
    // Clear any existing meta tags
    const existingMeta = document.querySelectorAll("meta, title, link")
    existingMeta.forEach(tag => tag.remove())
  })

  describe("About tab", () => {
    it("renders meta tags with content", () => {
      const artist = {
        slug: "andy-warhol",
        name: "Andy Warhol",
        nationality: "American",
        birthday: "August 6, 1928",
        deathday: "February 22, 1987",
        alternateNames: ["Andrew Warhola"],
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
        insights: [{ __typename: "ArtistInsight" }],
        artistSeriesConnection: { totalCount: 1 },
        showsConnection: { totalCount: 1 },
        counts: { artworks: "100", relatedArtists: 5, articles: 3 },
        related: { genes: { edges: [{ node: { __typename: "Gene" } }] } },
      }

      renderWithRelay({ Artist: () => artist })

      // Primary meta tags (from MetaTags component)
      expect(document.querySelector("title")?.textContent).toEqual(
        artist.meta.title,
      )
      expect(
        getMetaBy({ name: "description", content: artist.meta.description }),
      ).not.toBeNull()

      // Artist-specific OpenGraph tags (from ArtistMeta component)
      expect(
        getMetaBy({ property: "og:nationality", content: artist.nationality }),
      ).not.toBeNull()
      expect(
        getMetaBy({ property: "og:birthyear", content: artist.birthday }),
      ).not.toBeNull()
      expect(
        getMetaBy({ property: "og:deathyear", content: artist.deathday }),
      ).not.toBeNull()

      // Canonical link (from MetaTags component)
      const canonicalLink = document.querySelector("link[rel='canonical']")
      expect(canonicalLink?.getAttribute("href")).toBeTruthy()

      // Structured data (from ArtistMeta component)
      const structuredDataTag = document.querySelector(
        "script[type='application/ld+json']",
      )
      expect(structuredDataTag).not.toBeNull()
    })
  })
})
