import { sanitizeURL } from "Utils/sanitizeURL"

describe("sanitizeURL", () => {
  it("sanitizes unsafe urls", () => {
    expect(sanitizeURL("javascript:alert(1)")).toEqual("/")
  })

  it("sanitizes URI encoded unsafe urls", () => {
    expect(sanitizeURL(encodeURIComponent("javascript:alert(1)"))).toEqual("/")
  })

  it("sanitizes unsafe data urls", () => {
    expect(
      sanitizeURL(
        `data:text/html;charset=utf-8,${encodeURIComponent(
          "<script>alert(1)</script>"
        )}`
      )
    ).toEqual("/")
  })

  it("lets through http urls", () => {
    expect(sanitizeURL("http://artsy.net")).toEqual("http://artsy.net")
  })

  it("lets through https urls", () => {
    expect(sanitizeURL("https://artsy.net")).toEqual("https://artsy.net")
  })

  it("lets through relative urls", () => {
    expect(sanitizeURL("/foo/bar")).toEqual("/foo/bar")
  })

  it("lets through relative urls without a leading slash", () => {
    expect(sanitizeURL("foo/bar")).toEqual("foo/bar")
  })

  it("optionally enforces internal urls", () => {
    expect(
      sanitizeURL("http://example.com", { enforceInternal: true })
    ).toEqual("/")
  })
})
