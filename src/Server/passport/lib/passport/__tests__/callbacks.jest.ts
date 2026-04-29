const cbs = require("../callbacks")

import { requestGravity } from "../../http"

jest.mock("../../http")
jest.mock("Server/passport/lib/options", () => ({
  ARTSY_ID: "artsy-id",
  ARTSY_SECRET: "artsy-secret",
  ARTSY_URL: "http://apiz.artsy.net",
}))

const mockRequestGravity = requestGravity as jest.Mock

const gravityResponse = (body: any, status = 200, text = "") => ({
  body,
  ok: status >= 200 && status < 300,
  status,
  text,
})

const gravityError = (response: any) => {
  const error = new Error("Gravity error") as Error & { response?: any }
  error.response = response
  return error
}

/* eslint-disable jest/no-done-callback */

describe("passport callbacks", () => {
  let req

  beforeEach(() => {
    req = { get: jest.fn() }
    mockRequestGravity.mockReset()
  })

  it("gets a user with an access token email/password/otp", done => {
    req.body = { otpRequired: true }
    mockRequestGravity.mockResolvedValue(
      gravityResponse({ access_token: "access-token" }),
    )
    cbs.local(req, "craig", "foo", "123456", (err, user) => {
      expect(user.accessToken).toEqual("access-token")
      done()
    })
    expect(mockRequestGravity).toHaveBeenCalledWith(
      expect.objectContaining({
        body: expect.objectContaining({ otp_attempt: "123456" }),
        url: "http://apiz.artsy.net/oauth2/access_token",
      }),
    )
  })

  it("gets a user with an access token email/password without otp", done => {
    req.body = { otpRequired: false }
    mockRequestGravity.mockResolvedValue(
      gravityResponse({ access_token: "access-token" }),
    )
    cbs.local(req, "craig", "foo", null, (err, user) => {
      expect(user.accessToken).toEqual("access-token")
      done()
    })
    expect(mockRequestGravity).toHaveBeenCalledWith(
      expect.objectContaining({
        body: expect.not.objectContaining({ otp_attempt: expect.anything() }),
        url: "http://apiz.artsy.net/oauth2/access_token",
      }),
    )
  })

  it("gets a user with an access token facebook", done => {
    mockRequestGravity.mockResolvedValue(
      gravityResponse({ access_token: "access-token" }),
    )
    cbs.facebook(req, "foo-token", "refresh-token", {}, (err, user) => {
      expect(user.accessToken).toEqual("access-token")
      done()
    })
    const sendArgs = mockRequestGravity.mock.calls[0][0].body
    expect(sendArgs.oauth_provider).toEqual("facebook")
    expect(sendArgs.oauth_token).toEqual("foo-token")
  })

  it("gets a user with an access token google", done => {
    mockRequestGravity.mockResolvedValue(
      gravityResponse({ access_token: "access-token" }),
    )
    cbs.google(req, "foo-token", "refresh-token", {}, (err, user) => {
      expect(user.accessToken).toEqual("access-token")
      done()
    })
    const sendArgs = mockRequestGravity.mock.calls[0][0].body
    expect(sendArgs.oauth_provider).toEqual("google")
    expect(sendArgs.oauth_token).toEqual("foo-token")
  })

  it("gets a user with an access token apple", done => {
    mockRequestGravity.mockResolvedValue(
      gravityResponse({ access_token: "access-token" }),
    )
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
      (err, user) => {
        expect(user.accessToken).toEqual("access-token")
        done()
      },
    )
    const sendArgs = mockRequestGravity.mock.calls[0][0].body
    expect(sendArgs.grant_type).toEqual("apple_uid")
    expect(sendArgs.apple_uid).toEqual("some-apple-uid")
    expect(sendArgs.id_token).toEqual("id-token")
  })

  it("passes the user agent through login", () => {
    req.body = { otpRequired: false }
    req.get.mockReturnValue("chrome-foo")
    mockRequestGravity.mockImplementation(() => new Promise(() => {}))
    cbs.local(req, "craig", "foo")
    expect(mockRequestGravity.mock.calls[0][0].headers).toEqual({
      "User-Agent": "chrome-foo",
    })
  })

  it("passes the user agent through facebook signup", async () => {
    req.get.mockReturnValue("foo-bar-baz-ua")
    const res = {
      body: { error_description: "no account linked" },
      status: 403,
    }
    mockRequestGravity
      .mockRejectedValueOnce(gravityError(res))
      .mockImplementationOnce(() => new Promise(() => {}))
    cbs.facebook(req, "foo-token", "token-secret", { displayName: "Craig" })
    await Promise.resolve()
    await Promise.resolve()
    expect(mockRequestGravity.mock.calls[1][0].headers["User-Agent"]).toEqual(
      "foo-bar-baz-ua",
    )
  })

  it("passes the user agent through apple signup", async () => {
    req.get.mockReturnValue("foo-bar-baz-ua")
    const res = {
      body: { error_description: "no account linked" },
      status: 403,
    }
    mockRequestGravity
      .mockRejectedValueOnce(gravityError(res))
      .mockImplementationOnce(() => new Promise(() => {}))
    cbs.apple(req, "foo-token", "refresh-token", "id-token", {})
    await Promise.resolve()
    await Promise.resolve()
    expect(mockRequestGravity.mock.calls[1][0].headers["User-Agent"]).toBe(
      "foo-bar-baz-ua",
    )
  })

  it("preserves the current behavior of surfacing Gravity HTML response text", done => {
    jest.spyOn(console, "warn").mockImplementation(() => {})
    req.body = { otpRequired: false }
    mockRequestGravity.mockRejectedValue(
      gravityError(
        gravityResponse({}, 500, "<!DOCTYPE html><html>Error</html>"),
      ),
    )

    cbs.local(req, "craig", "foo", null, err => {
      expect(err.message).toEqual("<!DOCTYPE html><html>Error</html>")
      done()
    })
  })
  ;(it as any).failing(
    "does not expose a full Gravity HTML document as the auth error message",
    async () => {
      jest.spyOn(console, "warn").mockImplementation(() => {})
      req.body = { otpRequired: false }
      mockRequestGravity.mockRejectedValue(
        gravityError(
          gravityResponse({}, 500, "<!DOCTYPE html><html>Error</html>"),
        ),
      )

      await new Promise<void>((resolve, reject) => {
        cbs.local(req, "craig", "foo", null, (err: Error) => {
          try {
            expect(err.message).not.toContain("<!DOCTYPE html>")
            resolve()
          } catch (assertionError) {
            reject(assertionError)
          }
        })
      })
    },
  )
})

/* eslint-enable jest/expect-expect, jest/no-done-callback */
