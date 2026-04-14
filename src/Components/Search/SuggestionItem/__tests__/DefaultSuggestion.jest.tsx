import { render } from "@testing-library/react"
import { DefaultSuggestion } from "Components/Search/SuggestionItem/DefaultSuggestion"
import type { SuggestionItemOptionProps } from "Components/Search/SuggestionItem/SuggestionItem"

jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: jest.fn(() => true),
}))

const allFlagsOn = () => {
  const { useFlag } = require("@unleash/proxy-client-react")
  ;(useFlag as jest.Mock).mockReturnValue(true)
}

const onlyHighlightingOn = () => {
  const { useFlag } = require("@unleash/proxy-client-react")
  ;(useFlag as jest.Mock).mockImplementation(
    (flag: string) => flag === "onyx_search-highlighting",
  )
}

const allFlagsOff = () => {
  const { useFlag } = require("@unleash/proxy-client-react")
  ;(useFlag as jest.Mock).mockReturnValue(false)
}

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
    it("falls back to client-side substring matching when no server highlights are present", () => {
      const { container } = render(
        <DefaultSuggestion option={baseOption} query="warhol" />,
      )

      const highlighted = container.querySelector("strong")
      expect(highlighted).toHaveTextContent("Warhol")
      expect(container.textContent).toContain("Andy Warhol")
    })

    it("falls back to server-side highlights when client-side produces no match", () => {
      const option: SuggestionItemOptionProps = {
        ...baseOption,
        highlights: [{ field: "name", fragments: ["<em>Andy Warhol</em>"] }],
      }

      const { container } = render(
        <DefaultSuggestion option={option} query="warhlo" />,
      )

      const highlighted = container.querySelector("strong")
      expect(highlighted).toHaveTextContent("Andy Warhol")
    })

    it("prefers server-side over client-side when both could match", () => {
      const option: SuggestionItemOptionProps = {
        ...baseOption,
        highlights: [
          { field: "name", fragments: ["<em>Andy</em> <em>Warhol</em>"] },
        ],
      }

      const { container } = render(
        <DefaultSuggestion option={option} query="war" />,
      )

      const highlights = container.querySelectorAll("strong")
      expect(highlights).toHaveLength(2)
      expect(highlights[0]).toHaveTextContent("Andy")
      expect(highlights[1]).toHaveTextContent("Warhol")
    })

    it("renders plain text when neither strategy produces highlights", () => {
      const { container } = render(
        <DefaultSuggestion option={baseOption} query="xyz" />,
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
        <DefaultSuggestion option={option} query="安迪" />,
      )

      expect(container.textContent).toContain("(")
      expect(container.textContent).toContain("安迪·沃荷")
      expect(container.textContent).toContain(")")
    })

    it("does not show parentheses when no alternate name highlight", () => {
      const { container } = render(
        <DefaultSuggestion option={baseOption} query="warhol" />,
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
        <DefaultSuggestion option={option} query="chillida" />,
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
        <DefaultSuggestion option={option} query="warhlo" />,
      )

      expect(container.textContent).not.toContain("(")
      expect(container.textContent).not.toContain("Andrew")
    })
  })

  describe("when onyx_search-highlighting flag is disabled", () => {
    beforeEach(allFlagsOff)
    afterEach(allFlagsOn)

    it("ignores server-side highlights and uses only client-side matching", () => {
      const option: SuggestionItemOptionProps = {
        ...baseOption,
        highlights: [{ field: "name", fragments: ["<em>Andy Warhol</em>"] }],
      }

      const { container } = render(
        <DefaultSuggestion option={option} query="warhlo" />,
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
        <DefaultSuggestion option={option} query="安迪" />,
      )

      expect(container.textContent).not.toContain("(")
      expect(container.textContent).not.toContain("安迪")
    })
  })

  describe("when onyx_search-alternate-name-display flag is disabled", () => {
    beforeEach(onlyHighlightingOn)
    afterEach(allFlagsOn)

    it("does not show alternate name in parentheses for Artist results", () => {
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
        <DefaultSuggestion option={option} query="安迪" />,
      )

      expect(container.textContent).not.toContain("(")
      expect(container.textContent).not.toContain("安迪")
    })

    it("still applies server-side name highlighting", () => {
      const option: SuggestionItemOptionProps = {
        ...baseOption,
        highlights: [{ field: "name", fragments: ["<em>Andy Warhol</em>"] }],
      }

      const { container } = render(
        <DefaultSuggestion option={option} query="warhlo" />,
      )

      const highlighted = container.querySelector("strong")
      expect(highlighted).toHaveTextContent("Andy Warhol")
    })
  })

  describe("alternate name display for non-Artist types", () => {
    it("does not show alternate name in parentheses for Gene results", () => {
      const geneOption: SuggestionItemOptionProps = {
        ...baseOption,
        typename: "Gene",
        subtitle: "Gene",
        highlights: [
          {
            field: "alternate_names",
            fragments: ["<em>yawn</em>"],
          },
        ],
      }

      const { container } = render(
        <DefaultSuggestion option={geneOption} query="yawn" />,
      )

      expect(container.textContent).not.toContain("(")
      expect(container.textContent).not.toContain("yawn")
    })

    it("does not show alternate name in parentheses for SearchableItem results", () => {
      const searchableOption: SuggestionItemOptionProps = {
        ...baseOption,
        typename: "SearchableItem",
        subtitle: "Artist Series",
        highlights: [
          {
            field: "alternate_names",
            fragments: ["<em>some keyword</em>"],
          },
        ],
      }

      const { container } = render(
        <DefaultSuggestion option={searchableOption} query="some keyword" />,
      )

      expect(container.textContent).not.toContain("(")
    })

    it("still shows alternate name in parentheses for Artist results", () => {
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
        <DefaultSuggestion option={option} query="安迪" />,
      )

      expect(container.textContent).toContain("(")
      expect(container.textContent).toContain("安迪·沃荷")
    })
  })
})
