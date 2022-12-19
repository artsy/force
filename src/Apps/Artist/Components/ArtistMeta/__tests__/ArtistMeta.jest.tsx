import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ArtistMetaFragmentContainer } from "Apps/Artist/Components/ArtistMeta"
import { HeadProvider } from "react-head"

jest.unmock("react-relay")

jest.mock("System/Router/useRouter", () => ({
  useRouter: () => ({
    match: { location: { pathname: "example" } },
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
    ([key, value]) => `[${key}='${value}']`
  )
  const querySelector = `meta${attributeSelectors.join("")}`
  const matchingTag = document.querySelector(querySelector) // eslint-disable no-node-access
  return matchingTag
}

describe("AdminMeta", () => {
  describe("canonical link", () => {
    it("renders", () => {
      const artist = {}
      renderWithRelay({ Artist: () => artist })
      const linkTag = document.querySelector("link[rel='canonical']") // eslint-disable no-node-access
      expect(linkTag?.getAttribute("href")).toEqual(
        "/artist/<Artist-mock-id-1>"
      )
    })
  })

  describe("without an artist description", () => {
    it("renders meta tags with empty content attributes", () => {
      const artist = { meta: { description: null } }
      renderWithRelay({ Artist: () => artist })

      expect(getMetaBy({ name: "description" })).not.toHaveAttribute("content")

      expect(getMetaBy({ property: "og:description" })).not.toHaveAttribute(
        "content"
      )

      expect(
        getMetaBy({ property: "twitter:description" })
      ).not.toHaveAttribute("content")
    })
  })

  describe("with an artist that has a description", () => {
    it("renders meta tags with that description", () => {
      const artist = { meta: { description: "Very important painter!" } }
      renderWithRelay({ Artist: () => artist })

      expect(
        getMetaBy({
          name: "description",
          content: artist.meta.description,
        })
      ).not.toBeNull()

      expect(
        getMetaBy({
          property: "og:description",
          content: artist.meta.description,
        })
      ).not.toBeNull()

      expect(
        getMetaBy({
          property: "twitter:description",
          content: artist.meta.description,
        })
      ).not.toBeNull()
    })
  })

  describe("og tags", () => {
    it("renders them", () => {
      const artist = { slug: "andy-warhol" }
      renderWithRelay({ Artist: () => artist })

      expect(
        getMetaBy({
          property: "og:url",
          href: "undefined/artist/andy-warhol",
        })
      ).not.toBeNull()

      expect(
        getMetaBy({ property: "og:type", href: "undefined:artist" })
      ).not.toBeNull()
    })
  })

  describe("optional og tags", () => {
    it("skips rendering them without the data", () => {
      const artist = { birthday: null, deathday: null, nationality: null }
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
      }
      renderWithRelay({ Artist: () => artist })

      expect(
        getMetaBy({ property: "og:birthyear", content: artist.birthday })
      ).not.toBeNull()
      expect(
        getMetaBy({ property: "og:deathyear", content: artist.deathday })
      ).not.toBeNull()
      expect(
        getMetaBy({ property: "og:nationality", content: artist.nationality })
      ).not.toBeNull()
    })
  })

  describe("alternate names", () => {
    it("skips rendering them without the data", () => {
      const artist = { alternate_names: [] }
      renderWithRelay({ Artist: () => artist })
      expect(getMetaBy({ name: "skos:prefLabel" })).toBeNull()
    })

    it("renders them with the data", () => {
      const artist = { alternate_names: ["Bonnie", "Betty"] }
      renderWithRelay({ Artist: () => artist })
      expect(
        getMetaBy({ name: "skos:prefLabel", content: "Bonnie; Betty" })
      ).not.toBeNull()
    })
  })

  describe("image meta tags", () => {
    it("skips rendering most of them but does render the twitter one as summary", () => {
      const artist = {}
      renderWithRelay({ Artist: () => artist })
      expect(getMetaBy({ name: "thumbnail" })).toBeNull()
      expect(getMetaBy({ property: "og:image" })).toBeNull()
      expect(
        getMetaBy({ property: "twitter:card", content: "summary" })
      ).not.toBeNull()
    })

    it("skips rendering when there is not large version", () => {
      const artist = {
        image: {
          large: "https://www.example.com/image/large.png",
          square: "https://www.example.com/image/square.png",
          versions: ["square"],
        },
      }
      renderWithRelay({ Artist: () => artist })
      expect(getMetaBy({ name: "thumbnail" })).toBeNull()
      expect(getMetaBy({ property: "og:image" })).toBeNull()
      expect(
        getMetaBy({ property: "twitter:card", content: "summary" })
      ).not.toBeNull()
    })

    it("renders them when thee is a large version", () => {
      const artist = {
        image: {
          large: "https://www.example.com/image/large.png",
          square: "https://www.example.com/image/square.png",
          versions: ["large", "square"],
        },
      }
      renderWithRelay({ Artist: () => artist })

      expect(
        getMetaBy({ name: "thumbnail", content: artist.image.square })
      ).not.toBeNull()
      expect(
        getMetaBy({ property: "og:image", content: artist.image.large })
      ).not.toBeNull()
      expect(
        getMetaBy({ property: "twitter:card", content: "summary_large_image" })
      ).not.toBeNull()
    })
  })

  describe("noindex tags", () => {
    it("skips rendering when there is a blurb", () => {
      const artist = { blurb: "Very good artist!" }
      renderWithRelay({ Artist: () => artist })
      expect(getMetaBy({ name: "robots" })).toBeNull()
    })

    it("skips rendering when there are artworks", () => {
      const artist = { counts: { artworks: 1 } }
      renderWithRelay({ Artist: () => artist })
      expect(getMetaBy({ name: "robots" })).toBeNull()
    })

    it("renders when there are no artworks and no blurb", () => {
      const artist = { counts: { artworks: 0 }, blurb: null }
      renderWithRelay({ Artist: () => artist })
      expect(getMetaBy({ name: "robots" })).not.toBeNull()
    })
  })

  describe("structured data", () => {
    it("renders", () => {
      const artist = {}
      renderWithRelay({ Artist: () => artist })
      const structuredDataTag = document.querySelector(
        "script[type='application/ld+json']"
      ) // eslint-disable no-node-access
      expect(structuredDataTag).not.toBeNull()
    })
  })
})
