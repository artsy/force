import { checkSort } from "../CheckSort"

describe("checkSort", () => {
  it("returns true when sort is not passed", () => {
    const result = checkSort()
    expect(result).toEqual(true)
  })

  it("returns true when valid sort is passed", () => {
    const result = checkSort("NAME_ASC")
    expect(result).toEqual(true)
  })

  it("returns false when invalid sort is passed", () => {
    const result = checkSort("some")
    expect(result).toEqual(false)
  })
})
