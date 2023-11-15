import { isArtsyEmail } from "Utils/isArtsyEmail"

describe("isArtsyEmail", () => {
  it("returns true when emails ends with @artsymail.com", () => {
    expect(isArtsyEmail("me@artsymail.com")).toBe(true)
  })

  it("returns false when emails doesn't end with @artsymail.com", () => {
    expect(isArtsyEmail("artsymail.com@example.com")).toBe(false)
    expect(isArtsyEmail("me@artsymail.co")).toBe(false)
    expect(isArtsyEmail("me@fake-artsymail.com")).toBe(false)
    expect(isArtsyEmail("")).toBe(false)
    expect(isArtsyEmail(undefined)).toBe(false)
    expect(isArtsyEmail(null)).toBe(false)
  })
})
