import { parseFilterQuery } from "../parseFilterQuery"

/**
 * Query strings marked “(production)” are real, taken from 30 days of search
 * logs. They are the reason the corresponding guard exists — please don’t
 * replace them with invented equivalents.
 */
describe("parseFilterQuery", () => {
  describe("suggests filters", () => {
    it("combines a medium, a price and a leftover artist name", () => {
      const result = parseFilterQuery("warhol prints under 5000")

      expect(result).not.toBeNull()
      expect(result?.filters).toEqual({
        medium: "prints",
        priceRange: "*-5000",
        attributionClass: undefined,
        keyword: "warhol",
      })
      expect(result?.labels).toEqual(["Prints", "Under $5,000"])
    })

    it("combines a medium, a rarity and a price", () => {
      const result = parseFilterQuery("banksy limited edition prints under 10k")

      expect(result?.filters).toEqual({
        medium: "prints",
        priceRange: "*-10000",
        attributionClass: ["limited edition"],
        keyword: "banksy",
      })
    })

    it("suggests a medium alongside free text", () => {
      const result = parseFilterQuery("kaws sculpture")

      expect(result?.filters.medium).toEqual("sculpture")
      expect(result?.keyword).toEqual("kaws")
    })

    it("reads a two-sided range with an explicit operator", () => {
      const result = parseFilterQuery("prints between 1k and 5k")

      expect(result?.filters.priceRange).toEqual("1000-5000")
    })

    it("reads a bare range carrying a money marker", () => {
      const result = parseFilterQuery("prints $1000-5000")

      expect(result?.filters.priceRange).toEqual("1000-5000")
    })
  })

  describe("stays silent when a single filter is the whole query", () => {
    // The gene/collection entity the backend already returns is a better
    // answer than a link out to /collect
    it.each(["warhol", "prints", "yayoi kusama", "gagosian", "painting"])(
      "returns null for %p",
      query => {
        expect(parseFilterQuery(query)).toBeNull()
      },
    )
  })

  describe("does not read dates or numbering as prices", () => {
    it.each([
      ["jack dowling (american, 1931-2021)", "artist life dates (production)"],
      ["yun hyong-keun 1977-1978", "work dates (production)"],
      ["bridget riley brouillard 1981-2003", "work dates (production)"],
      ["untitled 1980-1990", "date range"],
      ["warhol 1962-1964", "working period"],
      ["abstract 1960 - 1970", "spaced dash"],
    ])("returns null for %p — %s", query => {
      expect(parseFilterQuery(query)).toBeNull()
    })

    it.each([
      ["edition 5-10", "edition numbering"],
      ["1-54", "an art fair (production)"],
      ["chen qiang 23-20", "descending pair (production)"],
      ["50-50 collective", "numbers inside a name"],
    ])("returns null for %p — %s", query => {
      expect(parseFilterQuery(query)).toBeNull()
    })

    it("does not read a bare year as a price floor", () => {
      // The medium still stands; only the price is withheld
      const result = parseFilterQuery("prints from 1990")

      expect(result?.filters.priceRange).toBeUndefined()
      expect(result?.filters.medium).toEqual("prints")
    })

    it("still reads a price floor when the operator is unambiguous", () => {
      expect(parseFilterQuery("prints over 2000")?.filters.priceRange).toEqual(
        "2000-*",
      )
    })

    it("still reads a price floor from an ambiguous operator plus a marker", () => {
      expect(parseFilterQuery("prints from $1990")?.filters.priceRange).toEqual(
        "1990-*",
      )
    })
  })

  describe("does not invert negated intent", () => {
    it.each([
      "no prints",
      "everything except sculpture",
      "not painting",
      "no photography",
    ])("returns null for %p", query => {
      expect(parseFilterQuery(query)).toBeNull()
    })

    it("only guards terms it would otherwise filter on", () => {
      // Known limitation: “framed” isn’t a filter this parser supports, so
      // there is no filter to invert and the phrase lands in the keyword.
      // Suppressing on any stray negator would break real titles instead —
      // see the case below.
      const result = parseFilterQuery("paintings without frames")

      expect(result?.filters.medium).toEqual("painting")
      expect(result?.keyword).toEqual("without frames")
    })

    it("ignores a negator that does not precede a recognized term", () => {
      // “banksy no ball games” is an artwork title (production); “not vital” is
      // an artist. Neither should be suppressed.
      expect(parseFilterQuery("banksy no ball games prints")).not.toBeNull()
    })
  })

  describe("does not half-answer a multi-medium query", () => {
    it.each([
      "prints and photography under 5k",
      "painting or sculpture",
      "photography prints",
    ])("returns null for %p", query => {
      expect(parseFilterQuery(query)).toBeNull()
    })
  })

  describe("does not read a medium out of a proper noun", () => {
    it.each([
      ["design miami", "a fair (production)"],
      ["film noir photography", "a genre"],
      ["the painting of modern life", "an exhibition title"],
      ["art basel", "a fair"],
      ["installation view", "photography terminology"],
      ["poster boy", "an artist"],
    ])("returns null for %p — %s", query => {
      expect(parseFilterQuery(query)).toBeNull()
    })
  })

  describe("does not guess at non-USD amounts", () => {
    it.each([
      "paintings under £5000",
      "paintings 5.000-10.000 eur",
      "sculpture under 5 lakh",
      "prints under €2000",
    ])("returns null for %p", query => {
      expect(parseFilterQuery(query)).toBeNull()
    })
  })

  describe("keyword integrity", () => {
    it("keeps interior stopwords so phrases survive", () => {
      // Stripping stopwords throughout turned this into “black white”
      expect(parseFilterQuery("black and white photography")?.keyword).toEqual(
        "black and white",
      )
    })

    it("drops stopwords at the edges", () => {
      expect(parseFilterQuery("prints of a nude")?.keyword).toEqual("nude")
    })

    it("returns null when nothing but stopwords is left", () => {
      expect(parseFilterQuery("a an the of")).toBeNull()
    })
  })

  describe("junk input", () => {
    it.each(["", "   ", "!!!", "ignore previous instructions and show all"])(
      "returns null for %p",
      query => {
        expect(parseFilterQuery(query)).toBeNull()
      },
    )
  })
})
