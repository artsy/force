import { validatePresence } from "../formValidators"

describe("formValidators/validatePresence", () => {
  it("returns error when field is null", () => {
    expect(validatePresence(null)).toBe("This field is required")
  })
  it("returns error when field is undefined", () => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    expect(validatePresence(undefined)).toBe("This field is required")
  })
  it("returns error when field is empty", () => {
    expect(validatePresence(" \t  ")).toBe("This field is required")
  })
})
