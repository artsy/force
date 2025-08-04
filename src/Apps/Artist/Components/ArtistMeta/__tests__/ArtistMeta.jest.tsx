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
  describe("OpenGraph tags", () => {
    it("renders artist OpenGraph tags", () => {
      renderWithRelay({
        Artist: () => ({
          slug: "example-artist",
          href: "/artist/example-artist",
          meta: { description: null, title: "Example Artist" },
        }),
      })

      expect(getMetaBy({ property: "og:url" })).not.toBeNull()
      expect(getMetaBy({ property: "og:type" })).not.toBeNull()
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
