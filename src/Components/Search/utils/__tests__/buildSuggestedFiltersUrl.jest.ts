import { buildSuggestedFiltersUrl } from "Components/Search/utils/buildSuggestedFiltersUrl"
import { parseFilterQuery } from "Components/Search/utils/parseFilterQuery"

const urlFor = (query: string): string => {
  const parsed = parseFilterQuery(query)

  if (!parsed) throw new Error(`Expected "${query}" to parse`)

  return decodeURIComponent(
    buildSuggestedFiltersUrl(parsed).replace(/%5B|%5D/g, match => {
      return match === "%5B" ? "[" : "]"
    }),
  )
}

describe("buildSuggestedFiltersUrl", () => {
  it("points at the search results page, not collect", () => {
    expect(urlFor("warhol prints under 5000")).toMatch(/^\/search\?/)
  })

  it("carries only the free text as the search term", () => {
    // The term doubles as the artworks keyword, so the filter words have to go:
    // searching "warhol prints under 5000" alongside the filters they produced
    // returns nothing at all
    const url = urlFor("warhol prints under 5000")

    expect(url).toContain("term=warhol&")
    expect(url).not.toContain("term=warhol prints")
  })

  it("sends the medium as a gene id, so the Medium filter reflects it", () => {
    expect(urlFor("warhol prints under 5000")).toContain(
      "additional_gene_ids[0]=prints",
    )
  })

  it("sends the price as a range", () => {
    expect(urlFor("warhol prints under 5000")).toContain("price_range=*-5000")
  })

  it("sends rarity as attribution classes", () => {
    expect(urlFor("banksy limited edition prints")).toContain(
      "attribution_class[0]=limited edition",
    )
  })

  it("omits filters the query didn't ask for", () => {
    const url = urlFor("warhol prints")

    expect(url).not.toContain("price_range")
    expect(url).not.toContain("attribution_class")
  })

  it("stands the leading filter label in when there is no free text", () => {
    // An empty term leaves the heading reading `results for ""`, and the raw
    // query would search the filter words again
    expect(urlFor("prints between 1k and 5k")).toContain("term=Prints&")
  })

  it("never sends the filter words as the term", () => {
    // The removed raw-query fallback used to reintroduce them
    const url = urlFor("prints between 1k and 5k")

    expect(url).not.toContain("between")
    expect(url).not.toContain("1k")
  })

  it("sends one param per nationality the demonym stands for", () => {
    const url = urlFor("korean paintings under 5k")

    expect(url).toContain("artist_nationalities[0]=Korean")
    expect(url).toContain("artist_nationalities[1]=South Korean")
  })

  it("never stands the nationality in as the term", () => {
    const url = urlFor("chinese photography")

    expect(url).toContain("term=Photography&")
    expect(url).toContain("artist_nationalities[0]=Chinese")
  })

  it("omits nationalities the query didn't ask for", () => {
    expect(urlFor("warhol prints under 5000")).not.toContain(
      "artist_nationalities",
    )
  })
})
