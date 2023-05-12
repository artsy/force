import { redirectWithCanonicalParams } from "Apps/Artist/Server/redirect"

describe("redirectWithCanonicalParams", () => {
  describe("with an invalid sort", () => {
    it("301 redirects to url without the invalid sort param", () => {
      const req = {
        path: "/artist/sam-king",
        query: {
          sort: "-default_trending_score",
          foo: "bar",
        },
      }

      const res = {
        redirect: jest.fn(),
      }

      redirectWithCanonicalParams({ req, res })
      expect(res.redirect).toHaveBeenCalledWith(301, "/artist/sam-king?foo=bar")
    })
  })

  describe("with a valid sort", () => {
    it("does nothing", () => {
      const req = {
        path: "/artist/sam-king",
        query: {
          sort: "-anything_else",
          foo: "bar",
        },
      }

      const res = {
        redirect: jest.fn(),
      }

      redirectWithCanonicalParams({ req, res })
      expect(res.redirect).not.toHaveBeenCalled()
    })
  })
})
