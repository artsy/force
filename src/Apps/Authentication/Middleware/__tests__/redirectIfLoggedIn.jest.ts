import { redirectIfLoggedIn } from "Apps/Authentication/Middleware/redirectIfLoggedIn"

describe("redirectIfLoggedIn", () => {
  const redirectSpy = jest.fn()

  const setup = ({ req = {}, res = {} }) => {
    redirectIfLoggedIn({
      req: {
        get: (() => "") as any,
        header: (() => "") as any,
        body: {},
        ...req,
      } as any,
      res: {
        locals: { sd: {} },
        redirect: redirectSpy,
        ...res,
      } as any,
    })
  }

  it("returns if no user", () => {
    setup({ req: { user: null } })
    expect(redirectSpy).not.toHaveBeenCalled()
  })

  it("updates redirect-query to / if not present", () => {
    const query = {}
    setup({ req: { user: true, query, path: "/log_in" } })
    expect(redirectSpy).toHaveBeenCalled()
    expect(query["redirect-to"]).toBe("/")
  })

  it("calls res.redirect with redirect url", () => {
    setup({ req: { user: true, query: { redirectTo: "/foo" } } })
    expect(redirectSpy).toHaveBeenCalledWith("/foo")
  })
})
