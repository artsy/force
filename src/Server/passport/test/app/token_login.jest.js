/* eslint-disable no-restricted-imports */
const sinon = require("sinon")
const tokenLogin = require("../../lib/app/token_login")
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
      request[method] = sinon.stub().returns(request)
    }
  })

  describe("#headerLogin", function () {
    beforeEach(function () {
      req = {
        query: {},
        get: () => {
          return "access-foo-token"
        },
        login: sinon.stub(),
      }
      res = { send: sinon.stub() }
      next = sinon.stub()
    })

    it("logs in a user if they pass their access token as a header", function () {
      headerLogin(req, res, next)
      expect(req.login.args[0][0].accessToken).toEqual("access-foo-token")
    })

    it("does not log in a user on sign out", function () {
      req.path = "/users/sign_out"
      headerLogin(req, res, next)
      expect(next.called).toEqual(true)
    })
  })

  describe("trustTokenLogin", function () {
    it("immediately nexts if there is no trust_token query param", function () {
      const req = { query: {}, url: "/target-path" }
      const res = { redirect: sinon.stub() }
      const next = sinon.stub()
      trustTokenLogin(req, res, next)
      expect(request.post.called).toBeFalsy()
      expect(next.called).toBeTruthy()
      expect(res.redirect.called).toBeFalsy()
    })

    it(`logs the user in when there is a trust_token present, redirecting to \
a url sans trust_token param`, function () {
      const req = {
        connection: { remoteAddress: "99.99.99.99" },
        login: sinon.stub().yields(null),
        query: { trust_token: "xxxx" },
        url: "/target-path?trust_token=xxxx",
      }
      const res = { redirect: sinon.stub() }
      const next = sinon.stub()
      request.end.yields(null, { ok: true, body: { access_token: "yyy" } })
      trustTokenLogin(req, res, next)
      expect(request.post.called).toBeTruthy()
      expect(request.send.args[0][0].code).toEqual("xxxx")
      expect(res.redirect.called).toBeTruthy()
      expect(res.redirect.args[0][0]).toEqual("/target-path")
    })

    it("preserves any other query string params", function () {
      const req = {
        connection: { remoteAddress: "99.99.99.99" },
        login: sinon.stub().yields(null),
        query: { trust_token: "xxxx", foo: "bar", bar: "baz" },
        url: "/target-path?foo=bar&trust_token=xxxx&bar=baz",
      }
      const res = { redirect: sinon.stub() }
      const next = sinon.stub()
      request.end.yields(null, { ok: true, body: { access_token: "yyy" } })
      trustTokenLogin(req, res, next)
      expect(res.redirect.args[0][0]).toEqual("/target-path?foo=bar&bar=baz")
    })

    it("nexts on failed code response", function () {
      const req = {
        connection: { remoteAddress: "99.99.99.99" },
        query: { trust_token: "xxxx" },
        url: "/target-path?trust_token=xxxx",
      }
      const res = { redirect: sinon.stub() }
      const next = sinon.stub()
      request.end.yields("err", null)
      trustTokenLogin(req, res, next)
      expect(next.called).toBeTruthy()
      expect(res.redirect.called).toBeFalsy()
    })
  })
})
