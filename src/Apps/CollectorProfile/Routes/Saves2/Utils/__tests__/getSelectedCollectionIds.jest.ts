import { getSelectedCollectionIds } from "Apps/CollectorProfile/Routes/Saves2/Utils/getSelectedCollectionIds"

describe("getSelectedCollectionIds", () => {
  it("empty array", () => {
    const result = getSelectedCollectionIds({
      collections: [],
      addToCollectionIDs: [],
      removeFromCollectionIDs: [],
    })

    expect(result).toEqual([])
  })

  it("only selected ids", () => {
    const result = getSelectedCollectionIds({
      collections,
      addToCollectionIDs: [],
      removeFromCollectionIDs: [],
    })

    // for `bbb` collection the value of `isSavedArtwork` is set to `false`
    expect(result).toEqual(["aaa", "ccc", "ddd"])
  })

  it("with `addToCollectionIDs`", () => {
    const result = getSelectedCollectionIds({
      collections,
      addToCollectionIDs: ["aaa", "eee"],
      removeFromCollectionIDs: [],
    })

    expect(result).toEqual(["aaa", "ccc", "ddd", "eee"])
  })

  it("without `removeFromCollectionIDs`", () => {
    const result = getSelectedCollectionIds({
      collections,
      addToCollectionIDs: [],
      removeFromCollectionIDs: ["aaa", "ddd"],
    })

    expect(result).toEqual(["ccc"])
  })

  it("with `addToCollectionIDs` and without `removeFromCollectionIDs`", () => {
    const result = getSelectedCollectionIds({
      collections,
      addToCollectionIDs: ["aaa", "eee"],
      removeFromCollectionIDs: ["ccc", "ddd"],
    })

    expect(result).toEqual(["aaa", "eee"])
  })
})

const collections = [
  {
    isSavedArtwork: true,
    internalID: "aaa",
  },
  {
    isSavedArtwork: false,
    internalID: "bbb",
  },
  {
    isSavedArtwork: true,
    internalID: "ccc",
  },
  {
    isSavedArtwork: true,
    internalID: "ddd",
  },
]
