import { parseFilterQuery } from "Components/Search/utils/parseFilterQuery"
import { shouldSubmitToFilters } from "Components/Search/utils/shouldSubmitToFilters"

const followsParse = (query: string): boolean => {
  const parsed = parseFilterQuery(query)

  if (!parsed) throw new Error(`Expected "${query}" to parse`)

  return shouldSubmitToFilters(parsed)
}

describe("shouldSubmitToFilters", () => {
  describe("follows the parse", () => {
    it.each([
      ["warhol prints under 5000", "a price"],
      ["donald judd under 5000", "a price, where the raw term returns 0"],
      ["japanese paintings under 1000", "a price (production)"],
      ["chinese photography", "nothing but filter words"],
      ["prints between 1k and 5k", "nothing but filter words"],
      ["banksy limited edition prints", "two filters"],
    ])("for %p — %s", query => {
      expect(followsParse(query)).toBe(true)
    })
  })

  describe("leaves a single filter beside free text as a search", () => {
    // The shape entity names take, and the raw term already serves them
    it.each([
      ["paris photo", "an art fair"],
      ["photo london", "an art fair"],
      ["the drawing center", "an institution"],
      ["sculpture center", "an institution"],
      ["unique forms of continuity in space", "an artwork title"],
      ["warhol prints", "an artist plus a medium"],
    ])("for %p — %s", query => {
      expect(followsParse(query)).toBe(false)
    })
  })
})
