import { isStaticAuthRoute } from "../isStaticAuthRoute"

describe("isStaticAuthRoute", () => {
  it("returns true if conditions met", () => {
    const staticRoutes = ["/log_in", "/login", "/sign_up", "/signup"]

    staticRoutes.forEach(path => {
      const req = { path }
      expect(isStaticAuthRoute({ req })).toBe(true)
    })
    staticRoutes.forEach(path => {
      const req = { url: path }
      expect(isStaticAuthRoute({ req })).toBe(true)
    })
  })

  it("returns false if conditions not met", () => {
    const staticRoutes = ["/foo", "/bar", "/baz"]

    staticRoutes.forEach(path => {
      const req = { path }
      expect(isStaticAuthRoute({ req })).toBe(false)
    })
    staticRoutes.forEach(path => {
      const req = { url: path }
      expect(isStaticAuthRoute({ req })).toBe(false)
    })
  })
})
