import { getSelectedArtworkListIds } from "Apps/CollectorProfile/Routes/Saves2/Utils/getSelectedArtworkListIds"

describe("getSelectedArtworkListIds", () => {
  it("empty array", () => {
    const result = getSelectedArtworkListIds({
      artworkLists: [],
      addToArtworkListIDs: [],
      removeFromArtowrkListIDs: [],
    })

    expect(result).toEqual([])
  })

  it("only selected ids", () => {
    const result = getSelectedArtworkListIds({
      artworkLists,
      addToArtworkListIDs: [],
      removeFromArtowrkListIDs: [],
    })

    // for `bbb` artwork list the value of `isSavedArtwork` is set to `false`
    expect(result).toEqual(["aaa", "ccc", "ddd"])
  })

  it("with `addToArtworkListIDs`", () => {
    const result = getSelectedArtworkListIds({
      artworkLists,
      addToArtworkListIDs: ["aaa", "eee"],
      removeFromArtowrkListIDs: [],
    })

    expect(result).toEqual(["aaa", "ccc", "ddd", "eee"])
  })

  it("without `removeFromArtowrkListIDs`", () => {
    const result = getSelectedArtworkListIds({
      artworkLists,
      addToArtworkListIDs: [],
      removeFromArtowrkListIDs: ["aaa", "ddd"],
    })

    expect(result).toEqual(["ccc"])
  })

  it("with `addToArtworkListIDs` and without `removeFromArtowrkListIDs`", () => {
    const result = getSelectedArtworkListIds({
      artworkLists,
      addToArtworkListIDs: ["aaa", "eee"],
      removeFromArtowrkListIDs: ["ccc", "ddd"],
    })

    expect(result).toEqual(["aaa", "eee"])
  })
})

const artworkLists = [
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
