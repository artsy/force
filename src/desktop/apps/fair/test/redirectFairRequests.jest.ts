import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"
import { redirectFairRequests } from "../redirectFairRequests"

describe("redirectFairRequests", () => {
  let req: Partial<ArtsyRequest>
  let res: Partial<ArtsyResponse>
  let next: jest.Mock<NextFunction>

  beforeEach(() => {
    jest.resetModules()

    req = {
      params: { id: "big-expo" },
      route: "/:id",
    }

    res = {
      locals: {
        profile: {
          get: jest.fn(attr => {
            if (attr === "owner_type") return "Fair"
            if (attr === "owner") return { id: "big-expo-2020" }
          }),
        },
      },
      redirect: jest.fn(),
    }

    next = jest.fn()
  })

  it("redirects /:profileSlug to /fair/:fairSlug", () => {
    req.params = { id: "big-expo" }
    req.route = "/:id"

    redirectFairRequests(req, res, next)

    expect(res.redirect).toHaveBeenCalledWith(301, "/fair/big-expo-2020")
  })

  it("redirects /:profileSlug/info to /fair/:fairSlug/info", () => {
    req.params = { id: "big-expo" }
    req.route = { path: "/:id/:tab*" }
    res.locals.tab = "info"

    redirectFairRequests(req, res, next)

    expect(res.redirect).toHaveBeenCalledWith(301, "/fair/big-expo-2020/info")
  })

  it("redirects /:profileSlug/browse/artworks to /fair/:fairSlug/artworks", () => {
    req.params = { id: "big-expo", "0": "artworks" }
    req.route = { path: "/:id/browse/*" }
    res.locals.tab = "browse"

    redirectFairRequests(req, res, next)

    expect(res.redirect).toHaveBeenCalledWith(
      301,
      "/fair/big-expo-2020/artworks"
    )
  })

  it("temporarily redirects to /art-fairs if there is no ID for some reason", () => {
    res.locals.profile.get = jest.fn(attr => {
      if (attr === "owner_type") return "Fair"
      if (attr === "owner") return { id: null }
    })

    req.params = { id: "big-expo" }
    req.route = { path: "/:id" }

    redirectFairRequests(req, res, next)

    expect(res.redirect).toHaveBeenCalledWith(302, "/art-fairs")
  })

  describe("when Profile is for something other than a Fair", () => {
    it("does not redirect", () => {
      res.locals.profile.get = jest.fn(attr => {
        if (attr === "owner_type") return "Partner"
        if (attr === "owner") return { id: "some-partner" }
      })

      redirectFairRequests(req, res, next)

      expect(res.redirect).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })
  })
})
