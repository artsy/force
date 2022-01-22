import { render, waitFor, screen } from "@testing-library/react"
import { setCookies } from "v2/Apps/Authentication/Utils/helpers"
import { MockBoot, MockRouter } from "v2/DevTools"
import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"
import qs from "qs"
import { authenticationRoutes } from "../authenticationRoutes"
import { checkForRedirect } from "../Server/checkForRedirect"
import { setReferer } from "../Server/setReferer"
import { redirectIfLoggedIn } from "../Server/redirectIfLoggedIn"
import { getENV } from "v2/Utils/getENV"

jest.mock("../Server/checkForRedirect", () => ({
  checkForRedirect: jest.fn(),
}))
jest.mock("../Server/setReferer", () => ({
  setReferer: jest.fn(),
}))
jest.mock("../Server/redirectIfLoggedIn", () => ({
  redirectIfLoggedIn: jest.fn(),
}))
jest.mock("v2/Utils/EnableRecaptcha", () => ({
  EnableRecaptcha: () => "EnableRecaptcha",
}))
jest.mock("../Utils/helpers", () => ({
  ...jest.requireActual("../Utils/helpers"),
  setCookies: jest.fn(),
}))
jest.mock("v2/Utils/Hooks/useAuthValidation")
jest.mock("v2/Utils/getENV", () => ({
  getENV: jest.fn(),
}))

