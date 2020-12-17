import { searchMiddleware } from "../searchMiddleware"

jest.mock("@artsy/stitch")

describe("searchMiddleware", () => {
  it("skips middleware if not correct pageType", async () => {
    const req = {
      path: "/do-not-match",
      query: {
        "accepted-conditions": "true",
      },
    }

    const res = {
      locals: {
        asset: jest.fn(),
        sd: {},
      },
      redirect: jest.fn(),
      status: () => ({
        send: jest.fn(),
      }),
    }

    const next = jest.fn()
    await searchMiddleware(req, res, next)
    expect(next).toHaveBeenCalled()
  })

  describe("missing query.term", () => {
    it("if query.q is present it redirects to search page", async () => {
      const req = {
        path: "/search",
        query: {
          q: "foo",
          term: null,
        },
      }

      const spy = jest.fn()
      const res = {
        locals: {
          asset: jest.fn(),
          sd: {},
        },
        redirect: spy,
        status: () => ({
          send: jest.fn(),
        }),
      }

      const next = jest.fn()
      await searchMiddleware(req, res, next)
      expect(spy).toHaveBeenCalledWith(302, "/search?term=foo")
      expect(next).not.toHaveBeenCalled()
    })

    it("if q.query is not present it redirects to home", async () => {
      const req = {
        path: "/search",
        query: {
          q: null,
          term: null,
        },
      }

      const spy = jest.fn()
      const res = {
        locals: {
          asset: jest.fn(),
          sd: {},
        },
        redirect: spy,
        status: () => ({
          send: jest.fn(),
        }),
      }

      const next = jest.fn()
      await searchMiddleware(req, res, next)
      expect(spy).toHaveBeenCalledWith(302, "/")
    })
  })

  it("if has query.term it sets sd.searchQuery", async () => {
    const req = {
      path: "/search",
      query: {
        term: "foo",
      },
    }

    const spy = jest.fn()
    const res: any = {
      locals: {
        asset: jest.fn(),
        sd: {},
      },
      redirect: spy,
      status: () => ({
        send: jest.fn(),
      }),
    }

    const next = jest.fn()
    await searchMiddleware(req, res, next)
    expect(res.locals.sd.searchQuery).toEqual("foo")
  })
})
