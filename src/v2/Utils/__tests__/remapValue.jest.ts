import { remapValue } from "../remapValue"

describe("remapValue", () => {
  it("remaps the value onto the target range", () => {
    expect(remapValue(5, { min: 0, max: 10 }, { min: 0, max: 100 })).toBe(50)
  })

  it("remaps the value onto the target range (2)", () => {
    expect(remapValue(2.5, { min: 0, max: 10 }, { min: 0, max: 100 })).toBe(25)
  })

  it("remaps the value onto the target range (3)", () => {
    expect(remapValue(3, { min: 0, max: 10 }, { min: 0, max: 33 })).toBe(9.9)
  })

  it("remaps the value onto the target range (4)", () => {
    expect(remapValue(5, { min: 0, max: 10 }, { min: 50, max: 100 })).toBe(75)
  })

  it("remaps the value onto the target range (5)", () => {
    expect(remapValue(5, { min: 5, max: 10 }, { min: 1, max: 100 })).toBe(1)
  })

  it("remaps the value onto the target range (6)", () => {
    expect(remapValue(0, { min: -10, max: 10 }, { min: 0, max: 100 })).toBe(50)
  })
})
