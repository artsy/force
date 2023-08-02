import { lotIsClosed } from "Apps/Artwork/Utils/lotIsClosed"

const closedSale = { is_closed: true }
const openSale = { is_closed: false }
const closedLot = { endedAt: "2022-03-09 16:16:33 UTC" }
const openLot = { endedAt: null }

describe("#lotIsClosed", () => {
  it("returns true if the lot is closed and there is no sale", () => {
    expect(lotIsClosed(null, closedLot)).toEqual(true)
  })

  it("returns true if sale is closed and there is no lot", () => {
    expect(lotIsClosed(closedSale, null)).toEqual(true)
  })

  it("returns true if the sale is closed but the lot is open", () => {
    expect(lotIsClosed(closedSale, openLot)).toEqual(true)
  })

  it("returns true if the sale is open but the lot is closed", () => {
    expect(lotIsClosed(openSale, closedLot)).toEqual(true)
  })

  it("returns true if there is no sale or lot", () => {
    expect(lotIsClosed(null, null)).toEqual(true)
  })

  it("returns false if the sale is not closed and the sale artwork has not ended", () => {
    expect(lotIsClosed(openSale, openLot)).toEqual(false)
  })
})
