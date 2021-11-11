import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"
import qs from "qs"
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
      session: {},
      get: (() => "") as any,
      header: (() => "") as any,
      body: {},
    } as ArtsyRequest

    const res = {
      locals: {
        sd: {},
      },
      redirect: jest.fn() as any,
    } as ArtsyResponse

    const next = jest.fn() as NextFunction

    const route = authenticationRoutes.find(route => {
      const [routePath, query] = path.split("?")
      if (query) {
        req.query = qs.parse(query)
      }
      return routePath === route.path
    })!
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
        const { onServerSideRender, req, res } = setup("/forgot")
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
        setup("/forgot").onServerSideRender()
        expect(mockCheckForRedirect).toHaveBeenCalled()
        expect(mockSetReferer).toHaveBeenCalled()
      })
    })
  })

  describe("#login", () => {
    describe("onServerSideRender", () => {
      it("runs middleware", () => {
        setup("/login").onServerSideRender()
        expect(mockCheckForRedirect).toHaveBeenCalled()
        expect(mockSetReferer).toHaveBeenCalled()
      })
    })
  })

  describe("#log_in", () => {
    it("redirects to /login", () => {
      expect(() =>
        setup("/log_in").route.render?.({
          match: { location: { search: "?foo=bar" } },
        } as any)
      ).toThrow(
        expect.objectContaining({
          isFoundRedirectException: true,
          location: "/login?foo=bar",
          status: 301,
        })
      )
    })
  })

  describe("#reset_password", () => {
    describe("onServerSideRender", () => {
<<<<<<< HEAD
      it("sets session variables if reset_password_token is found", () => {
        const { req, onServerSideRender } = setup(
          "/reset_password?reset_password_token=foo&set_password=bar&reset_password_redirect_to=/home"
        )
        onServerSideRender()
        expect(req.session.reset_password_token).toEqual("foo")
        expect(req.session.set_password).toEqual("bar")
        expect(req.session.reset_password_redirect_to).toEqual("/home")
=======
      it("runs middleware", () => {
        setup("/reset_password").onServerSideRender()
>>>>>>> wip
        expect(mockCheckForRedirect).toHaveBeenCalled()
        expect(mockSetReferer).toHaveBeenCalled()
      })

      it("redirects if no reset_password_token is found", () => {
        const { res, onServerSideRender } = setup("/reset_password")
        onServerSideRender()
        expect(res.redirect).toHaveBeenCalledWith("/")
        expect(mockSetReferer).toHaveBeenCalled()
      })
    })
  })

  describe("#signup", () => {
    describe("onServerSideRender", () => {
      it("runs middleware", () => {
        setup("/signup").onServerSideRender()
        expect(mockCheckForRedirect).toHaveBeenCalled()
        expect(mockSetReferer).toHaveBeenCalled()
      })
    })
  })

  describe("#sign_up", () => {
    it("redirects to /signup", () => {
      expect(() =>
        setup("/sign_up").route.render?.({
          match: { location: { search: "?foo=bar" } },
        } as any)
      ).toThrow(
        expect.objectContaining({
          isFoundRedirectException: true,
          location: "/signup?foo=bar",
          status: 301,
        })
      )
    })
  })
})
