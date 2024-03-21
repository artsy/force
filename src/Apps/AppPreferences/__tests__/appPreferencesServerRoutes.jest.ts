import {
  appPreferencesPost,
  getAppPreferences,
} from "Apps/AppPreferences/appPreferencesServerRoutes"
import { ArtsyRequest } from "Server/middleware/artsyExpress"

describe("getAppPreferences", () => {
  it("returns the default app preferences if there are none", () => {
    const preferences = getAppPreferences({
      cookies: {},
    } as ArtsyRequest)

    expect(preferences).toEqual({ theme: "light" })
  })

  it("returns the app preferences from the cookies", () => {
    const preferences = getAppPreferences({
      cookies: {
        APP_PREFERENCES: JSON.stringify({ theme: "dark" }),
      },
    } as ArtsyRequest)

    expect(preferences).toEqual({ theme: "dark" })
  })

  it("returns the default app preferences if the cookies are invalid", () => {
    const preferences = getAppPreferences({
      cookies: {
        APP_PREFERENCES: "invalid",
      },
    } as ArtsyRequest)

    expect(preferences).toEqual({ theme: "light" })
  })
})

describe("appPreferencesPost", () => {
  it("returns an error if no preferences are provided", () => {
    const req = {
      body: {},
      cookies: {},
    } as ArtsyRequest

    const send = jest.fn()

    const res = {
      status: jest.fn().mockReturnValue({ send }),
      cookie: jest.fn(),
    } as any

    appPreferencesPost(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(send).toHaveBeenCalledWith({
      error: "No preferences provided",
    })
  })

  it("returns an error if the preferences are invalid", () => {
    const req = {
      body: {
        theme: "invalid",
      },
      cookies: {},
    } as ArtsyRequest

    const send = jest.fn()

    const res = {
      status: jest.fn().mockReturnValue({ send }),
      cookie: jest.fn(),
    } as any

    appPreferencesPost(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(send).toHaveBeenCalledWith({
      error: "Invalid preferences provided",
    })
  })

  it("updates the app preferences in the cookies", () => {
    const req = {
      body: {
        theme: "dark",
      },
      cookies: {},
    } as ArtsyRequest

    const send = jest.fn()

    const res = {
      status: jest.fn(),
      send,
      cookie: jest.fn(),
    } as any

    appPreferencesPost(req, res)

    expect(res.cookie).toHaveBeenCalledWith(
      "APP_PREFERENCES",
      JSON.stringify({ theme: "dark" }),
      {
        maxAge: 31536000000,
        httpOnly: false,
        secure: true,
      }
    )
    expect(send).toHaveBeenCalledWith({ theme: "dark" })
  })
})
