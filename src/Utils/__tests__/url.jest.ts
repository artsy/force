import { getURLHost } from "../url"

describe("getURLHost", () => {
  it("returns host for url with host", () => {
    const url = "https://cms.artsy.net"
    expect(getURLHost(url)).toEqual("cms.artsy.net")
  })
  it("returns host for url with host and path", () => {
    const url = "https://cms.artsy.net/foo"
    expect(getURLHost(url)).toEqual("cms.artsy.net")
  })
  it("returns empty string for empty string", () => {
    const url = ""
    expect(getURLHost(url)).toEqual("")
  })
  it("returns empty string for non-url", () => {
    const url = "!@#123"
    expect(getURLHost(url)).toEqual("")
  })
})
