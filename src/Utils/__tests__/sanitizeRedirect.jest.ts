import { sanitizeRedirect } from "Utils/sanitizeRedirect"

describe("sanitizeRedirect", () => {
  it("lets artsy.net through", () => {
    expect(sanitizeRedirect("http://artsy.net")).toEqual("http://artsy.net")
  })

  it("lets artsy.net without a protocol through", () => {
    expect(sanitizeRedirect("//artsy.net")).toEqual("//artsy.net")
  })

  it("lets artsy.net subdomains through", () => {
    expect(sanitizeRedirect("http://2013.artsy.net")).toEqual(
      "http://2013.artsy.net"
    )
  })

  it("lets artsy.net subdomains without a protocol through", () => {
    expect(sanitizeRedirect("//2013.artsy.net")).toEqual("//2013.artsy.net")
  })

  it("lets relative paths through", () => {
    expect(sanitizeRedirect("/path")).toEqual("/path")
  })

  it("lets deeply nested artsy.net subdomains through", () => {
    expect(sanitizeRedirect("https://foo.2013.artsy.net")).toEqual(
      "https://foo.2013.artsy.net"
    )
  })

  it("lets artsy.net links through", () => {
    expect(sanitizeRedirect("https://artsy.net/about")).toEqual(
      "https://artsy.net/about"
    )
  })

  it("lets localhost through", () => {
    expect(
      sanitizeRedirect("http://localhost:3003/artwork/joe-piccillo-a-riposo")
    ).toEqual("http://localhost:3003/artwork/joe-piccillo-a-riposo")
  })

  it("lets internal paths through", () => {
    expect(sanitizeRedirect("/log_in?redirect-to=/foo/bar")).toEqual(
      "/log_in?redirect-to=/foo/bar"
    )
  })

  it("blocks data urls", () => {
    expect(
      sanitizeRedirect(
        "data:text/html;base64,PHNjcmlwdD5hbGVydChsb2NhdGlvbi5oYXNoKTs8L3NjcmlwdD4="
      )[0]
    ).toEqual("/")
  })

  it("blocks external links not whitelisted; redirects to root", () => {
    expect(sanitizeRedirect("http://google.com")).toEqual("/")
  })

  it("blocks external links that lack protocol; redirects to root", () => {
    expect(sanitizeRedirect("//google.com")).toEqual("/")
  })

  it("blocks other protocols; redirects to root", () => {
    expect(sanitizeRedirect("ftp://google.com")).toEqual("/")
    expect(sanitizeRedirect("javascript:alert(1);")).toEqual("/")
  })

  it("blocks malformed URLs (1)", () => {
    expect(sanitizeRedirect("http:/google.com")).toEqual("/")
  })

  it("blocks malformed URLs (2)", () => {
    expect(sanitizeRedirect("https:/google.com")).toEqual("/")
  })

  it("blocks malformed URLs (3)", () => {
    expect(sanitizeRedirect("http:///google.com")).toEqual("/")
  })

  it("strips out whitespace", () => {
    expect(
      sanitizeRedirect(`http://artsy.net
attacker.com/`)
    ).toEqual("/")
  })

  it("leaves query params alone", () => {
    expect(sanitizeRedirect("http://artsy.net?foo=bar")).toEqual(
      "http://artsy.net?foo=bar"
    )
  })
})
