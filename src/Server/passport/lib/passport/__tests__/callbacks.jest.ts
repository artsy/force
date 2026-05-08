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

  afterEach(() => {
    jest.restoreAllMocks()
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

  it("links a facebook account to the current user", async () => {
    req.get.mockReturnValue("chrome-foo")
    req.user = { accessToken: "current-user-token", id: "user-id" }
    const done = jest.fn()
    mockRequestGravity.mockResolvedValue({})

    await cbs.facebook(req, "facebook-token", "refresh-token", {}, done)

    expect(mockRequestGravity).toHaveBeenCalledWith(
      expect.objectContaining({
        body: {
          access_token: "current-user-token",
          oauth_token: "facebook-token",
        },
        headers: { "User-Agent": "chrome-foo" },
        method: "POST",
        url: "http://apiz.artsy.net/api/v1/me/authentications/facebook",
      }),
    )
    expect(done).toHaveBeenCalledWith(null, req.user)
  })

  it("links a google account to the current user", async () => {
    req.get.mockReturnValue("chrome-foo")
    req.user = { accessToken: "current-user-token", id: "user-id" }
    const done = jest.fn()
    mockRequestGravity.mockResolvedValue({})

    await cbs.google(req, "google-token", "refresh-token", {}, done)

    expect(mockRequestGravity).toHaveBeenCalledWith(
      expect.objectContaining({
        body: {
          access_token: "current-user-token",
          oauth_token: "google-token",
        },
        headers: { "User-Agent": "chrome-foo" },
        method: "POST",
        url: "http://apiz.artsy.net/api/v1/me/authentications/google",
      }),
    )
    expect(done).toHaveBeenCalledWith(null, req.user)
  })

  it("links an apple account to the current user", async () => {
    req.appleProfile = {
      name: { firstName: "Some", lastName: "User" },
    }
    req.get.mockReturnValue("chrome-foo")
    req.user = { accessToken: "current-user-token", id: "user-id" }
    const done = jest.fn()
    const decodedIdToken = {
      email: "some-email@some.com",
      sub: "some-apple-uid",
    }
    mockRequestGravity.mockResolvedValue({})

    await cbs.apple(
      req,
      "id-token",
      decodedIdToken,
      "apple-token",
      "refresh-token",
      done,
    )

    expect(mockRequestGravity).toHaveBeenCalledWith(
      expect.objectContaining({
        body: {
          access_token: "current-user-token",
          apple_uid: "some-apple-uid",
          email: "some-email@some.com",
          id_token: "id-token",
          name: "Some User",
          oauth_token: "apple-token",
        },
        headers: { "User-Agent": "chrome-foo" },
        method: "POST",
        url: "http://apiz.artsy.net/api/v1/me/authentications/apple",
      }),
    )
    expect(done).toHaveBeenCalledWith(null, req.user)
  })

  it("passes linking errors through with the current user", async () => {
    const err = new Error("link failed")
    req.user = { accessToken: "current-user-token", id: "user-id" }
    const done = jest.fn()
    mockRequestGravity.mockRejectedValue(err)

    await cbs.google(req, "google-token", "refresh-token", {}, done)

    expect(done).toHaveBeenCalledWith(err, req.user)
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

  it("creates a user and retries facebook login when no account is linked", done => {
    req.connection = { remoteAddress: "99.99.99.99" }
    req.headers = {}
    req.session = {
      accepted_terms_of_service: true,
      agreed_to_receive_emails: false,
      sign_up_intent: "buy art",
      sign_up_referer: "auction",
    }
    req.get.mockImplementation(header => {
      if (header === "referer") {
        return "https://www.artsy.net/sign_up"
      }

      return "chrome-foo"
    })
    mockRequestGravity
      .mockRejectedValueOnce(
        gravityError({
          body: { error_description: "no account linked" },
          status: 403,
        }),
      )
      .mockResolvedValueOnce({})
      .mockResolvedValueOnce(gravityResponse({ access_token: "access-token" }))

    cbs.facebook(
      req,
      "facebook-token",
      "refresh-token",
      { displayName: "Some User" },
      (err, user) => {
        expect(err).toBeNull()
        expect(user.accessToken).toEqual("access-token")
        expect(req.artsyPassportSignedUp).toBe(true)
        expect(mockRequestGravity.mock.calls[1][0]).toEqual(
          expect.objectContaining({
            body: expect.objectContaining({
              accepted_terms_of_service: true,
              agreed_to_receive_emails: false,
              name: "Some User",
              oauth_token: "facebook-token",
              provider: "facebook",
              sign_up_intent: "buy art",
              sign_up_referer: "auction",
            }),
            headers: expect.objectContaining({
              Referer: "https://www.artsy.net/sign_up",
              "User-Agent": "chrome-foo",
            }),
            method: "POST",
            url: "http://apiz.artsy.net/api/v1/user",
          }),
        )
        expect(mockRequestGravity.mock.calls[2][0]).toEqual(
          expect.objectContaining({
            body: expect.objectContaining({
              client_id: "artsy-id",
              client_secret: "artsy-secret",
              grant_type: "oauth_token",
              oauth_provider: "facebook",
              oauth_token: "facebook-token",
            }),
            url: "http://apiz.artsy.net/oauth2/access_token",
          }),
        )
        done()
      },
    )
  })

  it("returns a generic error instead of surfacing Gravity HTML response text", done => {
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {})
    req.body = { otpRequired: false }
    mockRequestGravity.mockRejectedValue(
      gravityError(
        gravityResponse({}, 403, "<!DOCTYPE html><html>Error</html>"),
      ),
    )

    cbs.local(req, "craig", "foo", null, err => {
      expect(err.message).toEqual(
        "We couldn’t log you in. Please try again. (Error 403)",
      )
      expect(err.message).not.toContain("Gravity")
      expect(err.message).not.toContain("<!DOCTYPE html>")
      warn.mockRestore()
      done()
    })
  })

  it("returns a generic error instead of surfacing Gravity HTML response text during social login", done => {
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {})
    mockRequestGravity.mockRejectedValue(
      gravityError(
        gravityResponse({}, 500, "<html><body>Server Error</body></html>"),
      ),
    )

    cbs.google(req, "google-token", "refresh-token", {}, err => {
      expect(err.message).toEqual(
        "We couldn’t log you in. Please try again. (Error 500)",
      )
      expect(err.message).not.toContain("Gravity")
      expect(err.message).not.toContain("<html>")
      warn.mockRestore()
      done()
    })
  })
})

/* eslint-enable jest/expect-expect, jest/no-done-callback */