describe("authenticationRoutes", () => {
  const mockCheckForRedirect = checkForRedirect as jest.Mock
  const mockSetReferer = setReferer as jest.Mock
  const mockGetENV = getENV as jest.Mock
  const mockRedirectIfLoggedIn = redirectIfLoggedIn as jest.Mock

  const renderClientRoute = route => {
    render(
      <MockBoot>
        <MockRouter initialRoute={route} routes={authenticationRoutes} />
      </MockBoot>
    )
  }

  const renderServerRoute = route => {
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

    const foundRoute = authenticationRoutes.find(authRoute => {
      const [routePath, query] = route.split("?")
      if (query) {
        req.query = qs.parse(query)
      }
      return routePath === authRoute.path
    })!

    const onServerSideRender = () =>
      foundRoute.onServerSideRender?.({ req, res, next, route: foundRoute })

    return { route: foundRoute, req, res, next, onServerSideRender }
  }

  afterEach(() => {
    jest.restoreAllMocks()
    mockRedirectIfLoggedIn.mockReset()
  })

  describe("/forgot", () => {
    describe("client", () => {
      it("shows reset password title by default", async () => {
        renderClientRoute("/forgot")
        expect((await screen.findAllByText("Reset your password")).length).toBe(
          2
        )
      })

      it("shows set password title if `set_password` param passed", async () => {
        renderClientRoute("/forgot?set_password=true")
        expect((await screen.findAllByText("Set your password")).length).toBe(2)
      })
    })

    describe("server", () => {
      describe("onServerSideRender", () => {
        it("sets RESET_PASSWORD_REDIRECT_TO and SET_PASSWORD", () => {
          const { onServerSideRender, req, res } = renderServerRoute("/forgot")
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
          renderServerRoute("/forgot").onServerSideRender()
          expect(mockCheckForRedirect).toHaveBeenCalled()
          expect(mockSetReferer).toHaveBeenCalled()
        })
      })
    })
  })

  describe("/login", () => {
    describe("client", () => {
      it("renders login by default", async () => {
        renderClientRoute("/login")
        expect((await screen.findAllByText("EnableRecaptcha")).length).toBe(1)
        expect((await screen.findAllByText("Log in to Artsy")).length).toBe(2)
      })

      it("sets cookie with passed login params on mount", async () => {
        const queryParams = {
          action: "follow",
          destination: "/foo",
          kind: "artist",
          objectId: 123,
          redirectTo: "/bar",
          signupReferer: "referrer",
        }

        renderClientRoute(`/login?${qs.stringify(queryParams)}`)

        await waitFor(() => {
          expect(setCookies).toHaveBeenCalledWith(queryParams)
        })
      })
    })

    describe("/server", () => {
      describe("onServerSideRender", () => {
        it("runs middleware", () => {
          renderServerRoute("/login").onServerSideRender()
          expect(mockRedirectIfLoggedIn).toHaveBeenCalled()
          expect(mockCheckForRedirect).toHaveBeenCalled()
          expect(mockSetReferer).toHaveBeenCalled()
        })

        it("skips the check for login if you are auth-ing with the API", () => {
          renderServerRoute("/login?api_login=true").onServerSideRender()
          expect(mockRedirectIfLoggedIn).not.toHaveBeenCalled()
          expect(mockCheckForRedirect).toHaveBeenCalled()
          expect(mockSetReferer).toHaveBeenCalled()
        })
      })
    })
  })

  describe("/log_in", () => {
    describe("server", () => {
      it("redirects to /login", () => {
        expect(() =>
          renderServerRoute("/log_in").route.render?.({
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
  })

  describe("/reset_password", () => {
    describe("server", () => {
      describe("onServerSideRender", () => {
        it("runs middleware if query param found", () => {
          renderServerRoute(
            "/reset_password?reset_password_token=foo&set_password=bar&reset_password_redirect_to=/home"
          )
          expect(mockCheckForRedirect).toHaveBeenCalled()
          expect(mockSetReferer).toHaveBeenCalled()
        })

        it("redirects if no reset_password_token is found", () => {
          const { res, onServerSideRender } = renderServerRoute(
            "/reset_password"
          )
          onServerSideRender()
          expect(res.redirect).toHaveBeenCalledWith("/")
          expect(mockSetReferer).toHaveBeenCalled()
        })
      })
    })
  })

  describe("/signup", () => {
    describe("client", () => {
      it("renders signup", async () => {
        renderClientRoute(`/signup`)
        expect((await screen.findAllByText("EnableRecaptcha")).length).toBe(1)
        expect((await screen.findAllByText("Sign up for Artsy")).length).toBe(2)
      })

      it("sets cookie with passed login params on mount", async () => {
        const queryParams = {
          action: "follow",
          destination: "/foo",
          kind: "artist",
          objectId: 123,
          redirectTo: "/bar",
          signupReferer: "referrer",
        }

        renderClientRoute(`/signup?${qs.stringify(queryParams)}`)

        await waitFor(() => {
          expect(setCookies).toHaveBeenCalledWith(queryParams)
        })
      })
    })

    describe("server", () => {
      describe("onServerSideRender", () => {
        it("runs middleware", () => {
          renderServerRoute("/signup").onServerSideRender()
          expect(mockRedirectIfLoggedIn).toHaveBeenCalled()
          expect(mockCheckForRedirect).toHaveBeenCalled()
          expect(mockSetReferer).toHaveBeenCalled()
        })

        it("skips the check for login if you are auth-ing with the API", () => {
          renderServerRoute("/signup?api_login=true").onServerSideRender()
          expect(mockRedirectIfLoggedIn).not.toHaveBeenCalled()
          expect(mockCheckForRedirect).toHaveBeenCalled()
          expect(mockSetReferer).toHaveBeenCalled()
        })
      })
    })
  })

  describe("/sign_up", () => {
    describe("server", () => {
      it("redirects to /signup", () => {
        expect(() =>
          renderServerRoute("/sign_up").route.render?.({
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

  describe("/auth-redirect", () => {
    mockGetENV.mockImplementation(key => {
      switch (key) {
        case "APP_URL":
          return "https://artsy.net"
        case "ALLOWED_REDIRECT_HOSTS":
          return "off.artsy.net"
      }
    })

    describe("server", () => {
      it("redirects to redirectTo", () => {
        const { res, onServerSideRender } = renderServerRoute(
          "/auth-redirect?redirectTo=https://off.artsy.net/blah"
        )
        onServerSideRender()
        expect(res.redirect).toHaveBeenCalledWith("https://off.artsy.net/blah")
      })
    })
  })
})
