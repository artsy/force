import { getInstagramURL } from "Utils/getInstagramURL"

describe("getInstagramURL", () => {
  it("builds a profile URL from a handle", () => {
    expect(getInstagramURL("andywarhol")).toEqual(
      "https://www.instagram.com/andywarhol",
    )
  })

  it("returns null when there is no handle", () => {
    expect(getInstagramURL(null)).toBeNull()
    expect(getInstagramURL(undefined)).toBeNull()
  })

  it("returns null rather than the Instagram homepage for a blank handle", () => {
    expect(getInstagramURL("")).toBeNull()
    expect(getInstagramURL("   ")).toBeNull()
  })
})
