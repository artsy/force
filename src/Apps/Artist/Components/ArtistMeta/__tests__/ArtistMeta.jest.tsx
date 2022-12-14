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
})
