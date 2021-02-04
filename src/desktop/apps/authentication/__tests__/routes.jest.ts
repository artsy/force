import { redirectLoggedInHome, resetPassword } from "../routes"

describe("Routes", () => {
  let req
  let res
  const next = jest.fn()

  describe("#resetPassword", () => {
    beforeEach(() => {
      res = {
        locals: {
          sd: {},
        },
        redirect: jest.fn(),
        render: jest.fn(),
      }
      req = {
        query: {},
        session: {},
      }
    })

    describe("Has reset_password_token", () => {
      beforeEach(() => {
        req.query = {
          reset_password_redirect_to: "/articles",
          reset_password_token: "foobar",
          set_password: "set password",
        }
      })

      it("matches session params to query params", () => {
        const {
          reset_password_token,
          reset_password_redirect_to,
          set_password,
        } = req.query
        resetPassword(req, res)

        expect(req.session.reset_password_token).toBe(reset_password_token)
        expect(req.session.reset_password_redirect_to).toBe(
          reset_password_redirect_to
        )
        expect(req.session.set_password).toBe(set_password)
      })

      it("redirects to /reset_password", () => {
        resetPassword(req, res)
        expect(res.redirect.mock.calls[0][0]).toBe("/reset_password")
      })
    })

    describe("Without reset_password_token", () => {
      beforeEach(() => {
        req.session = {
          reset_password_redirect_to: "/articles",
          reset_password_token: "foobar",
          set_password: "set password",
        }
      })

      it("sets sd.RESET_PASWORD_REDIRECT_TO", () => {
        resetPassword(req, res)
        expect(res.locals.sd.RESET_PASWORD_REDIRECT_TO).toBe("/articles")
      })

      it("renders reset_password with expected args", () => {
        resetPassword(req, res)
        expect(res.render.mock.calls[0][0]).toBe("reset_password")
        expect(res.render.mock.calls[0][1].reset_password_token).toBe("foobar")
        expect(res.render.mock.calls[0][1].set_password).toBe("set password")
      })
    })
  })

  describe("#redirectLoggedInHome", () => {
    beforeEach(() => {
      res = {
        locals: {
          sd: {},
        },
        redirect: jest.fn(),
        render: jest.fn(),
      }
      req = {
        body: {},
        get: jest.fn(),
        header: () => "referrer",
        query: {},
        session: {},
      }
    })

    it("Calls next if no user", () => {
      redirectLoggedInHome(req, res, next)
      expect(next).toBeCalled()
    })

    it("redirects logged in users home", () => {
      req.user = {}
      redirectLoggedInHome(req, res, next)
      expect(res.redirect).toBeCalledWith("/")
    })

    it("redirects logged in users (with a redirect_uri query param) to redirect location", () => {
      req.user = {}
      req.query["redirect_uri"] = "/awesome-fair"
      redirectLoggedInHome(req, res, next)
      expect(res.redirect).toBeCalledWith("/awesome-fair")
    })

    it("redirects logged in users (with a redirect-to query param) to redirect location", () => {
      req.user = {}
      req.query["redirect-to"] = "/awesome-fair"
      redirectLoggedInHome(req, res, next)
      expect(res.redirect).toBeCalledWith("/awesome-fair")
    })

    it("redirects logged in users (with redirect-to in the POST params) to redirect location", () => {
      req.user = {}
      req.body["redirect-to"] = "/awesome-fair"
      redirectLoggedInHome(req, res, next)
      expect(res.redirect).toBeCalledWith("/awesome-fair")
    })

    it("redirects logged in users to home if they log in from /log_in", () => {
      req.get.mockReturnValueOnce("/log_in")
      req.url = "/log_in"
      req.user = {}
      redirectLoggedInHome(req, res, next)
      expect(res.redirect).toBeCalledWith("/")
    })

    it("redirects logged in users to home if they log in from /login", () => {
      req.get.mockReturnValueOnce("/login")
      req.url = "/login"
      req.user = {}
      redirectLoggedInHome(req, res, next)
      expect(res.redirect).toBeCalledWith("/")
    })

    it("redirects logged in users to home if they log in from /sign_up", () => {
      req.get.mockReturnValueOnce("/sign_up")
      req.url = "/sign_up"
      req.user = {}
      redirectLoggedInHome(req, res, next)
      expect(res.redirect).toBeCalledWith("/")
    })

    it("redirects logged in users to home if they log in from /signup", () => {
      req.get.mockReturnValueOnce("/signup")
      req.url = "/signup"
      req.user = {}
      redirectLoggedInHome(req, res, next)
      expect(res.redirect).toBeCalledWith("/")
    })
  })
})
