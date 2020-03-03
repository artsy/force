import { userRequiredMiddleware } from "../userRequiredMiddleware"

describe("orderMiddleware", () => {
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

  it("performs redirect if CURRENT_USER=undefined", () => {
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
})
