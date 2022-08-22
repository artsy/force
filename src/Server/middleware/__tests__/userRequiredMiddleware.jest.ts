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
      originalUrl: "/orders/",
      path: "/orders/",
    }
    const res = {
      locals: {
        sd: {
          CURRENT_USER: { id: "1" },
        },
      },
      redirect: jest.fn(),
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
        originalUrl: "/orders/",
        path: "/orders/",
        query: {
          "accepted-conditions": false,
        },
        url: "/orders/",
      }
      const res = {
        locals: {
          sd: {
            CURRENT_USER: null,
          },
        },
        redirect: spy,
      }

      const next = jest.fn()
      userRequiredMiddleware(req, res, next)
      expect(spy).toHaveBeenCalledWith(
        `/login?redirectTo=${encodeURIComponent(req.originalUrl)}`
      )
      expect(next).not.toHaveBeenCalled()
    })

    it("performs redirect on a /purchases route", () => {
      const spy = jest.fn()
      const req = {
        originalUrl: "/settings/purchases/",
        path: "/settings/purchases/",
        query: {
          "accepted-conditions": false,
        },
      }
      const res = {
        locals: {
          sd: {
            CURRENT_USER: null,
          },
        },
        redirect: spy,
      }
      const next = jest.fn()

      userRequiredMiddleware(req, res, next)
      expect(res.redirect).toHaveBeenCalledWith(
        "/login?redirectTo=%2Fsettings%2Fpurchases%2F"
      )
      expect(next).not.toHaveBeenCalled()
    })

    it("redirects when visiting conversations route", () => {
      const req = {
        originalUrl: "/user/conversations",
        path: "/user/conversations",
      }
      const res = {
        locals: {
          sd: {
            CURRENT_USER: null,
          },
        },
        redirect: jest.fn(),
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
        originalUrl: "/user/conversations/123",
        path: "/user/conversations/123",
      }
      const res = {
        locals: {
          sd: {
            CURRENT_USER: null,
          },
        },
        redirect: jest.fn(),
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
