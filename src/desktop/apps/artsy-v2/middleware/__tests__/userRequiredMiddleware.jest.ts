import { userRequiredMiddleware } from "../userRequiredMiddleware"

describe("userRequiredMiddleware", () => {
  it("does not redirect for non-matching route", () => {
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
    expect(res.redirect).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it("does not redirect for matching route when current user is present", () => {
    const req = {
      path: "/orders/",
      originalUrl: "/orders/",
    }
    const res = {
      redirect: jest.fn(),
      locals: {
        sd: {
          CURRENT_USER: { id: "1" },
        },
      },
    }
    const next = jest.fn()

    userRequiredMiddleware(req, res, next)
    expect(res.redirect).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  describe("user-required routes perform redirect if CURRENT_USER=undefined", () => {
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

    it("redirects when visiting conversations route", () => {
      const req = {
        path: "/user/conversations",
        originalUrl: "/user/conversations",
      }
      const res = {
        redirect: jest.fn(),
        locals: {
          sd: {
            CURRENT_USER: null,
          },
        },
      }
      const next = jest.fn()

      userRequiredMiddleware(req, res, next)
      expect(res.redirect).toHaveBeenCalledWith(
        "/login?redirectTo=%2Fuser%2Fconversations"
      )
      expect(next).not.toHaveBeenCalled()
    })

    it("redirects when visiting nested conversations route", () => {
      const req = {
        path: "/user/conversations/123",
        originalUrl: "/user/conversations/123",
      }
      const res = {
        redirect: jest.fn(),
        locals: {
          sd: {
            CURRENT_USER: null,
          },
        },
      }
      const next = jest.fn()

      userRequiredMiddleware(req, res, next)
      expect(res.redirect).toHaveBeenCalledWith(
        "/login?redirectTo=%2Fuser%2Fconversations%2F123"
      )
      expect(next).not.toHaveBeenCalled()
    })
  })
})
