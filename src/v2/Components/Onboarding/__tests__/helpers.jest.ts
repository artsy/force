import { computeRedirectTo, fallbackRedirectTo } from "../helpers"

describe("computeRedirectTo", () => {
  it("returns the destination and expires the cookie if found", () => {
    const cookieRedirectTo = "/path/from/cookie"
    const cookies = {
      get: jest.fn(() => cookieRedirectTo),
      expire: jest.fn(),
    }
    const bootstrapData = {}

    const redirectTo = computeRedirectTo(cookies, bootstrapData)

    expect(redirectTo).toEqual(cookieRedirectTo)
    expect(cookies.expire).toHaveBeenCalled()
  })

  it("returns the bootstrap redirect if found", () => {
    const cookies = { get: jest.fn() }
    const bootstrapRedirectTo = "/path/from/bootstrap"
    const bootstrapData = { redirectTo: bootstrapRedirectTo }

    const redirectTo = computeRedirectTo(cookies, bootstrapData)

    expect(redirectTo).toEqual(bootstrapRedirectTo)
  })

  it("returns the fallback redirect by default", () => {
    const cookies = { get: jest.fn() }
    const bootstrapData = {}

    const redirectTo = computeRedirectTo(cookies, bootstrapData)

    expect(redirectTo).toEqual(fallbackRedirectTo)
  })
})
