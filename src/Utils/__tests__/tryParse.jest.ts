import { tryParse } from "Utils/tryParse"

describe("tryParse", () => {
  it("returns parsed JSON object for valid JSON string", () => {
    const jsonString = '{"key":"value"}'
    const result = tryParse(jsonString)
    expect(result).toEqual({ key: "value" })
  })

  it("returns parsed JSON array for valid JSON string", () => {
    const jsonString = "[1,2,3]"
    const result = tryParse(jsonString)
    expect(result).toEqual([1, 2, 3])
  })

  it("returns the original string for invalid JSON", () => {
    const invalidJson = '{"key":value}'
    const result = tryParse(invalidJson)
    expect(result).toBe(invalidJson)
  })

  it("returns the original string for non-JSON input", () => {
    const nonJsonInput = "Just a string"
    const result = tryParse(nonJsonInput)
    expect(result).toBe(nonJsonInput)
  })

  it("returns a number for numeric strings", () => {
    const numericString = "123"
    const result = tryParse(numericString)
    expect(result).toBe(123)
  })

  it("returns boolean for boolean strings", () => {
    const booleanString = "true"
    const result = tryParse(booleanString)
    expect(result).toBe(true)
  })

  it("returns null for a null string input", () => {
    const nullString = "null"
    const result = tryParse(nullString)
    expect(result).toBe(null)
  })
})
