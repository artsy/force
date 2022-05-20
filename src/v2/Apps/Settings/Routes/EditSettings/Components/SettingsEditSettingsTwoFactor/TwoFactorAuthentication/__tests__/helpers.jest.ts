import { afterUpdateRedirect, redirectMessage } from "../helpers"

const { location: originalLocation } = window

describe("afterUpdateRedirect", () => {
  beforeAll(() => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    delete window.location
  })
  afterEach(() => {
    window.location = originalLocation
  })

  it("returns host for trusted domain", () => {
    const search = "?after_update=https%3A%2F%2Fcms.artsy.net"
    window.location = { search } as any
    expect(afterUpdateRedirect()).toEqual("https://cms.artsy.net")
  })
  it("returns host and path for trusted domain", () => {
    const search = "?after_update=https%3A%2F%2Fcms.artsy.net%2Fauth%2Fartsy"
    window.location = { search } as any
    expect(afterUpdateRedirect()).toEqual("https://cms.artsy.net/auth/artsy")
  })
  it("returns / for untrusted domains", () => {
    const search = "?after_update=https%3A%2F%2Fcms.evil.net"
    window.location = { search } as any
    expect(afterUpdateRedirect()).toEqual("/")
  })
  it("returns / for relative root", () => {
    const search = "?after_update=/"
    window.location = { search } as any
    expect(afterUpdateRedirect()).toEqual("/")
  })
  it("returns /foo for relative foo", () => {
    const search = "?after_update=/foo"
    window.location = { search } as any
    expect(afterUpdateRedirect()).toEqual("/foo")
  })
  it("returns empty string for for no after_update param", () => {
    const search = "?foo=bar"
    window.location = { search } as any
    expect(afterUpdateRedirect()).toEqual("")
  })
  it("returns empty string for for no search string at all", () => {
    const search = ""
    window.location = { search } as any
    expect(afterUpdateRedirect()).toEqual("")
  })
})

describe("redirectMessage", () => {
  it("returns redir message for host", () => {
    const url = "https://cms.artsy.net"
    expect(redirectMessage(url)).toEqual(
      "You will be redirected to: cms.artsy.net"
    )
  })
  it("returns redir message for host and path", () => {
    const url = "https://cms.artsy.net/auth/artsy"
    expect(redirectMessage(url)).toEqual(
      "You will be redirected to: cms.artsy.net"
    )
  })
  it("returns empty string for relative /", () => {
    const url = "/"
    expect(redirectMessage(url)).toEqual("")
  })
  it("returns empty string for relative /foo", () => {
    const url = "/"
    expect(redirectMessage(url)).toEqual("")
  })
  it("returns empty string for empty url", () => {
    const url = ""
    expect(redirectMessage(url)).toEqual("")
  })
})
