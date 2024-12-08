/* eslint-disable no-restricted-imports */
const tokenLogin = require("../token_login")
const { headerLogin, trustTokenLogin } = tokenLogin

import request from "superagent"
import options from "Server/passport/lib/options"

jest.mock("superagent")
jest.mock("Server/passport/lib/options", () => ({
  logoutPath: "/users/sign_out",
}))

describe("token login middleware", function () {
  let req
  let res
  let next

  beforeEach(function () {
    for (let method of [
      "get",
      "end",
      "set",
      "post",
      "send",
      "status",
      "query",
    ]) {
      request[method] = jest.fn().mockReturnValue(request)
    }
  })

  describe("#headerLogin", function () {
    beforeEach(function () {
      req = {
        query: {},
        get: jest.fn(() => "access-foo-token"),
        login: jest.fn(),
      }
      res = { send: jest.fn() }
      next = jest.fn()
    })

    it("logs in a user if they pass their access token as a header", function () {
      headerLogin(req, res, next)
      expect(req.login.mock.calls[0][0].accessToken).toEqual("access-foo-token")
    })

    it("does not log in a user on sign out", function () {
      req.path = "/users/sign_out"
      headerLogin(req, res, next)
      expect(next).toHaveBeenCalled()
    })
  })

  describe("trustTokenLogin", function () {
    it("immediately nexts if there is no trust_token query param", function () {
      const req = { query: {}, url: "/target-path" }
      const res = { redirect: jest.fn() }
      const next = jest.fn()
      trustTokenLogin(req, res, next)
      expect(request.post).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
      expect(res.redirect).not.toHaveBeenCalled()
    })

    it(`logs the user in when there is a trust_token present, redirecting to \
a url sans trust_token param`, function () {
      const req = {
        connection: { remoteAddress: "99.99.99.99" },
        login: jest.fn((user, cb) => cb(null)),
        query: { trust_token: "xxxx" },
        url: "/target-path?trust_token=xxxx",
      }
      const res = { redirect: jest.fn() }
      const next = jest.fn()
      request.end.mockImplementation(cb =>
        cb(null, { ok: true, body: { access_token: "yyy" } })
      )
      trustTokenLogin(req, res, next)
      expect(request.post).toHaveBeenCalled()
      expect(request.send.mock.calls[0][0].code).toEqual("xxxx")
      expect(res.redirect).toHaveBeenCalled()
      expect(res.redirect.mock.calls[0][0]).toEqual("/target-path")
    })

    it("preserves any other query string params", function () {
      const req = {
        connection: { remoteAddress: "99.99.99.99" },
        login: jest.fn((user, cb) => cb(null)),
        query: { trust_token: "xxxx", foo: "bar", bar: "baz" },
        url: "/target-path?foo=bar&trust_token=xxxx&bar=baz",
      }
      const res = { redirect: jest.fn() }
      const next = jest.fn()
      request.end.mockImplementation(cb =>
        cb(null, { ok: true, body: { access_token: "yyy" } })
      )
      trustTokenLogin(req, res, next)
      expect(res.redirect.mock.calls[0][0]).toEqual(
        "/target-path?foo=bar&bar=baz"
      )
    })

    it("nexts on failed code response", function () {
      const req = {
        connection: { remoteAddress: "99.99.99.99" },
        query: { trust_token: "xxxx" },
        url: "/target-path?trust_token=xxxx",
      }
      const res = { redirect: jest.fn() }
      const next = jest.fn()
      request.end.mockImplementation(cb => cb("err", null))
      trustTokenLogin(req, res, next)
      expect(next).toHaveBeenCalled()
      expect(res.redirect).not.toHaveBeenCalled()
    })
  })
})
