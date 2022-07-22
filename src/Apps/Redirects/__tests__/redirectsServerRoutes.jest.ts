import { Request, NextFunction } from "express"
import {
  handlePartner,
  handleFair,
  ResWithProfile,
} from "../redirectsServerRoutes"

describe("handlePartner", () => {
  let req: Request
  let res: ResWithProfile
  let next: jest.Mock<NextFunction>

  beforeEach(() => {
    jest.resetModules()

    res = ({
      locals: {
        profile: {
          owner: {
            __typename: "Partner",
            slug: "white-cube",
          },
        },
      },
      redirect: jest.fn(),
    } as unknown) as ResWithProfile

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
      } as unknown) as Request

      handlePartner(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith(301, result)
    }
  )

  it("does not redirect is not a partner", () => {
    res = ({
      locals: {
        profile: {
          owner: {
            __typename: "Fair",
            slug: "example",
          },
        },
      },
      redirect: jest.fn(),
    } as unknown) as ResWithProfile

    handlePartner(req, res, next)

    expect(res.redirect).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })
})

describe("handleFair", () => {
  let req: Request
  let res: ResWithProfile
  let next: jest.Mock<NextFunction>

  beforeEach(() => {
    jest.resetModules()

    req = ({
      params: { id: "big-expo" },
      route: "/:id",
    } as unknown) as Request

    res = ({
      locals: {
        profile: {
          owner: {
            __typename: "Fair",
            slug: "big-expo-2020",
          },
        },
      },
      redirect: jest.fn(),
    } as unknown) as ResWithProfile

    next = jest.fn()
  })

  it("redirects /:profileSlug to /fair/:fairSlug", () => {
    req.params = { id: "big-expo" }
    req.route = "/:id"

    handleFair(req, res, next)

    expect(res.redirect).toHaveBeenCalledWith(301, "/fair/big-expo-2020")
  })

  it("redirects /:profileSlug/info to /fair/:fairSlug/info", () => {
    req.params = { id: "big-expo" }
    req.route = { path: "/:id/:tab*" }
    res.locals.tab = "info"

    handleFair(req, res, next)

    expect(res.redirect).toHaveBeenCalledWith(301, "/fair/big-expo-2020/info")
  })

  it("redirects /:profileSlug/browse/artworks to /fair/:fairSlug/artworks", () => {
    req.params = { id: "big-expo", "0": "artworks" }
    req.route = { path: "/:id/browse/*" }
    res.locals.tab = "browse"

    handleFair(req, res, next)

    expect(res.redirect).toHaveBeenCalledWith(
      301,
      "/fair/big-expo-2020/artworks"
    )
  })

  it("temporarily redirects to /art-fairs if there is no ID for some reason", () => {
    res.locals.profile = {
      owner: {
        __typename: "Fair",
        // @ts-ignore
        slug: null,
      },
    }

    req.params = { id: "big-expo" }
    req.route = { path: "/:id" }

    handleFair(req, res, next)

    expect(res.redirect).toHaveBeenCalledWith(302, "/art-fairs")
  })

  describe("when Profile is for something other than a Fair", () => {
    it("does not redirect", () => {
      res.locals.profile = {
        owner: {
          __typename: "Partner",
          slug: "some-partner",
        },
      }

      handleFair(req, res, next)

      expect(res.redirect).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })
  })
})
