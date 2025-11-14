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
      "http://2013.artsy.net",
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
      "https://foo.2013.artsy.net",
    )
  })

  it("lets artsy.net links through", () => {
    expect(sanitizeRedirect("https://artsy.net/about")).toEqual(
      "https://artsy.net/about",
    )
  })

  it("lets localhost through", () => {
    expect(
      sanitizeRedirect("http://localhost:3003/artwork/joe-piccillo-a-riposo"),
    ).toEqual("http://localhost:3003/artwork/joe-piccillo-a-riposo")
  })

  it("lets internal paths through", () => {
    expect(sanitizeRedirect("/log_in?redirect-to=/foo/bar")).toEqual(
      "/log_in?redirect-to=/foo/bar",
    )
  })

  it("blocks data urls", () => {
    expect(
      sanitizeRedirect(
        "data:text/html;base64,PHNjcmlwdD5hbGVydChsb2NhdGlvbi5oYXNoKTs8L3NjcmlwdD4=",
      )[0],
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
attacker.com/`),
    ).toEqual("/")
  })

  it("leaves query params alone", () => {
    expect(sanitizeRedirect("http://artsy.net?foo=bar")).toEqual(
      "http://artsy.net?foo=bar",
    )
  })

  it("blocks obfuscated javascript", () => {
    const obfuscatedXSS =
      "javascrip%09t%3Ac%3Dself%5B%27documen%27%2B%27t%27%5D%2Ch%3Dc.head%2Cx%3Dh.part%2Cp%3Dg%3Dh.id%2Ch.valueOf%3Dp.sub%2Cx.valueOf%3Dp.at%2Co%3Dg%2B%2B%2Cl%3Dg%2B%2B%2Cz%3Dg%2B%2B%2Ce%3Dg%2B%2B%2Ca%3Dg%2B%2B%2Cs%3Dg%2B%2B%2Cd%3Dg%2B%2B%2Cj%3Dg%2B%2B%2Cb%3Dg%2B%2B%2Ch.part%3Dh%2Bp%2Cy%3Dh%5B%27innerHTM%27%2B%27L%27%5D%3Dx%2Bp%2Ch.part%3Dh%5B%27innerHTM%27%2B%27L%27%5D%2Cp%2B%3Dx%2Ch.part%3Dc.nodeName%2Cp%2B%3Dx%2Ck%3Do%2Bp%2Cu%3Dl%2Bp%2Cw%3Dp%2Bl%2Ct%3Dw%2Bl%2Cf%3Dw%2Bo%2Bb%2Bw%2Ch%5B%27innerHTM%27%2B%27L%27%5D%3Dt%2Bs%2Bt%2Bd%2Bw%2Bz%2Bl%2Bf%2Bo%2Bu%2Ba%2Bj%2Bt%2Bl%2Bt%2Bo%2Bf%2Bl%2Bu%2Bg%2Bj%2Bw%2Bo%2Bk%2Bd%2Bl%2Ch%5B%27innerHTM%27%2B%27L%27%5D%3Dy%2Bh.innerHTML%2Bp%2Bg%2Bj%2Bf%2Bo%2Bl%2Bt%2Ba%2Bw%2Bl%2Bd%2Bp%2Ba%2Bk%2Bs%2Bk%2Bs%2Bu%2Ba%2Bu%2Ba%2Bj%2Bp%2Ba%2Bj%2Bh%2Bh"
    expect(sanitizeRedirect(decodeURIComponent(obfuscatedXSS))).toEqual("/")
  })
})
