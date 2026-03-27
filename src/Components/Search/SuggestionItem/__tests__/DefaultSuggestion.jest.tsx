import { render } from "@testing-library/react"
import { DefaultSuggestion } from "Components/Search/SuggestionItem/DefaultSuggestion"
import type { SuggestionItemOptionProps } from "Components/Search/SuggestionItem/SuggestionItem"

jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: jest.fn(() => true),
}))

const baseOption: SuggestionItemOptionProps = {
  text: "Andy Warhol",
  value: "andy-warhol",
  subtitle: "Artist",
  imageUrl: "image.jpg",
  showAuctionResultsButton: false,
  href: "/artist/andy-warhol",
  typename: "Artist",
}

describe("DefaultSuggestion", () => {
  describe("display name highlighting", () => {
    it("uses client-side substring matching as primary strategy", () => {
      const { container } = render(
        <DefaultSuggestion option={baseOption} query="warhol" />
      )

      const highlighted = container.querySelector("strong")
      expect(highlighted).toHaveTextContent("Warhol")
      expect(container.textContent).toContain("Andy Warhol")
    })

    it("falls back to server-side highlights when client-side produces no match", () => {
      const option: SuggestionItemOptionProps = {
        ...baseOption,
        highlights: [
          { field: "name", fragments: ["<em>Andy Warhol</em>"] },
        ],
      }

      const { container } = render(
        <DefaultSuggestion option={option} query="warhlo" />
      )

      const highlighted = container.querySelector("strong")
      expect(highlighted).toHaveTextContent("Andy Warhol")
    })

    it("prefers client-side over server-side when both could match", () => {
      const option: SuggestionItemOptionProps = {
        ...baseOption,
        highlights: [
          { field: "name", fragments: ["<em>Andy</em> <em>Warhol</em>"] },
        ],
      }

      const { container } = render(
        <DefaultSuggestion option={option} query="war" />
      )

      const highlights = container.querySelectorAll("strong")
      expect(highlights).toHaveLength(1)
      expect(highlights[0]).toHaveTextContent("War")
    })

    it("renders plain text when neither strategy produces highlights", () => {
      const { container } = render(
        <DefaultSuggestion option={baseOption} query="xyz" />
      )

      expect(container.querySelector("strong")).toBeNull()
      expect(container.textContent).toContain("Andy Warhol")
    })
  })

  describe("alternate name display", () => {
    it("shows alternate name in parentheses when highlight is present", () => {
      const option: SuggestionItemOptionProps = {
        ...baseOption,
        highlights: [
          {
            field: "alternate_names",
            fragments: ["<em>安迪</em>·沃荷"],
          },
        ],
      }

      const { container } = render(
        <DefaultSuggestion option={option} query="安迪" />
      )

      expect(container.textContent).toContain("(")
      expect(container.textContent).toContain("安迪·沃荷")
      expect(container.textContent).toContain(")")
    })

    it("does not show parentheses when no alternate name highlight", () => {
      const { container } = render(
        <DefaultSuggestion option={baseOption} query="warhol" />
      )

      expect(container.textContent).not.toContain("(")
    })

    it("hides alternate name when client-side match explains the result", () => {
      const option: SuggestionItemOptionProps = {
        ...baseOption,
        text: "Eduardo Chillida",
        highlights: [
          {
            field: "alternate_names",
            fragments: ["<em>Chillida</em> Juantegui, Eduardo"],
          },
        ],
      }

      const { container } = render(
        <DefaultSuggestion option={option} query="chillida" />
      )

      expect(container.textContent).not.toContain("(")
      expect(container.textContent).not.toContain("Juantegui")
    })

    it("hides alternate name when server-side name highlight explains the result", () => {
      const option: SuggestionItemOptionProps = {
        ...baseOption,
        highlights: [
          { field: "name", fragments: ["Andy <em>Warhol</em>"] },
          {
            field: "alternate_names",
            fragments: ["<em>Warhol</em>, Andrew"],
          },
        ],
      }

      const { container } = render(
        <DefaultSuggestion option={option} query="warhlo" />
      )

      expect(container.textContent).not.toContain("(")
      expect(container.textContent).not.toContain("Andrew")
    })
  })

  describe("when feature flag is disabled", () => {
    beforeEach(() => {
      const { useFlag } = require("@unleash/proxy-client-react")
      ;(useFlag as jest.Mock).mockReturnValue(false)
    })

    afterEach(() => {
      const { useFlag } = require("@unleash/proxy-client-react")
      ;(useFlag as jest.Mock).mockReturnValue(true)
    })

    it("ignores server-side highlights and uses only client-side matching", () => {
      const option: SuggestionItemOptionProps = {
        ...baseOption,
        highlights: [
          { field: "name", fragments: ["<em>Andy Warhol</em>"] },
        ],
      }

      const { container } = render(
        <DefaultSuggestion option={option} query="warhlo" />
      )

      expect(container.querySelector("strong")).toBeNull()
      expect(container.textContent).toContain("Andy Warhol")
    })

    it("does not show alternate names even when highlight is present", () => {
      const option: SuggestionItemOptionProps = {
        ...baseOption,
        highlights: [
          {
            field: "alternate_names",
            fragments: ["<em>安迪</em>·沃荷"],
          },
        ],
      }

      const { container } = render(
        <DefaultSuggestion option={option} query="安迪" />
      )

      expect(container.textContent).not.toContain("(")
      expect(container.textContent).not.toContain("安迪")
    })
  })
})
