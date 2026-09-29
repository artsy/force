import {
  getInstagramHandle,
  getInstagramURL,
} from "Utils/getInstagramURL"

describe("getInstagramHandle", () => {
  it("accepts a plain handle", () => {
    expect(getInstagramHandle("andywarhol")).toEqual("andywarhol")
  })

  it("accepts periods and underscores", () => {
    expect(getInstagramHandle("andy.warhol_1")).toEqual("andy.warhol_1")
  })

  it("strips a leading @, which is never part of a handle", () => {
    expect(getInstagramHandle("@andywarhol")).toEqual("andywarhol")
  })

  it("trims surrounding whitespace", () => {
    expect(getInstagramHandle("  andywarhol  ")).toEqual("andywarhol")
  })

  it("rejects a pasted profile URL rather than repairing it", () => {
    expect(getInstagramHandle("https://instagram.com/andywarhol")).toBeNull()
    expect(getInstagramHandle("instagram.com/andywarhol")).toBeNull()
  })

  it("rejects a path that is not a profile", () => {
    expect(getInstagramHandle("andywarhol/tagged")).toBeNull()
    expect(getInstagramHandle("andywarhol/")).toBeNull()
  })

  it("rejects null, undefined and blank input", () => {
    expect(getInstagramHandle(null)).toBeNull()
    expect(getInstagramHandle(undefined)).toBeNull()
    expect(getInstagramHandle("")).toBeNull()
    expect(getInstagramHandle("   ")).toBeNull()
    expect(getInstagramHandle("@")).toBeNull()
  })
})

describe("getInstagramURL", () => {
  it("builds a profile URL from a handle", () => {
    expect(getInstagramURL("andywarhol")).toEqual(
      "https://www.instagram.com/andywarhol",
    )
  })

  it("builds a profile URL from a handle entered with a leading @", () => {
    expect(getInstagramURL("@andywarhol")).toEqual(
      "https://www.instagram.com/andywarhol",
    )
  })

  it("returns null for anything that is not a bare handle", () => {
    expect(getInstagramURL("https://instagram.com/andywarhol")).toBeNull()
    expect(getInstagramURL("andywarhol/tagged")).toBeNull()
    expect(getInstagramURL(null)).toBeNull()
    expect(getInstagramURL("   ")).toBeNull()
  })
})
