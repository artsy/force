import { MEDIUM_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { FILTER_VOCABULARY } from "../filterQueryVocabulary"
import { parseFilterQuery } from "../parseFilterQuery"

/**
 * Query strings marked “(production)” are real, taken from 30 days of search
 * logs. They are the reason the corresponding guard exists — please don’t
 * replace them with invented equivalents.
 */
describe("parseFilterQuery", () => {
  describe("only suggests mediums the filter UI can name", () => {
    // Both the pill and the drawer's MediumFilter name an applied medium out
    // of MEDIUM_OPTIONS; a value outside them filters results invisibly.
    const nameableMediums = new Set(
      MEDIUM_OPTIONS.map(option => {
        return option.value
      }),
    )

    const vocabularyMediums = [
      ...new Set(
        [...FILTER_VOCABULARY.values()]
          .filter(entry => {
            return entry.type === "medium"
          })
          .map(entry => {
            return entry.value
          }),
      ),
    ]

    it.each(vocabularyMediums)("%s is in MEDIUM_OPTIONS", medium => {
      expect(nameableMediums.has(medium)).toBe(true)
    })

    it("does not suggest a medium the Medium filter cannot display", () => {
      // Valid as a /collect path segment, absent from MEDIUM_OPTIONS
      expect(parseFilterQuery("warhol posters")?.filters.medium).toBeUndefined()
    })
  })

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

  describe("artist nationality", () => {
    it("reads a nationality alongside a medium", () => {
      const result = parseFilterQuery("chinese photography")

      expect(result?.filters.artistNationalities).toEqual(["Chinese"])
      expect(result?.filters.medium).toEqual("photography")
      expect(result?.labels).toEqual(["Chinese", "Photography"])
    })

    it("sends every value a demonym the aggregation splits stands for", () => {
      const result = parseFilterQuery("korean paintings under 5k")

      expect(result?.filters.artistNationalities).toEqual([
        "Korean",
        "South Korean",
      ])
      expect(result?.filters.medium).toEqual("painting")
      expect(result?.filters.priceRange).toEqual("*-5000")
    })

    it("names the nationality ahead of the other filters", () => {
      expect(parseFilterQuery("chinese prints under 5k")?.labels).toEqual([
        "Chinese",
        "Prints",
        "Under $5,000",
      ])
    })

    it.each([
      ["south korean prints", "Korean"],
      ["argentinian prints", "Argentine"],
      ["filipino prints", "Philippine"],
      ["slovenian prints", "Slovene"],
    ])("resolves %p to the aggregation's own %p", (query, label) => {
      expect(parseFilterQuery(query)?.labels).toContain(label)
    })

    it("does not invert a negated nationality", () => {
      expect(parseFilterQuery("prints not chinese")).toBeNull()
    })
  })

  describe("only trusts a nationality another filter backs up", () => {
    // Demonyms turn up in titles, artist names and subject matter far more
    // often than they state a nationality
    it.each([
      ["chinese", "a bare demonym"],
      ["chinese ceramics", "free text the parser cannot name a filter from"],
      ["american warhol", "an artist name"],
      ["jack dowling (american, 1931-2021)", "artist life dates (production)"],
    ])("returns null for %p — %s", query => {
      expect(parseFilterQuery(query)).toBeNull()
    })

    it("does not let a price alone back a nationality", () => {
      // With no free text a label becomes the search term, and "Under $5,000"
      // does not read as one
      expect(parseFilterQuery("chinese under 5k")).toBeNull()
    })
  })

  describe("only stands a medium in as the search term", () => {
    // The term doubles as the artworks keyword, so a rarity standing in costs
    // almost every result the filters were meant to return: "unique under 5k"
    // returns 628 against ~838,000 for the same filters alone
    it.each(["unique under 5k", "limited edition under 10k"])(
      "returns null for %p",
      query => {
        expect(parseFilterQuery(query)).toBeNull()
      },
    )

    it("still suggests a rarity when free text carries the term", () => {
      const result = parseFilterQuery("banksy limited edition under 10k")

      expect(result?.filters.attributionClass).toEqual(["limited edition"])
      expect(result?.keyword).toEqual("banksy")
    })

    it("stands the medium in ahead of the rarity", () => {
      expect(parseFilterQuery("unique prints under 5k")?.termLabel).toEqual(
        "Prints",
      )
    })
  })

  describe("does not read a nationality out of a movement or a material", () => {
    it.each([
      ["african american photography", "photography", "african american"],
      ["native american prints", "prints", "native american"],
      ["indian ink drawings", "drawing", "indian ink"],
      ["latin american sculpture", "sculpture", "latin american"],
    ])(
      "withholds the nationality in %p but still reads the medium",
      (query, medium, keyword) => {
        const result = parseFilterQuery(query)

        expect(result?.filters.artistNationalities).toBeUndefined()
        expect(result?.filters.medium).toEqual(medium)
        expect(result?.keyword).toEqual(keyword)
      },
    )

    it.each(["english paintings", "georgian prints", "other sculpture"])(
      "does not read the excluded demonym in %p as a nationality",
      query => {
        expect(
          parseFilterQuery(query)?.filters.artistNationalities,
        ).toBeUndefined()
      },
    )
  })

  describe("only suggests nationalities the filter UI can name", () => {
    // extractPills and the drawer's FilterSelect both match the
    // ARTIST_NATIONALITY aggregation on an exact value; anything else filters
    // results with no pill to untick
    const nationalityValues = [
      ...new Set(
        [...FILTER_VOCABULARY.values()]
          .filter(entry => {
            return entry.type === "artistNationality"
          })
          .flatMap(entry => {
            return entry.values ?? []
          }),
      ),
    ]

    it.each(nationalityValues)("%s is title-cased verbatim", value => {
      expect(value).toMatch(/^[A-Z]/)
    })

    it("indexes every nationality with at least one value", () => {
      expect(nationalityValues.length).toBeGreaterThan(0)
      expect(
        [...FILTER_VOCABULARY.values()]
          .filter(entry => {
            return entry.type === "artistNationality"
          })
          .every(entry => {
            return (entry.values?.length ?? 0) > 0
          }),
      ).toBe(true)
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
