import { NextFunction, Request, Response } from "express"

let req: Partial<Request>
let res: Partial<Response>
let next: jest.Mock<NextFunction>

describe("redirectFairRequests", () => {
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

  describe("paths to redirect", () => {
    it("redirects /:profileSlug --> /fair/:fairSlug", () => {
      const { redirectFairRequests } = require("../fairRedirection")
      req.params = { id: "big-expo" }
      req.route = "/:id"

      redirectFairRequests(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith(301, "/fair/big-expo-2020")
    })

    it("redirects /:profileSlug/info --> /fair/:fairSlug/info", () => {
      const { redirectFairRequests } = require("../fairRedirection")
      req.params = { id: "big-expo" }
      req.route = { path: "/:id/:tab*" }
      res.locals.tab = "info"

      redirectFairRequests(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith(301, "/fair/big-expo-2020/info")
    })

    it("redirects /:profileSlug/browse/artworks --> /fair/:fairSlug/artworks", () => {
      const { redirectFairRequests } = require("../fairRedirection")
      req.params = { id: "big-expo", "0": "artworks" }
      req.route = { path: "/:id/browse/*" }
      res.locals.tab = "browse"

      redirectFairRequests(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith(
        301,
        "/fair/big-expo-2020/artworks"
      )
    })
  })

  describe("when Profile is for something other than a Fair", () => {
    it("does not redirect", () => {
      const { redirectFairRequests } = require("../fairRedirection")

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
