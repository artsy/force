import { computeTitle } from "../computeTitle"

describe("compute title", () => {
  it("returns copy if found", () => {
    expect(computeTitle({ copy: "foo" })).toBe("foo")
  })

  it("returns title based on intent", () => {
    expect(computeTitle({ intent: "save artwork" })).toBe(
      "Sign up to save artworks"
    )
    expect(computeTitle({ intent: "follow partner" })).toBe(
      "Sign up to follow partners"
    )
    expect(computeTitle({ intent: "follow artist" })).toBe(
      "Sign up to follow artists"
    )
  })

  it("returns pageTitle if no intent", () => {
    expect(computeTitle({ pageTitle: "foo" })).toBe("foo")
  })

  it("returns default if no other options available", () => {
    expect(computeTitle({})).toBe("Sign up for Artsy")
  })
})
