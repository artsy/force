import { formatFollowerCount } from "Utils/formatFollowerCount"

describe("formatFollowerCount", () => {
  it("should format a large number to compact notation", () => {
    const largeNumber = 10000
    const formattedNumber = formatFollowerCount(largeNumber)
    expect(formattedNumber).toEqual("10k")
  })

  it("should format a small number to compact notation", () => {
    const smallNumber = 150
    const result = formatFollowerCount(smallNumber)
    expect(result).toEqual("150")
  })
})
