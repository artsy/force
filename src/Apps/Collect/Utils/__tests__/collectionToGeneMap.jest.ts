import { collectionToGeneMap } from "Apps/Collect/Utils/collectionToGeneMap"
import { geneToCollectionMap } from "Apps/Gene/Utils/geneToCollectionMap"

describe("collectionToGeneMap", () => {
  it("has no slugs that also appear in geneToCollectionMap (would cause a redirect loop)", () => {
    const collectionSlugs = Object.keys(collectionToGeneMap)
    const geneSlugs = Object.keys(geneToCollectionMap)
    const overlap = collectionSlugs.filter(slug => geneSlugs.includes(slug))
    expect(overlap).toEqual([])
  })
})
