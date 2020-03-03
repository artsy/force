import { bidderRegistrationMiddleware } from "../bidderRegistrationMiddleware"

describe("bidderRegistrationMiddleware", () => {
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
    bidderRegistrationMiddleware(req, res, next)
    expect(next).toHaveBeenCalled()
  })

  it("performs redirect if `accepted-conditions` queryParam is true", () => {
    const spy = jest.fn()
    const req = {
      path: "/auction-registration/",
      url: "/auction-registration/",
      user: {
        toJSON: () => null,
      },
      query: {
        "accepted-conditions": "true",
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
    bidderRegistrationMiddleware(req, res, next)
    expect(spy).toHaveBeenCalledWith("/auction-registration-modal/")
    expect(next).not.toHaveBeenCalled()
  })
})
