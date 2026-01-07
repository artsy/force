import { ArtistMetaFragmentContainer } from "Apps/Artist/Components/ArtistMeta/ArtistMeta"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { HeadProvider } from "react-head"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const mockLocation = { pathname: "example", query: {} }

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: { location: mockLocation },
  }),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <HeadProvider>
        <ArtistMetaFragmentContainer artist={props.artist} />
      </HeadProvider>
    )
  },
  query: graphql`
    query ArtistMeta_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistMeta_artist
      }
    }
  `,
})

const getMetaBy = (selectors): Element | null => {
  const attributeSelectors = Object.entries(selectors).map(
    ([key, value]) => `[${key}='${value}']`,
  )
  const querySelector = `meta${attributeSelectors.join("")}`
  const matchingTag = document.querySelector(querySelector) // eslint-disable no-node-access
  return matchingTag
}

describe("AdminMeta", () => {
  describe("canonical link", () => {
    beforeEach(() => {
      mockLocation.query = {}
      mockLocation.pathname = "/artist/example-artist"
    })

    it("renders basic canonical URL", () => {
      renderWithRelay({
        Artist: () => ({
          href: "/artist/example-artist",
        }),
      })

      const linkTag = document.querySelector("link[rel='canonical']")
      expect(linkTag?.getAttribute("href")).toEqual("/artist/example-artist")
    })

    it("strips query parameters from canonical URL", () => {
      mockLocation.query = {
        sort: "recently_updated",
        price_range: "1000-5000",
        additional_gene_ids: ["prints"],
      }

      renderWithRelay({
        Artist: () => ({
          href: "/artist/picasso",
        }),
      })

      const linkTag = document.querySelector("link[rel='canonical']")
      expect(linkTag?.getAttribute("href")).toEqual("/artist/picasso")
    })

    it("includes page parameter in canonical URL when page > 1", () => {
      mockLocation.query = {
        page: "3",
      }

      renderWithRelay({
        Artist: () => ({
          href: "/artist/picasso",
        }),
      })

      const linkTag = document.querySelector("link[rel='canonical']")
      expect(linkTag?.getAttribute("href")).toEqual("/artist/picasso?page=3")
    })

    it("includes page parameter but strips other query parameters", () => {
      mockLocation.query = {
        page: "2",
        sort: "recently_updated",
        additional_gene_ids: ["prints"],
        price_range: "1000-5000",
      }

      renderWithRelay({
        Artist: () => ({
          href: "/artist/picasso",
        }),
      })

      const linkTag = document.querySelector("link[rel='canonical']")
      expect(linkTag?.getAttribute("href")).toEqual("/artist/picasso?page=2")
    })

    it("uses base URL when page is 1", () => {
      mockLocation.query = {
        page: "1",
        sort: "recently_updated",
      }

      renderWithRelay({
        Artist: () => ({
          href: "/artist/picasso",
        }),
      })

      const linkTag = document.querySelector("link[rel='canonical']")
      expect(linkTag?.getAttribute("href")).toEqual("/artist/picasso")
    })

    it("does not render meta tags on CV route", () => {
      mockLocation.pathname = "/artist/banksy/cv"

      renderWithRelay({
        Artist: () => ({
          href: "/artist/banksy",
        }),
      })

      const linkTag = document.querySelector("link[rel='canonical']")
      expect(linkTag).toBeNull()
    })
  })

  describe("without an artist description", () => {
    it("renders the default description", () => {
      renderWithRelay({
        Artist: () => ({
          href: "/artist/example-artist",
          meta: { description: null, title: "Example Artist" },
        }),
      })

      const defaultDescription =
        "Artsy is the world’s largest online art marketplace. Browse over 1 million artworks by iconic and emerging artists from 4000+ galleries and top auction houses."

      expect(
        getMetaBy({ name: "description" })?.getAttribute("content"),
      ).toEqual(defaultDescription)

      expect(
        getMetaBy({ property: "og:description" })?.getAttribute("content"),
      ).toEqual(defaultDescription)

      expect(
        getMetaBy({ property: "twitter:description" })?.getAttribute("content"),
      ).toEqual(defaultDescription)
    })
  })

  describe("with an artist that has a description", () => {
    it("renders meta tags with that description", () => {
      const artist = {
        href: "/artist/example-artist",
        meta: {
          description: "Very important painter!",
          title: "Example Artist",
        },
      }
      renderWithRelay({ Artist: () => artist })

      expect(
        getMetaBy({
          name: "description",
          content: artist.meta.description,
        }),
      ).not.toBeNull()

      expect(
        getMetaBy({
          property: "og:description",
          content: artist.meta.description,
        }),
      ).not.toBeNull()

      expect(
        getMetaBy({
          property: "twitter:description",
          content: artist.meta.description,
        }),
      ).not.toBeNull()
    })
  })

  describe("og tags", () => {
    it("renders them", () => {
      const artist = {
        slug: "andy-warhol",
        href: "/artist/andy-warhol",
        meta: { description: null, title: "Andy Warhol" },
      }
      renderWithRelay({ Artist: () => artist })

      expect(
        getMetaBy({
          property: "og:url",
          href: "undefined/artist/andy-warhol",
        }),
      ).not.toBeNull()

      expect(
        getMetaBy({
          property: "og:type",
          href: "undefined:artist",
        }),
      ).not.toBeNull()
    })
  })

  describe("optional og tags", () => {
    it("skips rendering them without the data", () => {
      const artist = {
        birthday: null,
        deathday: null,
        nationality: null,
        href: "/artist/example-artist",
        meta: { description: null, title: "Example Artist" },
      }
      renderWithRelay({ Artist: () => artist })

      expect(getMetaBy({ property: "og:birthyear" })).toBeNull()
      expect(getMetaBy({ property: "og:deathyear" })).toBeNull()
      expect(getMetaBy({ property: "og:nationality" })).toBeNull()
    })

    it("renders them with the data", () => {
      const artist = {
        birthday: "March 9",
        deathday: "June 7",
        nationality: "American",
        href: "/artist/example-artist",
        meta: { description: null, title: "Example Artist" },
      }
      renderWithRelay({ Artist: () => artist })

      expect(
        getMetaBy({ property: "og:birthyear", content: artist.birthday }),
      ).not.toBeNull()
      expect(
        getMetaBy({ property: "og:deathyear", content: artist.deathday }),
      ).not.toBeNull()
      expect(
        getMetaBy({ property: "og:nationality", content: artist.nationality }),
      ).not.toBeNull()
    })
  })

  describe("alternate names", () => {
    it("skips rendering them without the data", () => {
      const artist = {
        alternateNames: [],
        href: "/artist/example-artist",
        meta: { description: null, title: "Example Artist" },
      }
      renderWithRelay({ Artist: () => artist })
      expect(getMetaBy({ name: "skos:prefLabel" })).toBeNull()
    })

    it("renders them with the data", () => {
      const artist = {
        alternateNames: ["Bonnie", "Betty"],
        href: "/artist/example-artist",
        meta: { description: null, title: "Example Artist" },
      }
      renderWithRelay({ Artist: () => artist })
      expect(
        getMetaBy({ name: "skos:prefLabel", content: "Bonnie; Betty" }),
      ).not.toBeNull()
    })
  })

  describe("structured data", () => {
    it("renders", () => {
      const artist = {
        href: "/artist/example-artist",
        meta: { description: null, title: "Example Artist" },
      }
      renderWithRelay({ Artist: () => artist })
      const structuredDataTag = document.querySelector(
        "script[type='application/ld+json']",
      )
      expect(structuredDataTag).not.toBeNull()
    })
  })
})
