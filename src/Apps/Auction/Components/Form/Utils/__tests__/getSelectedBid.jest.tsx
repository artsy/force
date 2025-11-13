import { getSelectedBid } from "../getSelectedBid"

describe("getSelectedBid", () => {
  it("returns the first selected bid if no initialSelectedBid passed", () => {
    expect(
      getSelectedBid({
        initialSelectedBid: null as any,
        displayIncrements: [
          {
            value: "1000",
            text: "1,000",
          },
          {
            value: "2000",
            text: "2,000",
          },
        ],
      })
    ).toBe("1000")
  })

  it("returns correct bid", () => {
    expect(
      getSelectedBid({
        initialSelectedBid: "2000",
        displayIncrements: [
          {
            value: "1000",
            text: "1,000",
          },
          {
            value: "2000",
            text: "2,000",
          },
        ],
      })
    ).toBe("2000")
  })
})
