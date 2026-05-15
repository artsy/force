import type { ArtsyRequest } from "Server/middleware/artsyExpress"
import redirectBack from "Server/passport/lib/app/redirectBack"

describe("redirectBack", () => {
  it("returns a redirect to an artsy.net url", () => {
    const req = {
      session: {
        redirectTo:
          "https://www.artsy.net/artwork/ellsworth-kelly-red-orange-over-blue-2",
      },
    } as ArtsyRequest

    const redirect = redirectBack(req)

    expect(redirect).toEqual(
      "https://www.artsy.net/artwork/ellsworth-kelly-red-orange-over-blue-2",
    )
  })

  it("returns a redirect to an artsy.net url with a query string", () => {
    const req = {
      session: {
        redirectTo:
          "https://www.artsy.net/artwork/ellsworth-kelly-red-orange-over-blue-2?foo=bar",
      },
    } as ArtsyRequest

    const redirect = redirectBack(req)

    expect(redirect).toEqual(
      "https://www.artsy.net/artwork/ellsworth-kelly-red-orange-over-blue-2?foo=bar",
    )
  })

  it("does not return a redirect to an unsafe url", () => {
    const req = {
      session: {
        redirectTo: "https://www.google.com",
      },
    } as ArtsyRequest

    const redirect = redirectBack(req)

    expect(redirect).toEqual("/")
  })

  it("uses body redirect before query and params redirect values", () => {
    const req = {
      body: { "redirect-to": "/from-body" },
      params: { redirect_uri: "/from-params" },
      query: { "redirect-to": "/from-query" },
      session: {},
    } as any

    const redirect = redirectBack(req)

    expect(redirect).toEqual("/from-body")
  })

  it("uses query redirect before params redirect values", () => {
    const req = {
      body: {},
      params: { redirect_uri: "/from-params" },
      query: { "redirect-to": "/from-query" },
      session: {},
    } as any

    const redirect = redirectBack(req)

    expect(redirect).toEqual("/from-query")
  })

  it("uses params redirect values when no earlier redirect source exists", () => {
    const req = {
      body: {},
      params: { redirect_uri: "/from-params" },
      query: {},
      session: {},
    } as any

    const redirect = redirectBack(req)

    expect(redirect).toEqual("/from-params")
  })

  it("uses the after-signup destination before request redirect values", () => {
    const req = {
      artsyPassportSignedUp: true,
      body: { "redirect-to": "/from-body" },
      params: {},
      query: {},
      session: {},
    } as any

    const redirect = redirectBack(req)

    expect(redirect).toEqual("/?onboarding=true")
  })

  it("does not use the after-signup destination when onboarding is skipped", () => {
    const req = {
      artsyPassportSignedUp: true,
      body: { "redirect-to": "/from-body" },
      params: {},
      query: {},
      session: { skipOnboarding: true },
    } as any

    const redirect = redirectBack(req)

    expect(redirect).toEqual("/from-body")
  })

  it("sanitizes unsafe request redirect values", () => {
    const req = {
      body: { "redirect-to": "https://example.com/phishing" },
      params: {},
      query: {},
      session: {},
    } as any

    const redirect = redirectBack(req)

    expect(redirect).toEqual("/")
  })

  it("does not clear the session if a res.redirect is not passed", () => {
    const req = {
      session: {
        redirectTo:
          "https://www.artsy.net/artwork/ellsworth-kelly-red-orange-over-blue-2",
      },
    } as ArtsyRequest

    const res = {
      redirect: jest.fn(),
    } as any

    redirectBack(req)

    expect(res.redirect).not.toHaveBeenCalled()

    expect(req.session.redirectTo).toEqual(
      "https://www.artsy.net/artwork/ellsworth-kelly-red-orange-over-blue-2",
    )
  })

  it("clears the session if a res.redirect is passed", () => {
    const req = {
      session: {
        redirectTo:
          "https://www.artsy.net/artwork/ellsworth-kelly-red-orange-over-blue-2",
      },
    } as ArtsyRequest

    const res = {
      redirect: jest.fn(),
    } as any

    redirectBack(req, res)

    expect(res.redirect).toHaveBeenCalledWith(
      "https://www.artsy.net/artwork/ellsworth-kelly-red-orange-over-blue-2",
    )

    expect(req.session.redirectTo).toBeUndefined()
  })

  it("clears skipOnboarding when redirecting", () => {
    const req = {
      body: {},
      params: {},
      query: {},
      session: {
        redirectTo: "/artworks",
        skipOnboarding: true,
      },
    } as any

    const res = {
      redirect: jest.fn(),
    } as any

    redirectBack(req, res)

    expect(res.redirect).toHaveBeenCalledWith("/artworks")
    expect(req.session.redirectTo).toBeUndefined()
    expect(req.session.skipOnboarding).toBeUndefined()
  })

  it("appends onboarding=true for new social auth signups", () => {
    const req = {
      artsyPassportSignedUp: true,
      body: {},
      params: {},
      query: { "redirect-to": "/" },
      session: {},
    } as any

    const redirect = redirectBack(req)

    expect(redirect).toEqual("/?onboarding=true")
  })

  it("does not append onboarding=true for existing user logins", () => {
    const req = {
      artsyPassportSignedUp: false,
      body: {},
      params: {},
      query: { "redirect-to": "/" },
      session: {},
    } as any

    const redirect = redirectBack(req)

    expect(redirect).toEqual("/")
  })

  it("does not append onboarding=true when skipOnboarding is true", () => {
    const req = {
      artsyPassportSignedUp: true,
      body: {},
      params: {},
      query: { "redirect-to": "/" },
      session: { skipOnboarding: true },
    } as any

    const redirect = redirectBack(req)

    expect(redirect).toEqual("/")
  })
})
