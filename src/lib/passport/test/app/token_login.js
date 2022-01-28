const Backbone = require("backbone")
const sinon = require("sinon")
const rewire = require("rewire")
const tokenLogin = rewire("../../lib/app/token_login")
const { headerLogin, trustTokenLogin } = tokenLogin

describe("token login middleware", function () {
  let req
  let res
  let next
  let request

  beforeEach(function () {
    tokenLogin.__set__("opts", {
      CurrentUser: Backbone.Model,
      logoutPath: "/users/sign_out",
    })
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
      req.login.args[0][0].get("accessToken").should.equal("access-foo-token")
    })

    it("does not log in a user on sign out", function () {
      req.path = "/users/sign_out"
      headerLogin(req, res, next)
      next.called.should.equal(true)
    })
  })

  describe("trustTokenLogin", function () {
    beforeEach(function () {
      this.__request__ = tokenLogin.__get__("request")
      request = {}
      request.post = sinon.stub().returns(request)
      request.send = sinon.stub().returns(request)
      request.set = sinon.stub().returns(request)
      request.end = sinon.stub().returns(request)
      tokenLogin.__set__("request", request)
    })

    afterEach(function () {
      tokenLogin.__set__("request", this.__request__)
    })

    it("immediately nexts if there is no trust_token query param", function () {
      const req = { query: {}, url: "/target-path" }
      const res = { redirect: sinon.stub() }
      const next = sinon.stub()
      trustTokenLogin(req, res, next)
      request.post.called.should.be.false()
      next.called.should.be.true()
      res.redirect.called.should.be.false()
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
      request.post.called.should.be.true()
      request.send.args[0][0].code.should.equal("xxxx")
      res.redirect.called.should.be.true()
      res.redirect.args[0][0].should.equal("/target-path")
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
      res.redirect.args[0][0].should.equal("/target-path?foo=bar&bar=baz")
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
      next.called.should.be.true()
      res.redirect.called.should.be.false()
    })
  })
})
