import { checkForRedirect } from "Apps/Authentication/Middleware/checkForRedirect"
import { isStaticAuthRoute } from "Apps/Authentication/Middleware/isStaticAuthRoute"

jest.mock("../isStaticAuthRoute", () => ({
  isStaticAuthRoute: jest.fn(),
}))

describe("checkForRedirect", () => {
  const mockIsStaticAuthRoute = isStaticAuthRoute as jest.Mock

  const setup = ({ query = {}, body = {}, get = () => "" }) => {
    const req = { query, body, get }
    const res = { locals: { sd: { AUTHENTICATION_REDIRECT_TO: null } } }
    checkForRedirect({ req, res } as any)
    return { req, res }
  }

  it("redirects if ?redirectTo query param is set", () => {
    const { res } = setup({ query: { redirectTo: "/foo" } })
    expect(res.locals.sd.AUTHENTICATION_REDIRECT_TO).toEqual("/foo")
  })

  it("redirects if ?redirect-to query param is set", () => {
    const { res } = setup({ query: { "redirect-to": "/foo" } })
    expect(res.locals.sd.AUTHENTICATION_REDIRECT_TO).toEqual("/foo")
  })

  it("redirects if ?redirect_uri query param is set", () => {
    const { res } = setup({ query: { redirect_uri: "/foo" } })
    expect(res.locals.sd.AUTHENTICATION_REDIRECT_TO).toEqual("/foo")
  })

  it("redirects if request body contains redirect-to", () => {
    const { res } = setup({ body: { "redirect-to": "/foo" } })
    expect(res.locals.sd.AUTHENTICATION_REDIRECT_TO).toEqual("/foo")
  })

  it("returns `referrer` as redirect if no query params found and not isStaticAuth", () => {
    mockIsStaticAuthRoute.mockImplementation(() => false)
    const { res } = setup({ get: () => "/some-referer" })
    expect(res.locals.sd.AUTHENTICATION_REDIRECT_TO).toEqual("/some-referer")
  })

  it("returns undefined `referrer` as redirect if no query params found and isStaticAuth", () => {
    mockIsStaticAuthRoute.mockImplementation(() => true)
    const { res } = setup({ get: () => "/some-referer" })
    expect(res.locals.sd.AUTHENTICATION_REDIRECT_TO).toEqual(undefined)
  })

  it("redirects to `/` if redirectTo=/reset_password", () => {
    const { res } = setup({ query: { redirectTo: "/reset_password" } })
    expect(res.locals.sd.AUTHENTICATION_REDIRECT_TO).toEqual("/")
  })

  it("redirects to `/` if redirectTo=/user/delete", () => {
    const { res } = setup({ query: { redirectTo: "/user/delete" } })
    expect(res.locals.sd.AUTHENTICATION_REDIRECT_TO).toEqual("/")
  })
})
