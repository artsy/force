/* eslint-disable no-restricted-imports */
import { requestGravity } from "../../http"
import { headerLogin, trustTokenLogin } from "../token_login"

jest.mock("../../http")
jest.mock("Server/passport/lib/options", () => ({
  ARTSY_ID: "artsy-id",
  ARTSY_SECRET: "artsy-secret",
  ARTSY_URL: "https://api.artsy.net",
  logoutPath: "/users/sign_out",
}))

const mockRequestGravity = requestGravity as jest.Mock

describe("token login middleware", () => {
  let req
  let res
  let next

  beforeEach(() => {
    mockRequestGravity.mockReset()
  })

  describe("#headerLogin", () => {
    beforeEach(() => {
      req = {
        query: {},
        get: jest.fn(() => "access-foo-token"),
        login: jest.fn(),
      }
      res = { send: jest.fn() }
      next = jest.fn()
    })

    it("logs in a user if they pass their access token as a header", () => {
      headerLogin(req, res, next)
      expect(req.login.mock.calls[0][0].accessToken).toEqual("access-foo-token")
    })

    it("does not log in a user on sign out", () => {
      req.path = "/users/sign_out"
      headerLogin(req, res, next)
      expect(next).toHaveBeenCalled()
    })
  })

  describe("trustTokenLogin", () => {
    it("immediately nexts if there is no trust_token query param", () => {
      const req = { query: {}, url: "/target-path" }
      const res = { redirect: jest.fn() }
      const next = jest.fn()
      trustTokenLogin(req as any, res as any, next)
      expect(mockRequestGravity).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
      expect(res.redirect).not.toHaveBeenCalled()
    })

    it(`logs the user in when there is a trust_token present, redirecting to \
a url sans trust_token param`, async () => {
      const req = {
        connection: { remoteAddress: "99.99.99.99" },
        headers: {},
        login: jest.fn((user, cb) => cb(null)),
        query: { trust_token: "xxxx" },
        url: "/target-path?trust_token=xxxx",
      }
      const res = { redirect: jest.fn() }
      const next = jest.fn()
      mockRequestGravity.mockResolvedValue({
        body: { access_token: "yyy" },
        ok: true,
      })
      await trustTokenLogin(req as any, res as any, next)
      expect(mockRequestGravity).toHaveBeenCalledWith(
        expect.objectContaining({
          body: expect.objectContaining({ code: "xxxx" }),
          url: "https://api.artsy.net/oauth2/access_token",
        }),
      )
      expect(res.redirect).toHaveBeenCalled()
      expect(res.redirect.mock.calls[0][0]).toEqual("/target-path")
    })

    it("preserves any other query string params", async () => {
      const req = {
        connection: { remoteAddress: "99.99.99.99" },
        headers: {},
        login: jest.fn((user, cb) => cb(null)),
        query: { trust_token: "xxxx", foo: "bar", bar: "baz" },
        url: "/target-path?foo=bar&trust_token=xxxx&bar=baz",
      }
      const res = { redirect: jest.fn() }
      const next = jest.fn()
      mockRequestGravity.mockResolvedValue({
        body: { access_token: "yyy" },
        ok: true,
      })
      await trustTokenLogin(req as any, res as any, next)
      expect(res.redirect.mock.calls[0][0]).toEqual(
        "/target-path?foo=bar&bar=baz",
      )
    })

    it("nexts on failed code response", async () => {
      const req = {
        connection: { remoteAddress: "99.99.99.99" },
        headers: {},
        query: { trust_token: "xxxx" },
        url: "/target-path?trust_token=xxxx",
      }
      const res = { redirect: jest.fn() }
      const next = jest.fn()
      mockRequestGravity.mockRejectedValue(new Error("err"))
      await trustTokenLogin(req as any, res as any, next)
      expect(next).toHaveBeenCalled()
      expect(res.redirect).not.toHaveBeenCalled()
    })
  })
})
