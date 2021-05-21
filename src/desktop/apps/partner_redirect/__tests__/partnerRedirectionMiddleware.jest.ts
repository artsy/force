import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"
import { partnerRedirectionMiddleware } from "../partnerRedirectionMiddleware"

describe("partnerRedirectionMiddleware", () => {
  let req: Partial<ArtsyRequest>
  let res: Partial<ArtsyResponse>
  let next: jest.Mock<NextFunction>

  beforeEach(() => {
    jest.resetModules()

    res = {
      locals: {
        profile: {
          isPartner: jest.fn(() => {
            return true
          }),
        },
      },
      redirect: jest.fn(),
    }

    next = jest.fn()
  })

  it.each([
    ["/:id", "/partner/white-cube", "/white-cube", { id: "white-cube" }],
    [
      "/:id/overview",
      "/partner/white-cube",
      "/white-cube/overview",
      { id: "white-cube" },
    ],
    [
      "/:id/shows",
      "/partner/white-cube/shows",
      "/white-cube/shows",
      { id: "white-cube" },
    ],
    [
      "/:id/works",
      "/partner/white-cube/works",
      "/white-cube/works",
      { id: "white-cube" },
    ],
    [
      "/:id/artists",
      "/partner/white-cube/artists",
      "/white-cube/artists",
      { id: "white-cube" },
    ],
    [
      "/:id/artist/:artistId",
      "/partner/white-cube/artists/artist_slug",
      "/white-cube/artist/artist_slug",
      { artistId: "artist_slug", id: "white-cube" },
    ],
    [
      "/:id/articles",
      "/partner/white-cube/articles",
      "/white-cube/articles",
      { id: "white-cube" },
    ],
    [
      "/:id/contact",
      "/partner/white-cube/contact",
      "/white-cube/contact",
      { id: "white-cube" },
    ],
  ])(
    "redirects %s to %s",
    (route: string, result: string, path: string, params: any) => {
      req = { route: { path: route }, path, params }

      partnerRedirectionMiddleware(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith(301, result)
    }
  )

  it("does not redirect is not a partner", () => {
    res = {
      locals: {
        profile: {
          isPartner: jest.fn(() => {
            return false
          }),
        },
      },
      redirect: jest.fn(),
    }

    partnerRedirectionMiddleware(req, res, next)

    expect(res.redirect).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })
})
