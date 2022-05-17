import { engine } from "../config"

describe("config", () => {
  it("should move through workflow", () => {
    console.log(engine.current())
    expect(engine.current()).toEqual("Welcome")
    expect(engine.next()).toEqual("AsACollector")
    expect(engine.next()).toEqual("GrowTasteInArt")
    expect(engine.next()).toEqual("AuctionHighlights")
    expect(engine.next()).toEqual("Done")
  })
})
