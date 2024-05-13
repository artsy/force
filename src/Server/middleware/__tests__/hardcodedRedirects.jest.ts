import { ArtsyRequest } from "Server/middleware/artsyExpress"
import { getRedirectUrl } from "Server/middleware/hardcodedRedirects"

describe("getRedirectUrl", () => {
  const redirects = {
    "/foo/:id/bar": "/bar/:id/foo",
    "/user/:userId/profile": "/profile/:userId",
    "/editorial": "/articles",
    "/user/:userId/profile/:profileId": "/new-profile/:profileId/:userId",
  }

  it("should redirect to the correct URL with a static path", () => {
    const req = {
      route: { path: "/editorial" },
      url: "/editorial",
    } as ArtsyRequest

    const result = getRedirectUrl(req, redirects)
    expect(result).toEqual("/articles")
  })

  it("should redirect to the correct URL with dynamic segments", () => {
    const req = {
      route: { path: "/foo/:id/bar" },
      params: { id: "123" },
      url: "/foo/123/bar",
    } as ArtsyRequest

    const result = getRedirectUrl(req, redirects)
    expect(result).toEqual("/bar/123/foo")
  })

  it("should handle multiple dynamic segments", () => {
    const req = {
      route: { path: "/user/:userId/profile/:profileId" },
      params: { userId: "456", profileId: "789" },
      url: "/user/456/profile/789",
    } as ArtsyRequest

    const result = getRedirectUrl(req, redirects)
    expect(result).toEqual("/new-profile/789/456")
  })

  it("should include query strings in the redirected URL", () => {
    const req = {
      route: { path: "/user/:userId/profile" },
      params: { userId: "456" },
      url: "/user/456/profile?view=full",
    } as ArtsyRequest

    const result = getRedirectUrl(req, redirects)
    expect(result).toEqual("/profile/456?view=full")
  })

  it("should handle missing parameters gracefully", () => {
    const req = {
      route: { path: "/foo/:id/bar" },
      params: {},
      url: "/foo/bar",
    } as ArtsyRequest

    const result = getRedirectUrl(req, redirects)
    expect(result).toEqual("/bar/:unknown/foo")
  })
})
