import { userRequiredMiddleware } from "../userRequiredMiddleware"

describe("userRequiredMiddleware", () => {
  it("skips middleware if not correct pageType", () => {
    const req = {
      path: "/do-not-match",
      query: {
        "accepted-conditions": "true",
      },
    }

    const res = {
      redirect: jest.fn(),
    }

    const next = jest.fn()
    userRequiredMiddleware(req, res, next)
    expect(next).toHaveBeenCalled()
  })

  describe("user-required routes perform redirect if CURRENT_USER=undefined", () => {
    it("performs redirect on an /auction-registration route", () => {
      const spy = jest.fn()
      const req = {
        path: "/auction-registration/",
        url: "/auction-registration/",
        originalUrl: "/auction-registration/",
        query: {
          "accepted-conditions": false,
        },
      }
      const res = {
        redirect: spy,
        locals: {
          sd: {
            CURRENT_USER: null,
          },
        },
      }

      const next = jest.fn()
      userRequiredMiddleware(req, res, next)
      expect(spy).toHaveBeenCalledWith(
        `/login?redirectTo=${encodeURIComponent(req.originalUrl)}`
      )
      expect(next).not.toHaveBeenCalled()
    })

    it("performs redirect on a /orders route", () => {
      const spy = jest.fn()
      const req = {
        path: "/orders/",
        url: "/orders/",
        originalUrl: "/orders/",
        query: {
          "accepted-conditions": false,
        },
      }
      const res = {
        redirect: spy,
        locals: {
          sd: {
            CURRENT_USER: null,
          },
        },
      }

      const next = jest.fn()
      userRequiredMiddleware(req, res, next)
      expect(spy).toHaveBeenCalledWith(
        `/login?redirectTo=${encodeURIComponent(req.originalUrl)}`
      )
      expect(next).not.toHaveBeenCalled()
    })

    it("performs redirect on an /identity-verification route", () => {
      const spy = jest.fn()
      const req = {
        path: "/identity-verification/123",
        url: "/identity-verification/123",
        originalUrl: "/identity-verification/123",
        query: {
          "accepted-conditions": false,
        },
      }
      const res = {
        redirect: spy,
        locals: {
          sd: {
            CURRENT_USER: null,
          },
        },
      }

      const next = jest.fn()
      userRequiredMiddleware(req, res, next)
      expect(spy).toHaveBeenCalledWith(
        `/login?redirectTo=${encodeURIComponent(req.originalUrl)}`
      )
      expect(next).not.toHaveBeenCalled()
    })
  })
})
