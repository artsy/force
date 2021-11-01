import { redirectQueryToTerm } from "../redirectQueryToTerm"

describe("redirectQueryToTerm", () => {
  describe("missing query.term", () => {
    it("if query.q is present it redirects to search page", async () => {
      const req = {
        path: "/search",
        query: {
          term: null,
          q: "foo",
        },
      }

      const spy = jest.fn()
      const res = {
        redirect: spy,
        status: () => ({
          send: jest.fn(),
        }),
        locals: {
          sd: {},
          asset: jest.fn(),
        },
      }

      const next = jest.fn()
      await redirectQueryToTerm({ req, res, next })
      expect(spy).toHaveBeenCalledWith(302, "/search?term=foo")
      expect(next).not.toHaveBeenCalled()
    })

    it("if q.query is not present it redirects to home", async () => {
      const req = {
        path: "/search",
        query: {
          term: null,
          q: null,
        },
      }

      const spy = jest.fn()
      const res = {
        redirect: spy,
        status: () => ({
          send: jest.fn(),
        }),
        locals: {
          sd: {},
          asset: jest.fn(),
        },
      }

      const next = jest.fn()
      await redirectQueryToTerm({ req, res, next })
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
      redirect: spy,
      status: () => ({
        send: jest.fn(),
      }),
      locals: {
        sd: {},
        asset: jest.fn(),
      },
    }

    const next = jest.fn()
    await redirectQueryToTerm({ req, res, next })
    expect(res.locals.sd.searchQuery).toEqual("foo")
  })
})
