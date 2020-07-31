/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const sanitizeRedirect = require("../index")

describe("sanitizeRedirect", function () {
  it("lets artsy.net through", () =>
    sanitizeRedirect("http://artsy.net").should.equal("http://artsy.net"))

  it("lets artsy.net without a protocol through", () =>
    sanitizeRedirect("//artsy.net").should.equal("//artsy.net"))

  it("lets artsy.net subdomains through", () =>
    sanitizeRedirect("http://2013.artsy.net").should.equal(
      "http://2013.artsy.net"
    ))

  it("lets artsy.net subdomains without a protocol through", () =>
    sanitizeRedirect("//2013.artsy.net").should.equal("//2013.artsy.net"))

  it("lets relative paths through", () =>
    sanitizeRedirect("/path").should.equal("/path"))

  it("lets deeply nested artsy.net subdomains through", () =>
    sanitizeRedirect("https://foo.2013.artsy.net").should.equal(
      "https://foo.2013.artsy.net"
    ))

  it("lets artsy.net links through", () =>
    sanitizeRedirect("https://artsy.net/about").should.equal(
      "https://artsy.net/about"
    ))

  it("lets localhost through", () =>
    sanitizeRedirect(
      "http://localhost:3003/artwork/joe-piccillo-a-riposo"
    ).should.equal("http://localhost:3003/artwork/joe-piccillo-a-riposo"))

  it("lets internal paths through", () =>
    sanitizeRedirect("/log_in?redirect-to=/foo/bar").should.equal(
      "/log_in?redirect-to=/foo/bar"
    ))

  it("blocks data urls", () =>
    sanitizeRedirect(
      "data:text/html;base64,PHNjcmlwdD5hbGVydChsb2NhdGlvbi5oYXNoKTs8L3NjcmlwdD4="
    )[0].should.equal("/"))

  it("blocks external links not allowed; redirects to root", () =>
    sanitizeRedirect("http://google.com").should.equal("/"))

  it("blocks external links that lack protocol; redirects to root", () =>
    sanitizeRedirect("//google.com").should.equal("/"))

  it("blocks other protocols; redirects to root", () =>
    sanitizeRedirect("ftp://google.com").should.equal("/"))

  it("blocks other protocols; redirects to root", () =>
    sanitizeRedirect("javascript:alert(1);").should.equal("/"))

  it("blocks malformed URLs (1)", () =>
    sanitizeRedirect("http:/google.com").should.equal("/"))

  it("blocks malformed URLs (2)", () =>
    sanitizeRedirect("https:/google.com").should.equal("/"))

  return it("blocks malformed URLs (3)", () =>
    sanitizeRedirect("http:///google.com").should.equal("/"))
})
