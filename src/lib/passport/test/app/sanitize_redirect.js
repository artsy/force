const sanitizeRedirect = require("../../sanitize-redirect")

describe("sanitizeRedirect", function () {
  it("lets artsy.net through", function () {
    sanitizeRedirect("http://artsy.net").should.equal("http://artsy.net")
  })

  it("lets artsy.net without a protocol through", function () {
    sanitizeRedirect("//artsy.net").should.equal("//artsy.net")
  })

  it("lets artsy.net subdomains through", function () {
    sanitizeRedirect("http://2013.artsy.net").should.equal(
      "http://2013.artsy.net"
    )
  })

  it("lets artsy.net subdomains without a protocol through", function () {
    sanitizeRedirect("//2013.artsy.net").should.equal("//2013.artsy.net")
  })

  it("lets relative paths through", function () {
    sanitizeRedirect("/path").should.equal("/path")
  })

  it("lets deeply nested artsy.net subdomains through", function () {
    sanitizeRedirect("https://foo.2013.artsy.net").should.equal(
      "https://foo.2013.artsy.net"
    )
  })

  it("lets artsy.net links through", function () {
    sanitizeRedirect("https://artsy.net/about").should.equal(
      "https://artsy.net/about"
    )
  })

  it("lets localhost through", function () {
    sanitizeRedirect(
      "http://localhost:3003/artwork/joe-piccillo-a-riposo"
    ).should.equal("http://localhost:3003/artwork/joe-piccillo-a-riposo")
  })

  it("lets internal paths through", function () {
    sanitizeRedirect("/log_in?redirect-to=/foo/bar").should.equal(
      "/log_in?redirect-to=/foo/bar"
    )
  })

  it("blocks data urls", function () {
    sanitizeRedirect(
      "data:text/html;base64,PHNjcmlwdD5hbGVydChsb2NhdGlvbi5oYXNoKTs8L3NjcmlwdD4="
    )[0].should.equal("/")
  })

  it("blocks external links not whitelisted; redirects to root", function () {
    sanitizeRedirect("http://google.com").should.equal("/")
  })

  it("blocks external links that lack protocol; redirects to root", function () {
    sanitizeRedirect("//google.com").should.equal("/")
  })

  it("blocks other protocols; redirects to root", function () {
    sanitizeRedirect("ftp://google.com").should.equal("/")
  })

  it("blocks other protocols; redirects to root", function () {
    sanitizeRedirect("javascript:alert(1);").should.equal("/")
  })

  it("blocks malformed URLs (1)", function () {
    sanitizeRedirect("http:/google.com").should.equal("/")
  })

  it("blocks malformed URLs (2)", function () {
    sanitizeRedirect("https:/google.com").should.equal("/")
  })

  it("blocks malformed URLs (3)", function () {
    sanitizeRedirect("http:///google.com").should.equal("/")
  })

  it("strips out whitespace", function () {
    sanitizeRedirect(`http://artsy.net
attacker.com/`).should.equal("/")
  })
})
