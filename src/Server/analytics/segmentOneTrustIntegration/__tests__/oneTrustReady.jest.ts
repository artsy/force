import { oneTrustReady } from "../oneTrustReady"

describe("oneTrustReady", () => {
  it("returns true if onetrust consent string contains C0001", () => {
    window.OnetrustActiveGroups = "C0001"
    const result = oneTrustReady()
    expect(result).toBe(true)
  })
  it("returns false if onetrust consent string is empty", () => {
    window.OnetrustActiveGroups = ""
    const result = oneTrustReady()
    expect(result).toBe(false)
  })
  it("returns false if onetrust consent string is non-empty but does not contain C0001", () => {
    window.OnetrustActiveGroups = ",,"
    const result = oneTrustReady()
    expect(result).toBe(false)
  })
})
