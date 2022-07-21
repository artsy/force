import { isValidSort } from "../IsValidSort"

describe("isValidSort", () => {
  it("returns true when sort is not passed", () => {
    const result = isValidSort()
    expect(result).toEqual(true)
  })

  it("returns true when valid sort is passed", () => {
    const result = isValidSort("NAME_ASC")
    expect(result).toEqual(true)
  })

  it("returns false when invalid sort is passed", () => {
    const result = isValidSort("some")
    expect(result).toEqual(false)
  })
})
