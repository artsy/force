import { Aggregations } from "../../ArtworkFilterContext"
import { filterArtistSlugsByAggregation } from "../filterArtistSlugsByAggregation"

describe("filterArtistSlugsByAggregation", () => {
  it("should return slugs only for those artists who are in ARTIST aggregation", () => {
    const result = filterArtistSlugsByAggregation(
      mockedArtistSlugs,
      mockedAggregations
    )

    expect(result).toEqual(["kaws", "banksy"])
  })

  it("should return empty array when there is no ARTIST aggregation", () => {
    const aggregations: Aggregations = [
      {
        slice: "MEDIUM",
        counts: [
          {
            name: "Prints",
            value: "prints",
            count: 212,
          },
        ],
      },
    ]
    const result = filterArtistSlugsByAggregation(
      mockedArtistSlugs,
      aggregations
    )

    expect(result).toEqual([])
  })

  it("should return empty array when there are no aggregation elements", () => {
    const aggregations: Aggregations = [
      {
        slice: "ARTIST",
        counts: [],
      },
    ]
    const result = filterArtistSlugsByAggregation(
      mockedArtistSlugs,
      aggregations
    )

    expect(result).toEqual([])
  })

  it("should return empty array when list of artist slugs is empty", () => {
    const result = filterArtistSlugsByAggregation([], mockedAggregations)

    expect(result).toEqual([])
  })

  it("should return empty array if there are no matches with aggregation elements", () => {
    const artistSlugs = ["max-ernst", "zhao-zhao"]
    const result = filterArtistSlugsByAggregation(
      artistSlugs,
      mockedAggregations
    )

    expect(result).toEqual([])
  })
})

const mockedArtistSlugs = ["kaws", "banksy", "max-ernst"]

const mockedAggregations: Aggregations = [
  {
    slice: "ARTIST",
    counts: [
      {
        name: "Banksy",
        value: "banksy",
        count: 20,
      },
      {
        name: "Damien Hirst",
        value: "damien-hirst",
        count: 18,
      },
      {
        name: "KAWS",
        value: "kaws",
        count: 10,
      },
    ],
  },
]
