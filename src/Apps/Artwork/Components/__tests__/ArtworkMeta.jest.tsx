import { mount } from "enzyme"
import { MockBoot } from "DevTools/MockBoot"
import { ArtworkMeta } from "Apps/Artwork/Components/ArtworkMeta"
import { ArtworkMeta_artwork$data } from "__generated__/ArtworkMeta_artwork.graphql"

jest.mock("Utils/getENV", () => ({
  getENV: (name: string) => {
    return {
      APP_URL: "https://www.artsy.net",
      GEMINI_CLOUDFRONT_URL: "",
    }[name]
  },
}))

describe("ArtworkMeta", () => {
  const getTags = () => {
    const meta = [...document.getElementsByTagName("meta")].map(tag => ({
      name: tag.getAttribute("name"),
      property: tag.getAttribute("property"),
      content: tag.getAttribute("content"),
    }))

    return { meta }
  }

  afterEach(() => {
    document.getElementsByTagName("html")[0].innerHTML = ""
  })

  describe("unlisted artworks", () => {
    const artwork: ArtworkMeta_artwork$data = {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      " $fragmentRef": null,
      " $refType": null,
      isUnlisted: true,
      internalID: "662658cd2bfa240016cd95fe",
      href: "https://staging.artsy.net/artwork/662658cd2bfa240016cd95fe",
      isShareable: true,
      metaImage: {
        resized: null,
      },
      meta: {
        description: "The loveliest artwork",
        longDescription: null,
        title: "Fancy art",
      },
    }

    it("renders a noindex meta tag for robots", () => {
      mount(
        <MockBoot>
          <ArtworkMeta artwork={artwork} />
        </MockBoot>
      )

      const tags = getTags()

      expect(tags.meta.find(tag => tag.name === "robots")).toEqual({
        name: "robots",
        property: null,
        content: "noindex, follow",
      })
    })
  })

  describe("listed artworks", () => {
    const artwork: ArtworkMeta_artwork$data = {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      " $fragmentRef": null,
      " $refType": null,
      isUnlisted: false,
      internalID: "662658cd2bfa240016cd95fe",
      href: "https://staging.artsy.net/artwork/artist-name-artwork-title",
      isShareable: true,
      metaImage: {
        resized: null,
      },
      meta: {
        description: "The loveliest artwork",
        longDescription: null,
        title: "Fancy art",
      },
    }

    it("does not render robot meta tags", () => {
      mount(
        <MockBoot>
          <ArtworkMeta artwork={artwork} />
        </MockBoot>
      )

      const tags = getTags()

      expect(tags.meta.find(tag => tag.name === "robots")).toEqual(undefined)
    })

    it("renders a noindex meta tag for robots when private artwork URL visited", () => {
      const updated_artwork = Object.assign({}, artwork, {
        href: "https://staging.artsy.net/artwork/662658cd2bfa240016cd95fe",
      })

      mount(
        <MockBoot>
          <ArtworkMeta artwork={updated_artwork} />
        </MockBoot>
      )

      const tags = getTags()

      expect(tags.meta.find(tag => tag.name === "robots")).toEqual({
        name: "robots",
        property: null,
        content: "noindex, follow",
      })
    })
  })
})
