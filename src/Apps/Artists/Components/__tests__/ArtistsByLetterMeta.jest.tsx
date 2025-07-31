import { MockBoot } from "DevTools/MockBoot"
import { render } from "@testing-library/react"
import { ArtistsByLetterMeta } from "Apps/Artists/Components/ArtistsByLetterMeta"

const mockUseRouter = jest.fn()

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => mockUseRouter(),
}))

jest.mock("Utils/getENV", () => ({
  getENV: (key: string) => {
    if (key === "APP_URL") return "https://artsy.net"
    return ""
  },
}))

describe("ArtistsByLetterMeta", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("canonical URLs", () => {
    it("should generate clean canonical URL for page 1 (no page param)", () => {
      mockUseRouter.mockReturnValue({
        match: {
          params: { letter: "d" },
          location: { query: {} },
        },
      })

      render(
        <MockBoot>
          <ArtistsByLetterMeta />
        </MockBoot>,
      )

      const canonicalLink = document.querySelector('link[rel="canonical"]')
      expect(canonicalLink?.getAttribute("href")).toBe(
        "https://artsy.net/artists/artists-starting-with-d",
      )
    })

    it("should generate clean canonical URL for page 1 (explicit page=1)", () => {
      mockUseRouter.mockReturnValue({
        match: {
          params: { letter: "d" },
          location: { query: { page: "1" } },
        },
      })

      render(
        <MockBoot>
          <ArtistsByLetterMeta />
        </MockBoot>,
      )

      const canonicalLink = document.querySelector('link[rel="canonical"]')
      expect(canonicalLink?.getAttribute("href")).toBe(
        "https://artsy.net/artists/artists-starting-with-d",
      )
    })

    it("should include page parameter in canonical URL for page 2+", () => {
      mockUseRouter.mockReturnValue({
        match: {
          params: { letter: "d" },
          location: { query: { page: "3" } },
        },
      })

      render(
        <MockBoot>
          <ArtistsByLetterMeta />
        </MockBoot>,
      )

      const canonicalLink = document.querySelector('link[rel="canonical"]')
      expect(canonicalLink?.getAttribute("href")).toBe(
        "https://artsy.net/artists/artists-starting-with-d?page=3",
      )
    })

    it("should strip tracking parameters but preserve page parameter", () => {
      mockUseRouter.mockReturnValue({
        match: {
          params: { letter: "d" },
          location: {
            query: {
              page: "2",
              utm_source: "google",
              utm_campaign: "summer",
              fbclid: "12345",
            },
          },
        },
      })

      render(
        <MockBoot>
          <ArtistsByLetterMeta />
        </MockBoot>,
      )

      const canonicalLink = document.querySelector('link[rel="canonical"]')
      expect(canonicalLink?.getAttribute("href")).toBe(
        "https://artsy.net/artists/artists-starting-with-d?page=2",
      )
    })
  })

  describe("title tags", () => {
    it("should generate normal title for page 1", () => {
      mockUseRouter.mockReturnValue({
        match: {
          params: { letter: "d" },
          location: { query: {} },
        },
      })

      render(
        <MockBoot>
          <ArtistsByLetterMeta />
        </MockBoot>,
      )

      expect(document.title).toBe(
        "Artists Starting with D | Modern and Contemporary Artists",
      )
    })

    it("should include page number in title for page 2+", () => {
      mockUseRouter.mockReturnValue({
        match: {
          params: { letter: "d" },
          location: { query: { page: "4" } },
        },
      })

      render(
        <MockBoot>
          <ArtistsByLetterMeta />
        </MockBoot>,
      )

      expect(document.title).toBe(
        "Artists Starting with D | Modern and Contemporary Artists - Page 4",
      )
    })

    it("should handle different letters correctly", () => {
      mockUseRouter.mockReturnValue({
        match: {
          params: { letter: "z" },
          location: { query: { page: "2" } },
        },
      })

      render(
        <MockBoot>
          <ArtistsByLetterMeta />
        </MockBoot>,
      )

      expect(document.title).toBe(
        "Artists Starting with Z | Modern and Contemporary Artists - Page 2",
      )
    })
  })

  describe("meta tags", () => {
    it("should generate proper og:url matching canonical", () => {
      mockUseRouter.mockReturnValue({
        match: {
          params: { letter: "d" },
          location: { query: { page: "3" } },
        },
      })

      render(
        <MockBoot>
          <ArtistsByLetterMeta />
        </MockBoot>,
      )

      const ogUrl = document.querySelector('meta[property="og:url"]')
      const canonicalLink = document.querySelector('link[rel="canonical"]')

      expect(ogUrl?.getAttribute("content")).toBe(
        canonicalLink?.getAttribute("href"),
      )
    })

    it("should generate description with letter context", () => {
      mockUseRouter.mockReturnValue({
        match: {
          params: { letter: "d" },
          location: { query: {} },
        },
      })

      render(
        <MockBoot>
          <ArtistsByLetterMeta />
        </MockBoot>,
      )

      const description = document.querySelector('meta[name="description"]')
      expect(description?.getAttribute("content")).toContain("starting with D")
    })
  })

  describe("edge cases", () => {
    it("should handle missing letter parameter", () => {
      mockUseRouter.mockReturnValue({
        match: {
          params: {},
          location: { query: {} },
        },
      })

      render(
        <MockBoot>
          <ArtistsByLetterMeta />
        </MockBoot>,
      )

      expect(document.title).toBe("Modern and Contemporary Artists")
    })

    it("should handle invalid page numbers", () => {
      mockUseRouter.mockReturnValue({
        match: {
          params: { letter: "d" },
          location: { query: { page: "invalid" } },
        },
      })

      render(
        <MockBoot>
          <ArtistsByLetterMeta />
        </MockBoot>,
      )

      const canonicalLink = document.querySelector('link[rel="canonical"]')
      expect(canonicalLink?.getAttribute("href")).toBe(
        "https://artsy.net/artists/artists-starting-with-d",
      )
    })
  })
})
