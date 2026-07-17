import { createLocalStorageGameProgressStore } from "Apps/Games/Routes/HammerPrice/Utils/gameProgressStore"

describe("createLocalStorageGameProgressStore", () => {
  const store = createLocalStorageGameProgressStore("test:progress:")

  beforeEach(() => {
    localStorage.clear()
  })

  it("returns null for unknown puzzles", () => {
    expect(store.getProgress("nope")).toBeNull()
  })

  it("round-trips progress", () => {
    const progress = {
      auctionResultId: "hp-1",
      guesses: ["0985000"],
      updatedAt: "2026-07-14T00:00:00.000Z",
    }

    store.saveProgress(progress)

    expect(store.getProgress("hp-1")).toEqual(progress)
  })

  it("lists progress for its own keys only", () => {
    store.saveProgress({
      auctionResultId: "hp-1",
      guesses: ["0985000"],
      updatedAt: "2026-07-14T00:00:00.000Z",
    })

    store.saveProgress({
      auctionResultId: "hp-2",
      guesses: [],
      updatedAt: "2026-07-14T00:00:00.000Z",
    })

    localStorage.setItem("unrelated", "value")

    expect(store.listProgress()).toHaveLength(2)
  })

  it("clears progress", () => {
    store.saveProgress({
      auctionResultId: "hp-1",
      guesses: ["0985000"],
      updatedAt: "2026-07-14T00:00:00.000Z",
    })

    store.clearProgress("hp-1")

    expect(store.getProgress("hp-1")).toBeNull()
  })

  it("ignores corrupted entries", () => {
    localStorage.setItem("test:progress:hp-1", "not json {")
    localStorage.setItem("test:progress:hp-2", JSON.stringify({ nope: true }))

    expect(store.getProgress("hp-1")).toBeNull()
    expect(store.getProgress("hp-2")).toBeNull()
    expect(store.listProgress()).toEqual([])
  })
})
