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
})
