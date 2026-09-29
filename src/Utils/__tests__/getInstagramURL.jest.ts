import { getInstagramURL } from "Utils/getInstagramURL"

describe("getInstagramURL", () => {
  it("builds a profile URL from a handle", () => {
    expect(getInstagramURL("andywarhol")).toEqual(
      "https://www.instagram.com/andywarhol",
    )
  })

  it("leaves a real handle unencoded", () => {
    expect(getInstagramURL("andy.warhol_1")).toEqual(
      "https://www.instagram.com/andy.warhol_1",
    )
  })

  it("percent-encodes a handle that could break out of a script tag", () => {
    const url = getInstagramURL("</script><script>alert(1)</script>")

    expect(url).not.toMatch("<")
    expect(url).toEqual(
      "https://www.instagram.com/%3C%2Fscript%3E%3Cscript%3Ealert(1)%3C%2Fscript%3E",
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
