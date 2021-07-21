import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"
import { partnerRedirectionMiddleware } from "../partnerRedirectionMiddleware"

describe("partnerRedirectionMiddleware", () => {
  let req: ArtsyRequest
  let res: ArtsyResponse
  let next: jest.Mock<NextFunction>

  beforeEach(() => {
    jest.resetModules()

    res = ({
      locals: {
        profile: {
          isPartner: jest.fn(() => {
            return true
          }),
          get: jest.fn(attr => {
            if (attr === "owner") return { id: "white-cube" }
          }),
        },
      },
      redirect: jest.fn(),
    } as unknown) as ArtsyResponse

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
    ["/:id/about", "/partner/white-cube", "/white-cube", { id: "white-cube" }],
    [
      "/:id/collection",
      "/partner/white-cube/works",
      "/white-cube/collection",
      { id: "white-cube" },
    ],
    [
      "/:id/shop",
      "/partner/white-cube/works",
      "/white-cube/shop",
      { id: "white-cube" },
    ],
    [
      "/:id/contact",
      "/partner/white-cube/contact",
      "/white-cube-gallery/contact",
      { id: "white-cube-gallery" },
    ],
    [
      "/:id/artist/:artistId",
      "/partner/white-cube/artists/artist_slug",
      "/white-cube-gallery/artist/artist_slug",
      { artistId: "artist_slug", id: "white-cube-gallery" },
    ],
  ])(
    "redirects %s to %s",
    (route: string, result: string, path: string, params: any) => {
      req = ({
        route: { path: route },
        path,
        params,
      } as unknown) as ArtsyRequest

      partnerRedirectionMiddleware(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith(301, result)
    }
  )

  it("does not redirect is not a partner", () => {
    res = ({
      locals: {
        profile: {
          isPartner: jest.fn(() => {
            return false
          }),
        },
      },
      redirect: jest.fn(),
    } as unknown) as ArtsyResponse

    partnerRedirectionMiddleware(req, res, next)

    expect(res.redirect).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })
})
