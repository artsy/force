import { MockBoot } from "DevTools/MockBoot"
import { ArtworkMeta } from "Apps/Artwork/Components/ArtworkMeta"
import { useRouter } from "System/Hooks/useRouter"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkMeta_Test_Query } from "__generated__/ArtworkMeta_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter")

jest.mock("Utils/getENV", () => ({
  getENV: (name: string) => {
    return {
      APP_URL: "https://www.artsy.net",
      GEMINI_CLOUDFRONT_URL: "",
    }[name]
  },
}))

describe("ArtworkMeta", () => {
  const mockUseRouter = useRouter as jest.Mock

  const { renderWithRelay } = setupTestWrapperTL<ArtworkMeta_Test_Query>({
    Component: props => (
      <MockBoot>
        <ArtworkMeta artwork={props.artwork!} />
      </MockBoot>
    ),
    query: graphql`
      query ArtworkMeta_Test_Query {
        artwork(id: "example") {
          ...ArtworkMeta_artwork
        }
      }
    `,
  })

  const getTags = () => {
    const meta = [...document.getElementsByTagName("meta")].map(tag => ({
      name: tag.getAttribute("name"),
      property: tag.getAttribute("property"),
      content: tag.getAttribute("content"),
    }))

    return { meta }
  }

  const listedArtworkID =
    "https://staging.artsy.net/artwork/artist-name-artwork-title"

  const unlistedArtworkID =
    "https://staging.artsy.net/artwork/662658cd2bfa240016cd95fe"

  afterEach(() => {
    document.getElementsByTagName("html")[0].innerHTML = ""
  })

  describe("unlisted artworks", () => {
    it("renders a noindex meta tag for robots", () => {
      mockUseRouter.mockReturnValue({
        match: {
          location: {
            pathname: unlistedArtworkID,
          },
        },
      })

      renderWithRelay({
        Artwork: () => ({
          isUnlisted: true,
        }),
      })

      const tags = getTags()

      expect(tags.meta.find(tag => tag.name === "robots")).toEqual({
        name: "robots",
        property: null,
        content: "noindex, follow",
      })
    })

    it("renders a noindex meta tag for robots when private artwork URL visited", () => {
      mockUseRouter.mockReturnValue({
        match: {
          location: {
            pathname: unlistedArtworkID,
          },
        },
      })

      renderWithRelay({
        Artwork: () => ({
          internalID: "662658cd2bfa240016cd95fe",
        }),
      })

      const tags = getTags()

      expect(tags.meta.find(tag => tag.name === "robots")).toEqual({
        name: "robots",
        property: null,
        content: "noindex, follow",
      })
    })
  })

  describe("listed artworks", () => {
    it("does not render robot meta tags", () => {
      mockUseRouter.mockReturnValue({
        match: {
          location: {
            pathname: listedArtworkID,
          },
        },
      })

      renderWithRelay({
        Artwork: () => ({
          href: listedArtworkID,
          isUnlisted: false,
        }),
      })

      const tags = getTags()

      expect(tags.meta.find(tag => tag.name === "robots")).toEqual(undefined)
    })
  })
})
