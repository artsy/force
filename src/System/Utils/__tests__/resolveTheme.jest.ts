import { resolveTheme } from "System/Utils/resolveTheme"

describe("resolveTheme", () => {
  it("prefers the theme override over the preferred theme", () => {
    expect(
      resolveTheme({ themeOverride: "dark", preferredTheme: "light" }),
    ).toEqual("dark")
  })

  it("uses the preferred theme when there is no override", () => {
    expect(resolveTheme({ preferredTheme: "dark" })).toEqual("dark")
  })

  it("defaults to light", () => {
    expect(resolveTheme({})).toEqual("light")
  })

  it("falls back to light for an unknown value", () => {
    expect(resolveTheme({ themeOverride: "sepia" })).toEqual("light")
    expect(resolveTheme({ preferredTheme: "sepia" })).toEqual("light")
  })
})
