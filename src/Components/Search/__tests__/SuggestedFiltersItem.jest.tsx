import { fireEvent, render, screen } from "@testing-library/react"
import { SuggestedFiltersItem } from "Components/Search/SuggestedFiltersItem"
import type { ParsedFilterQuery } from "Components/Search/utils/parseFilterQuery"
import { useRouter } from "System/Hooks/useRouter"

jest.mock("System/Hooks/useRouter", () => ({ useRouter: jest.fn() }))

/**
 * The row has two lines and they mean different things: the headline is the
 * free text the user is looking for, the second line is the filters it's
 * narrowed to. These specs pin that rule — see the “fully consumed query”
 * block for the case it originally got wrong.
 */
describe("SuggestedFiltersItem", () => {
  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({
      match: { location: { pathname: "/" } },
      router: { push: jest.fn() },
    })
  })

  const parsed = (keyword: string, labels: string[]): ParsedFilterQuery => {
    return { filters: {}, keyword, labels }
  }

  const renderRow = ({
    keyword,
    labels,
    query,
    onClick = jest.fn(),
  }: {
    keyword: string
    labels: string[]
    query: string
    onClick?: () => void
  }) => {
    render(
      <SuggestedFiltersItem
        parsed={parsed(keyword, labels)}
        href="/collect/prints"
        query={query}
        onClick={onClick}
      />,
    )

    return screen.getByTestId("suggestedFiltersRow")
  }

  describe("when the query leaves free text", () => {
    it("puts the free text in the headline and the filters behind “in”", () => {
      const row = renderRow({
        keyword: "warhol",
        labels: ["Prints", "Under $5,000"],
        query: "warhol prints under 5000",
      })

      expect(row).toHaveTextContent("warhol")
      expect(row).toHaveTextContent("in Prints · Under $5,000")
    })

    it("handles a single filter", () => {
      const row = renderRow({
        keyword: "cat",
        labels: ["Prints"],
        query: "cat prints",
      })

      expect(row).toHaveTextContent("cat")
      expect(row).toHaveTextContent("in Prints")
    })
  })

  describe("when the query is fully consumed by filters", () => {
    // Regression: the first label used to be promoted into the headline, so
    // “unique prints under 10000” read as the keyword “Prints” narrowed “in
    // Under $10,000” — presenting a price as though it were a category.
    it("makes the filters the headline and drops the “in” line", () => {
      const row = renderRow({
        keyword: "",
        labels: ["Prints", "Unique", "Under $10,000"],
        query: "unique prints under 10000",
      })

      expect(row).toHaveTextContent("Prints · Unique · Under $10,000")
      expect(row).not.toHaveTextContent("in ")
    })

    it("does not leave a filter standing alone in the headline", () => {
      const row = renderRow({
        keyword: "",
        labels: ["Prints", "$1,000–$5,000"],
        query: "prints between 1k and 5k",
      })

      expect(row).toHaveTextContent("Prints · $1,000–$5,000")
      expect(row).not.toHaveTextContent("in ")
    })
  })

  describe("highlighting", () => {
    it("colours the terms the user typed, in both lines", () => {
      const row = renderRow({
        keyword: "warhol",
        labels: ["Prints", "Under $5,000"],
        query: "warhol prints under 5000",
      })

      const highlighted = Array.from(row.querySelectorAll("strong")).map(
        node => node.textContent,
      )

      expect(highlighted).toEqual(["warhol", "Prints", "Under", "$5,000"])
    })

    it("leaves terms the user did not type unhighlighted", () => {
      const row = renderRow({
        keyword: "cat",
        labels: ["Prints", "Unique"],
        query: "cat prints",
      })

      const highlighted = Array.from(row.querySelectorAll("strong")).map(
        node => node.textContent,
      )

      expect(highlighted).toEqual(["cat", "Prints"])
    })
  })

  it("links to the given href", () => {
    const row = renderRow({
      keyword: "warhol",
      labels: ["Prints"],
      query: "warhol prints",
    })

    expect(row).toHaveAttribute("href", "/collect/prints")
  })

  it("calls onClick when the row is clicked", () => {
    const onClick = jest.fn()
    const row = renderRow({
      keyword: "warhol",
      labels: ["Prints"],
      query: "warhol prints",
      onClick,
    })

    fireEvent.click(row)

    expect(onClick).toHaveBeenCalled()
  })
})
