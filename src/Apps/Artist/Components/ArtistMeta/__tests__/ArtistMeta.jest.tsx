import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ArtistMetaFragmentContainer } from "Apps/Artist/Components/ArtistMeta/ArtistMeta"
import { HeadProvider } from "react-head"

jest.unmock("react-relay")

jest.mock("System/Hooks/useRouter", () => ({
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
      renderWithRelay({
        Artist: () => ({
          href: "/artist/example-artist",
        }),
      })

      const linkTag = document.querySelector("link[rel='canonical']")
      expect(linkTag?.getAttribute("href")).toEqual("/artist/example-artist")
    })
  })

  describe("without an artist description", () => {
    it("renders the default description", () => {
      renderWithRelay({ Artist: () => ({ meta: { description: null } }) })

      const defaultDescription = `Artsy is the world’s largest online art marketplace. Browse over 1 million artworks by iconic and emerging artists from 4000+ galleries and top auction houses.`

      expect(
        getMetaBy({ name: "description" })?.getAttribute("content")
      ).toEqual(defaultDescription)

      expect(
        getMetaBy({ property: "og:description" })?.getAttribute("content")
      ).toEqual(defaultDescription)

      expect(
        getMetaBy({ property: "twitter:description" })?.getAttribute("content")
      ).toEqual(defaultDescription)
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
      const artist = { alternateNames: [] }
      renderWithRelay({ Artist: () => artist })
      expect(getMetaBy({ name: "skos:prefLabel" })).toBeNull()
    })

    it("renders them with the data", () => {
      const artist = { alternateNames: ["Bonnie", "Betty"] }
      renderWithRelay({ Artist: () => artist })
      expect(
        getMetaBy({ name: "skos:prefLabel", content: "Bonnie; Betty" })
      ).not.toBeNull()
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
