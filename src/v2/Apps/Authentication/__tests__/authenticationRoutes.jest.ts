import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"
import { authenticationRoutes } from "../authenticationRoutes"
import { checkForRedirect } from "../Server/checkForRedirect"
import { setReferer } from "../Server/setReferer"

jest.mock("../Server/checkForRedirect", () => ({
  checkForRedirect: jest.fn(),
}))
jest.mock("../Server/setReferer", () => ({
  setReferer: jest.fn(),
}))

describe("authenticationRoutes", () => {
  const mockCheckForRedirect = checkForRedirect as jest.Mock
  const mockSetReferer = setReferer as jest.Mock

  const setup = path => {
    const req = {
      query: {},
      get: (() => "") as any,
      header: (() => "") as any,
      body: {},
    } as ArtsyRequest
    const res = { locals: { sd: {} } } as ArtsyResponse
    const next = jest.fn() as NextFunction

    const route = authenticationRoutes.find(route => route.path === path)!
    const onServerSideRender = () =>
      route.onServerSideRender?.({ req, res, next, route })

    return { route, req, res, next, onServerSideRender }
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe("#forgot", () => {
    describe("onServerSideRender", () => {
      it("sets RESET_PASSWORD_REDIRECT_TO and SET_PASSWORD", () => {
        const { onServerSideRender, req, res } = setup("/forgot2")
        req.query = {
          reset_password_redirect_to: "foo", // pragma: allowlist secret
          set_password: "bar", // pragma: allowlist secret
        }
        onServerSideRender()

        expect(res.locals.sd.RESET_PASSWORD_REDIRECT_TO).toEqual(
          req.query.reset_password_redirect_to
        )
        expect(res.locals.sd.SET_PASSWORD).toEqual(req.query.set_password)
      })

      it("runs middleware", () => {
        setup("/forgot2").onServerSideRender()
        expect(mockCheckForRedirect).toHaveBeenCalled()
        expect(mockSetReferer).toHaveBeenCalled()
      })
    })
  })

  describe("#login", () => {
    describe("onServerSideRender", () => {
      it("runs middleware", () => {
        setup("/login2").onServerSideRender()
        expect(mockCheckForRedirect).toHaveBeenCalled()
        expect(mockSetReferer).toHaveBeenCalled()
      })
    })
  })

  describe("#log_in", () => {
    it("redirects to /login", () => {
      expect(() =>
        setup("/log_in2").route.render?.({
          match: { location: { search: "?foo=bar" } },
        } as any)
      ).toThrow(
        expect.objectContaining({
          isFoundRedirectException: true,
          location: "/login2?foo=bar",
          status: 301,
        })
      )
    })
  })

  describe("#reset_password", () => {
    describe("onServerSideRender", () => {
      it("runs middleware", () => {
        setup("/reset_password2").onServerSideRender()
        expect(mockCheckForRedirect).toHaveBeenCalled()
        expect(mockSetReferer).toHaveBeenCalled()
      })
    })
  })

  describe("#signup", () => {
    describe("onServerSideRender", () => {
      it("runs middleware", () => {
        setup("/signup2").onServerSideRender()
        expect(mockCheckForRedirect).toHaveBeenCalled()
        expect(mockSetReferer).toHaveBeenCalled()
      })
    })
  })

  describe("#sign_up", () => {
    it("redirects to /signup", () => {
      expect(() =>
        setup("/sign_up2").route.render?.({
          match: { location: { search: "?foo=bar" } },
        } as any)
      ).toThrow(
        expect.objectContaining({
          isFoundRedirectException: true,
          location: "/signup2?foo=bar",
          status: 301,
        })
      )
    })
  })
})
