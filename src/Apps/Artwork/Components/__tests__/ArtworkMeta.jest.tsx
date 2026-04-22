import { act } from "@testing-library/react"
import { useUnleashContext, useVariant } from "@unleash/proxy-client-react"
import { ArtworkMeta } from "Apps/Artwork/Components/ArtworkMeta"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useRouter } from "System/Hooks/useRouter"
import { useTrackFeatureVariantOnMount } from "System/Hooks/useTrackFeatureVariant"
import type { ArtworkMeta_Test_Query } from "__generated__/ArtworkMeta_Test_Query.graphql"
import { graphql } from "react-relay"

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

jest.mock("@unleash/proxy-client-react", () => ({
  useUnleashContext: jest.fn(),
  useVariant: jest.fn(),
}))

jest.mock("System/Hooks/useTrackFeatureVariant", () => ({
  useTrackFeatureVariantOnMount: jest.fn(),
}))

describe("ArtworkMeta", () => {
  const mockUseRouter = useRouter as jest.Mock
  const mockUseUnleashContext = useUnleashContext as jest.Mock
  const mockUseVariant = useVariant as jest.Mock
  const mockUseTrackFeatureVariantOnMount =
    useTrackFeatureVariantOnMount as jest.Mock

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

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({
      match: { location: { pathname: "/artwork/some-slug" } },
    })
    mockUseUnleashContext.mockReturnValue(jest.fn(() => Promise.resolve()))
    mockUseVariant.mockReturnValue({ name: "disabled", enabled: false })
  })

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

  describe("experiment tracking", () => {
    it("passes the artwork internalID to the Unleash context", () => {
      const updateContext = jest.fn(() => Promise.resolve())
      mockUseUnleashContext.mockReturnValue(updateContext)

      renderWithRelay({ Artwork: () => ({ internalID: "artwork-123" }) })

      expect(updateContext).toHaveBeenCalledWith({
        properties: { artworkId: "artwork-123" },
      })
    })

    it("does not track before the Unleash context has been updated", () => {
      const updateContext = jest.fn(() => new Promise<void>(() => {}))
      mockUseUnleashContext.mockReturnValue(updateContext)
      mockUseVariant.mockReturnValue({ name: "control", enabled: true })

      renderWithRelay({ Artwork: () => ({ internalID: "artwork-123" }) })

      expect(mockUseTrackFeatureVariantOnMount).toHaveBeenCalledWith(
        expect.objectContaining({ variantName: "disabled" }),
      )
    })

    it("tracks the correct variant after the Unleash context resolves", async () => {
      let resolveContext!: () => void
      const updateContext = jest.fn(() => {
        return new Promise<void>(resolve => {
          resolveContext = resolve
        })
      })
      mockUseUnleashContext.mockReturnValue(updateContext)
      mockUseVariant.mockReturnValue({ name: "experiment", enabled: true })

      renderWithRelay({ Artwork: () => ({ internalID: "artwork-123" }) })

      await act(async () => {
        resolveContext()
      })

      expect(mockUseTrackFeatureVariantOnMount).toHaveBeenLastCalledWith({
        experimentName: "diamond_artwork-title-experiment",
        variantName: "experiment",
      })
    })
  })
})
