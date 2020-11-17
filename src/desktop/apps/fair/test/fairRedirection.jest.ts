import { NextFunction, Request, Response } from "express"

let req: Partial<Request>
let res: Partial<Response>
let next: jest.Mock<NextFunction>

describe("redirectFairRequests", () => {
  beforeEach(() => {
    jest.resetModules()

    req = {
      user: { hasLabFeature: jest.fn(() => false) },
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

  describe("when ENABLE_FAIRS_UPDATE is false", () => {
    beforeEach(() => {
      jest.mock("../../../config", () => ({
        ENABLE_FAIRS_UPDATE: false,
      }))
    })

    describe("with a user who has the lab feature", () => {
      it("redirects to the new fair page", () => {
        const { redirectFairRequests } = require("../fairRedirection")
        req.user.hasLabFeature = jest.fn(() => true)

        redirectFairRequests(req, res, next)

        expect(res.redirect).toHaveBeenCalledWith(301, "/fair/big-expo-2020")
      })
    })

    describe("with a user who does not have the lab feature", () => {
      it("does not redirect", () => {
        const { redirectFairRequests } = require("../fairRedirection")
        req.user.hasLabFeature = jest.fn(() => false)

        redirectFairRequests(req, res, next)

        expect(res.redirect).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
      })
    })
  })

  describe("when ENABLE_FAIRS_UPDATE is true", () => {
    beforeEach(() => {
      jest.mock("../../../config", () => ({
        ENABLE_FAIRS_UPDATE: true,
      }))
    })

    describe("with a user who has the lab feature", () => {
      it("redirects to the new fair page", () => {
        const { redirectFairRequests } = require("../fairRedirection")
        req.user.hasLabFeature = jest.fn(() => true)

        redirectFairRequests(req, res, next)

        expect(res.redirect).toHaveBeenCalledWith(301, "/fair/big-expo-2020")
      })
    })

    describe("with a user who does not have the lab feature", () => {
      it("redirects to the new fair page", () => {
        const { redirectFairRequests } = require("../fairRedirection")
        req.user.hasLabFeature = jest.fn(() => false)

        redirectFairRequests(req, res, next)

        expect(res.redirect).toHaveBeenCalledWith(301, "/fair/big-expo-2020")
      })
    })
  })

  describe("when a fair is in DISABLE_FAIRS_UPDATE_SLUGS", () => {
    beforeEach(() => {
      jest.mock("../../../config", () => ({
        ENABLE_FAIRS_UPDATE: true,
        DISABLE_FAIRS_UPDATE_SLUGS: "big-expo,foo-fair",
      }))
    })

    it("does not redirect, even if ENABLE_FAIRS_UPDATE is true", () => {
      const { redirectFairRequests } = require("../fairRedirection")
      req.user.hasLabFeature = jest.fn(() => false)

      redirectFairRequests(req, res, next)

      expect(res.redirect).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })

    it("does not redirect, even if user has lab feature", () => {
      const { redirectFairRequests } = require("../fairRedirection")
      req.user.hasLabFeature = jest.fn(() => true)

      redirectFairRequests(req, res, next)

      expect(res.redirect).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })

    it("does not redirect, when loading via mobile routes", () => {
      const { redirectFairRequests } = require("../fairRedirection")
      req.params = { profileId: "foo-fair" }

      redirectFairRequests(req, res, next)

      expect(res.redirect).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })
  })

  describe("paths to redirect", () => {
    beforeEach(() => {
      jest.mock("../../../config", () => ({
        ENABLE_FAIRS_UPDATE: true,
      }))
    })

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
    beforeEach(() => {
      jest.mock("../../../config", () => ({
        ENABLE_FAIRS_UPDATE: true,
      }))
    })

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
