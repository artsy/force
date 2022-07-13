const sanitizeRedirect = require("../../sanitize-redirect")

describe("sanitizeRedirect", function () {
  it("lets artsy.net through", function () {
    expect(sanitizeRedirect("http://artsy.net")).toEqual("http://artsy.net")
  })

  it("lets artsy.net without a protocol through", function () {
    expect(sanitizeRedirect("//artsy.net")).toEqual("//artsy.net")
  })

  it("lets artsy.net subdomains through", function () {
    expect(sanitizeRedirect("http://2013.artsy.net")).toEqual(
      "http://2013.artsy.net"
    )
  })

  it("lets artsy.net subdomains without a protocol through", function () {
    expect(sanitizeRedirect("//2013.artsy.net")).toEqual("//2013.artsy.net")
  })

  it("lets relative paths through", function () {
    expect(sanitizeRedirect("/path")).toEqual("/path")
  })

  it("lets deeply nested artsy.net subdomains through", function () {
    expect(sanitizeRedirect("https://foo.2013.artsy.net")).toEqual(
      "https://foo.2013.artsy.net"
    )
  })

  it("lets artsy.net links through", function () {
    expect(sanitizeRedirect("https://artsy.net/about")).toEqual(
      "https://artsy.net/about"
    )
  })

  it("lets localhost through", function () {
    expect(
      sanitizeRedirect("http://localhost:3003/artwork/joe-piccillo-a-riposo")
    ).toEqual("http://localhost:3003/artwork/joe-piccillo-a-riposo")
  })

  it("lets internal paths through", function () {
    expect(sanitizeRedirect("/log_in?redirect-to=/foo/bar")).toEqual(
      "/log_in?redirect-to=/foo/bar"
    )
  })

  it("blocks data urls", function () {
    expect(
      sanitizeRedirect(
        "data:text/html;base64,PHNjcmlwdD5hbGVydChsb2NhdGlvbi5oYXNoKTs8L3NjcmlwdD4="
      )[0]
    ).toEqual("/")
  })

  it("blocks external links not whitelisted; redirects to root", function () {
    expect(sanitizeRedirect("http://google.com")).toEqual("/")
  })

  it("blocks external links that lack protocol; redirects to root", function () {
    expect(sanitizeRedirect("//google.com")).toEqual("/")
  })

  it("blocks other protocols; redirects to root", function () {
    expect(sanitizeRedirect("ftp://google.com")).toEqual("/")
    expect(sanitizeRedirect("javascript:alert(1);")).toEqual("/")
  })

  it("blocks malformed URLs (1)", function () {
    expect(sanitizeRedirect("http:/google.com")).toEqual("/")
  })

  it("blocks malformed URLs (2)", function () {
    expect(sanitizeRedirect("https:/google.com")).toEqual("/")
  })

  it("blocks malformed URLs (3)", function () {
    expect(sanitizeRedirect("http:///google.com")).toEqual("/")
  })

  it("strips out whitespace", function () {
    expect(
      sanitizeRedirect(`http://artsy.net
attacker.com/`)
    ).toEqual("/")
  })
})
