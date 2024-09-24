import { getInternalHref, getURLHost } from "Utils/url"

// eslint-disable-next-line jest/no-focused-tests
describe.only("getURLHost", () => {
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

describe("getInternalHref", () => {
  it("should return the path from a given artsy.net URL", () => {
    const url = "https://artsy.net/artist/banksy"
    const result = getInternalHref(url)
    expect(result).toBe("/artist/banksy")
  })

  it("should return the path from a given staging.artsy.net URL", () => {
    const url = "https://staging.artsy.net/artist/banksy"
    const result = getInternalHref(url)
    expect(result).toBe("/artist/banksy")
  })

  it("should return the path even for an HTTP artsy.net URL", () => {
    const url = "http://artsy.net/artist/banksy"
    const result = getInternalHref(url)
    expect(result).toBe("/artist/banksy")
  })

  it("should return the path even for an HTTP staging.artsy.net URL", () => {
    const url = "http://staging.artsy.net/artist/banksy"
    const result = getInternalHref(url)
    expect(result).toBe("/artist/banksy")
  })

  it("should not alter URLs that do not match artsy.net or staging.artsy.net", () => {
    const url = "https://otherwebsite.com/artist/banksy"
    const result = getInternalHref(url)
    expect(result).toBe(url)
  })

  it("should handle URLs with query strings and fragments", () => {
    const url = "https://artsy.net/artist/banksy?sort=asc#bio"
    const result = getInternalHref(url)
    expect(result).toBe("/artist/banksy?sort=asc#bio")
  })

  it('should return "/" if the URL is just the domain', () => {
    const url = "https://artsy.net"
    const result = getInternalHref(url)
    expect(result).toBe(url)
  })
})
