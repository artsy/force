import { ArtsyRequest } from "Server/middleware/artsyExpress"
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
      "https://www.artsy.net/artwork/ellsworth-kelly-red-orange-over-blue-2"
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
      "https://www.artsy.net/artwork/ellsworth-kelly-red-orange-over-blue-2?foo=bar"
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
      "https://www.artsy.net/artwork/ellsworth-kelly-red-orange-over-blue-2"
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
      "https://www.artsy.net/artwork/ellsworth-kelly-red-orange-over-blue-2"
    )

    expect(req.session.redirectTo).toBeUndefined()
  })
})
