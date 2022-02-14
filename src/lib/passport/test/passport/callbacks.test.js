const Backbone = require("backbone")
const rewire = require("rewire")
const sinon = require("sinon")
const cbs = rewire("../../lib/passport/callbacks")

// TODO: Take care of this warning!
/* eslint-disable jest/no-done-callback */

describe("passport callbacks", function () {
  let req
  let request

  beforeEach(function () {
    req = { get: sinon.stub() }
    request = {}
    request.get = sinon.stub().returns(request)
    request.query = sinon.stub().returns(request)
    request.set = sinon.stub().returns(request)
    request.end = sinon.stub().returns(request)
    request.post = sinon.stub().returns(request)
    request.send = sinon.stub().returns(request)
    cbs.__set__("request", request)
    cbs.__set__("opts", {
      ARTSY_ID: "artsy-id",
      ARTSY_SECRET: "artsy-secret",
      ARTSY_URL: "http://apiz.artsy.net",
      CurrentUser: Backbone.Model,
    })
  })

  it("gets a user with an access token email/password/otp", function (done) {
    req.body = { otpRequired: true }
    cbs.local(req, "craig", "foo", "123456", function (err, user) {
      user.get("accessToken").should.equal("access-token")
      done()
    })
    request.post.args[0][0].should.equal(
      "http://apiz.artsy.net/oauth2/access_token"
    )
    request.send.args[0][0].should.have.property("otp_attempt")
    const res = { body: { access_token: "access-token" }, status: 200 }
    request.end.args[0][0](null, res)
  })

  it("gets a user with an access token email/password without otp", function (done) {
    req.body = { otpRequired: false }
    cbs.local(req, "craig", "foo", null, function (err, user) {
      user.get("accessToken").should.equal("access-token")
      done()
    })
    request.post.args[0][0].should.equal(
      "http://apiz.artsy.net/oauth2/access_token"
    )
    request.send.args[0][0].should.not.have.property("otp_attempt")
    const res = { body: { access_token: "access-token" }, status: 200 }
    request.end.args[0][0](null, res)
  })

  it("gets a user with an access token facebook", function (done) {
    cbs.facebook(req, "foo-token", "refresh-token", {}, function (err, user) {
      user.get("accessToken").should.equal("access-token")
      done()
    })
    request.post.args[0][0].should.equal(
      "http://apiz.artsy.net/oauth2/access_token"
    )
    const queryParams = request.query.args[0][0]
    queryParams.oauth_provider.should.equal("facebook")
    queryParams.oauth_token.should.equal("foo-token")
    const res = { body: { access_token: "access-token" }, status: 200 }
    request.end.args[0][0](null, res)
  })

  it("gets a user with an access token google", function (done) {
    cbs.google(req, "foo-token", "refresh-token", {}, function (err, user) {
      user.get("accessToken").should.equal("access-token")
      done()
    })
    request.post.args[0][0].should.equal(
      "http://apiz.artsy.net/oauth2/access_token"
    )
    const queryParams = request.query.args[0][0]
    queryParams.oauth_provider.should.equal("google")
    queryParams.oauth_token.should.equal("foo-token")
    const res = { body: { access_token: "access-token" }, status: 200 }
    request.end.args[0][0](null, res)
  })

  it("gets a user with an access token apple", function (done) {
    const decodedIdToken = {
      email: "some-email@some.com",
      sub: "some-apple-uid",
    }
    cbs.apple(
      req,
      "id-token",
      decodedIdToken,
      "access_token",
      "refresh-token",
      function (err, user) {
        user.get("accessToken").should.equal("access-token")
        done()
      }
    )
    request.post.args[0][0].should.equal(
      "http://apiz.artsy.net/oauth2/access_token"
    )
    const queryParams = request.query.args[0][0]
    queryParams.grant_type.should.equal("apple_uid")
    queryParams.apple_uid.should.equal("some-apple-uid")
    queryParams.id_token.should.equal("id-token")
    const res = { body: { access_token: "access-token" }, status: 200 }
    request.end.args[0][0](null, res)
  })

  it("passes the user agent through login", function () {
    req.body = { otpRequired: false }
    req.get.returns("chrome-foo")
    cbs.local(req, "craig", "foo")
    request.set.args[0][0].should.containEql({ "User-Agent": "chrome-foo" })
  })

  it("passes the user agent through facebook signup", function () {
    req.get.returns("foo-bar-baz-ua")
    cbs.facebook(req, "foo-token", "token-secret", { displayName: "Craig" })
    const res = {
      body: { error_description: "no account linked" },
      status: 403,
    }
    request.end.args[0][0](null, res)
    request.set.args[1][0]["User-Agent"].should.equal("foo-bar-baz-ua")
  })

  it("passes the user agent through apple signup", function () {
    req.get.returns("foo-bar-baz-ua")
    cbs.apple(req, "foo-token", "refresh-token", "id-token", {})
    const res = {
      body: { error_description: "no account linked" },
      status: 403,
    }
    request.end.args[0][0](null, res)
    request.set.args[1][0]["User-Agent"].should.equal("foo-bar-baz-ua")
  })
})

/* eslint-enable jest/expect-expect, jest/no-done-callback */
