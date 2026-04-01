import { render, screen } from "@testing-library/react"
import { parseHighlightFragments } from "Components/Search/SuggestionItem/parseHighlightFragments"

describe("parseHighlightFragments", () => {
  it("returns plain text when no em tags are present", () => {
    const result = parseHighlightFragments("Andy Warhol")
    expect(result).toEqual(["Andy Warhol"])
  })

  it("wraps em-tagged portions in Highlight components", () => {
    const result = parseHighlightFragments("<em>Andy</em> Warhol")
    const { container } = render(<span>{result}</span>)
    const highlighted = screen.getByText("Andy")
    expect(highlighted.tagName).toBe("STRONG")
    expect(container.textContent).toBe("Andy Warhol")
  })

  it("handles multiple highlighted segments", () => {
    const result = parseHighlightFragments("<em>Andy</em> <em>Warhol</em>")
    render(<span>{result}</span>)
    expect(screen.getByText("Andy").tagName).toBe("STRONG")
    expect(screen.getByText("Warhol").tagName).toBe("STRONG")
  })

  it("handles highlight at the end of string", () => {
    const result = parseHighlightFragments("Vincent <em>van Gogh</em>")
    render(<span>{result}</span>)
    expect(screen.getByText("van Gogh").tagName).toBe("STRONG")
  })

  it("handles empty string", () => {
    const result = parseHighlightFragments("")
    expect(result).toEqual([])
  })

  it("treats nested em tags as literal text (no XSS)", () => {
    const result = parseHighlightFragments(
      "<em>foo<em>bar</em>baz</em>"
    )
    const { container } = render(<span>{result}</span>)
    expect(container.textContent).toBe("foo<em>barbaz</em>")
    const highlighted = container.querySelector("strong")
    expect(highlighted).toHaveTextContent("foo<em>bar")
  })

  it("renders other HTML tags as safe escaped text", () => {
    const result = parseHighlightFragments(
      '<em>safe</em> <script>alert(1)</script>'
    )
    const { container } = render(<span>{result}</span>)
    expect(container.textContent).toBe("safe <script>alert(1)</script>")
    expect(container.querySelector("script")).toBeNull()
  })
})
