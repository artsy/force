import { render, screen, waitFor } from "@testing-library/react"
import { MockRouter } from "DevTools/MockRouter"
import { MockBoot } from "DevTools/MockBoot"
import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import qs from "qs"
import { authenticationRoutes } from "Apps/Authentication/authenticationRoutes"
import { checkForRedirect } from "Apps/Authentication/Middleware/checkForRedirect"
import { setReferer } from "Apps/Authentication/Middleware/setReferer"
import { redirectIfLoggedIn } from "Apps/Authentication/Middleware/redirectIfLoggedIn"
import { getENV } from "Utils/getENV"

jest.mock("Apps/Authentication/Middleware/checkForRedirect", () => ({
  checkForRedirect: jest.fn(),
}))

jest.mock("Apps/Authentication/Middleware/setReferer", () => ({
  setReferer: jest.fn(),
}))

jest.mock("Apps/Authentication/Middleware/redirectIfLoggedIn", () => ({
  redirectIfLoggedIn: jest.fn(),
}))

jest.mock("Utils/EnableRecaptcha", () => ({
  useRecaptcha: jest.fn(),
}))

jest.mock("Utils/Hooks/useAuthValidation")
jest.mock("Components/AuthDialog/Hooks/useAuthDialogTracking")

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(),
}))

describe("authenticationRoutes", () => {
  const mockCheckForRedirect = checkForRedirect as jest.Mock
  const mockSetReferer = setReferer as jest.Mock
  const mockGetENV = getENV as jest.Mock
  const mockRedirectIfLoggedIn = redirectIfLoggedIn as jest.Mock

  const renderClientRoute = (route: string) => {
    render(
      <MockBoot>
        <MockRouter initialRoute={route} routes={authenticationRoutes} />
      </MockBoot>
    )
  }

  const renderServerRoute = (route: string) => {
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
    jest.resetAllMocks()
  })

  describe("/forgot", () => {
    describe("client", () => {
      it("shows reset password title by default", async () => {
        renderClientRoute("/forgot")

        await waitFor(() => {
          expect(screen.getByText("Reset your password")).toBeInTheDocument()
        })
      })
    })

    describe("server", () => {
      describe("onServerSideRender", () => {
        it("sets RESET_PASSWORD_REDIRECT_TO", () => {
          const { onServerSideRender, req, res } = renderServerRoute("/forgot")
          req.query = {
            reset_password_redirect_to: "foo", // pragma: allowlist secret
          }
          onServerSideRender()

          expect(res.locals.sd.RESET_PASSWORD_REDIRECT_TO).toEqual(
            req.query.reset_password_redirect_to
          )
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

        await waitFor(() => {
          expect(
            screen.getByText(
              "Log in to collect art by the world’s leading artists"
            )
          ).toBeInTheDocument()
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
          renderServerRoute("/login?oauthLogin=true").onServerSideRender()
          expect(mockRedirectIfLoggedIn).not.toHaveBeenCalled()
          expect(mockCheckForRedirect).toHaveBeenCalled()
          expect(mockSetReferer).toHaveBeenCalled()
        })
      })
    })
  })

  describe("/reset_password", () => {
    describe("server", () => {
      describe("onServerSideRender", () => {
        it("runs middleware if query param found", () => {
          const { res, onServerSideRender } = renderServerRoute(
            "/reset_password?reset_password_token=foo&set_password=bar&reset_password_redirect_to=/home"
          )
          onServerSideRender()
          expect(res.redirect).toHaveBeenCalled()
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

        await waitFor(() => {
          expect(
            screen.getByText(
              "Sign up to collect art by the world’s leading artists"
            )
          ).toBeInTheDocument()
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
          renderServerRoute("/signup?oauthLogin=true").onServerSideRender()
          expect(mockRedirectIfLoggedIn).not.toHaveBeenCalled()
          expect(mockCheckForRedirect).toHaveBeenCalled()
          expect(mockSetReferer).toHaveBeenCalled()
        })
      })
    })
  })

  describe("/auth-redirect", () => {
    describe("server", () => {
      it("redirects to redirectTo", () => {
        mockGetENV.mockImplementation(key => {
          switch (key) {
            case "APP_URL":
              return "https://artsy.net"
            case "ALLOWED_REDIRECT_HOSTS":
              return "off.artsy.net"
          }
        })

        const { res, onServerSideRender } = renderServerRoute(
          "/auth-redirect?redirectTo=https://off.artsy.net/blah"
        )
        onServerSideRender()
        expect(res.redirect).toHaveBeenCalledWith("https://off.artsy.net/blah")
      })
    })
  })
})
