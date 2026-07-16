import { mapFilterSuggestion } from "Components/ArtworkFilter/Utils/mapFilterSuggestion"

describe("mapFilterSuggestion", () => {
  it("maps and renames filters to ArtworkFilterContext keys", () => {
    const result = mapFilterSuggestion({
      keyword: "brutalist",
      fellOpen: false,
      dropped: [],
      filters: {
        geneIDs: ["gene-sculpture"],
        sizes: ["LARGE"],
        colors: ["red"],
        attributionClass: ["unique"],
        artistNationalities: ["Japanese"],
        majorPeriods: ["1960"],
        priceRange: "*-5000",
        framed: true,
        signed: null,
        forSale: true,
        acquireable: null,
        offerable: null,
        atAuction: true,
        inquireable: true,
      },
    } as any)

    expect(result).toEqual({
      keyword: "brutalist",
      additionalGeneIDs: ["gene-sculpture"], // renamed from geneIDs
      sizes: ["LARGE"],
      colors: ["red"],
      attributionClass: ["unique"],
      artistNationalities: ["Japanese"],
      majorPeriods: ["1960"],
      priceRange: "*-5000",
      framed: true,
      forSale: true,
      atAuction: true,
      inquireableOnly: true, // renamed from inquireable
    })
  })

  it("omits empty, false, and absent values so nothing is clobbered", () => {
    const result = mapFilterSuggestion({
      keyword: null,
      fellOpen: true,
      dropped: [],
      filters: { geneIDs: [], colors: null, framed: false },
    } as any)

    expect(result).toEqual({})
  })
})
