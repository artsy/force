const _rewire = require("rewire")
const cbs = require("../callbacks")

// biome-ignore lint/style/noRestrictedImports: ignore
import request from "superagent"

jest.mock("superagent")
jest.mock("Server/passport/lib/options", () => ({
  ARTSY_ID: "artsy-id",
  ARTSY_SECRET: "artsy-secret",
  ARTSY_URL: "http://apiz.artsy.net",
}))

/* eslint-disable jest/no-done-callback */

describe("passport callbacks", () => {
  let req

  beforeEach(() => {
    req = { get: jest.fn() }
    for (const method of [
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

  it("gets a user with an access token email/password/otp", done => {
    req.body = { otpRequired: true }
    cbs.local(req, "craig", "foo", "123456", (_err, user) => {
      expect(user.accessToken).toEqual("access-token")
      done()
    })
    expect(request.post.mock.calls[0][0]).toEqual(
      "http://apiz.artsy.net/oauth2/access_token",
    )
    expect(request.send.mock.calls[0][0]).toHaveProperty("otp_attempt")
    const res = { body: { access_token: "access-token" }, status: 200 }
    request.end.mock.calls[0][0](null, res)
  })

  it("gets a user with an access token email/password without otp", done => {
    req.body = { otpRequired: false }
    cbs.local(req, "craig", "foo", null, (_err, user) => {
      expect(user.accessToken).toEqual("access-token")
      done()
    })
    expect(request.post.mock.calls[0][0]).toEqual(
      "http://apiz.artsy.net/oauth2/access_token",
    )
    expect(request.send.mock.calls[0][0]).not.toHaveProperty("otp_attempt")
    const res = { body: { access_token: "access-token" }, status: 200 }
    request.end.mock.calls[0][0](null, res)
  })

  it("gets a user with an access token facebook", done => {
    cbs.facebook(req, "foo-token", "refresh-token", {}, (_err, user) => {
      expect(user.accessToken).toEqual("access-token")
      done()
    })
    expect(request.post.mock.calls[0][0]).toEqual(
      "http://apiz.artsy.net/oauth2/access_token",
    )
    const sendArgs = request.send.mock.calls[0][0]
    expect(sendArgs.oauth_provider).toEqual("facebook")
    expect(sendArgs.oauth_token).toEqual("foo-token")
    const res = { body: { access_token: "access-token" }, status: 200 }
    request.end.mock.calls[0][0](null, res)
  })

  it("gets a user with an access token google", done => {
    cbs.google(req, "foo-token", "refresh-token", {}, (_err, user) => {
      expect(user.accessToken).toEqual("access-token")
      done()
    })
    expect(request.post.mock.calls[0][0]).toEqual(
      "http://apiz.artsy.net/oauth2/access_token",
    )
    const sendArgs = request.send.mock.calls[0][0]
    expect(sendArgs.oauth_provider).toEqual("google")
    expect(sendArgs.oauth_token).toEqual("foo-token")
    const res = { body: { access_token: "access-token" }, status: 200 }
    request.end.mock.calls[0][0](null, res)
  })

  it("gets a user with an access token apple", done => {
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
      (_err, user) => {
        expect(user.accessToken).toEqual("access-token")
        done()
      },
    )
    expect(request.post.mock.calls[0][0]).toEqual(
      "http://apiz.artsy.net/oauth2/access_token",
    )
    const sendArgs = request.send.mock.calls[0][0]
    expect(sendArgs.grant_type).toEqual("apple_uid")
    expect(sendArgs.apple_uid).toEqual("some-apple-uid")
    expect(sendArgs.id_token).toEqual("id-token")
    const res = { body: { access_token: "access-token" }, status: 200 }
    request.end.mock.calls[0][0](null, res)
  })

  it("passes the user agent through login", () => {
    req.body = { otpRequired: false }
    req.get.mockReturnValue("chrome-foo")
    cbs.local(req, "craig", "foo")
    expect(request.set.mock.calls[0][0]).toEqual({
      "User-Agent": "chrome-foo",
    })
  })

  it("passes the user agent through facebook signup", () => {
    req.get.mockReturnValue("foo-bar-baz-ua")
    cbs.facebook(req, "foo-token", "token-secret", { displayName: "Craig" })
    const res = {
      body: { error_description: "no account linked" },
      status: 403,
    }
    request.end.mock.calls[0][0](null, res)
    expect(request.set.mock.calls[1][0]["User-Agent"]).toEqual("foo-bar-baz-ua")
  })

  it("passes the user agent through apple signup", () => {
    req.get.mockReturnValue("foo-bar-baz-ua")
    cbs.apple(req, "foo-token", "refresh-token", "id-token", {})
    const res = {
      body: { error_description: "no account linked" },
      status: 403,
    }
    request.end.mock.calls[0][0](null, res)
    expect(request.set.mock.calls[1][0]["User-Agent"]).toBe("foo-bar-baz-ua")
  })
})

/* eslint-enable jest/expect-expect, jest/no-done-callback */
