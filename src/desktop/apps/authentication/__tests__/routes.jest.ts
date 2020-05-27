import { AuthStatic } from "../components/AuthStatic"
import { MobileAuthStatic } from "../components/MobileAuthStatic"
import { index, redirectLoggedInHome, resetPassword } from "../routes"

jest.mock("@artsy/stitch", () => ({
  stitch: jest.fn(),
}))
const stitch = require("@artsy/stitch").stitch as jest.Mock

describe("Routes", () => {
  let req
  let res
  let next

  describe("#index", () => {
    beforeEach(() => {
      req = {
        path: "/",
        query: {},
        header: () => "referrer",
        get: jest.fn(),
        body: {},
      }
      res = {
        locals: {
          sd: {
            IS_MOBILE: false,
          },
        },
        send: jest.fn(),
        cookie: jest.fn(),
      }
      next = jest.fn()
      stitch.mockReset()
    })

    it("calls next if #stitch returns an error", done => {
      stitch.mockImplementationOnce(() => {
        throw new Error("A new error")
      })

      index(req, res, next).then(() => {
        expect(next).toHaveBeenCalled()
        done()
      })
    })

    describe("Component", () => {
      it("Returns AuthStatic component if UA is desktop", done => {
        index(req, res, next).then(() => {
          expect(stitch.mock.calls[0][0].blocks.body).toBe(AuthStatic)
          done()
        })
      })

      it("Returns MobileAuthStatic component if sd.IS_MOBILE", done => {
        res.locals.sd.IS_MOBILE = true
        index(req, res, next).then(() => {
          expect(stitch.mock.calls[0][0].blocks.body).toBe(MobileAuthStatic)
          done()
        })
      })
    })

    describe("Data", () => {
      describe("Type", () => {
        it("Returns login type by default", done => {
          index(req, res, next).then(() => {
            expect(stitch.mock.calls[0][0].data.type).toBe("login")
            done()
          })
        })

        it("Returns the correct modal.type for /login path", done => {
          req.path = "/login"
          index(req, res, next).then(() => {
            expect(stitch.mock.calls[0][0].data.type).toBe("login")
            done()
          })
        })

        it("Returns the correct modal.type for /log_in path", done => {
          req.path = "/log_in"
          index(req, res, next).then(() => {
            expect(stitch.mock.calls[0][0].data.type).toBe("login")
            done()
          })
        })

        it("Returns the correct modal.type for /signup path", done => {
          req.path = "/signup"
          index(req, res, next).then(() => {
            expect(stitch.mock.calls[0][0].data.type).toBe("signup")
            done()
          })
        })

        it("Returns the correct modal.type for /sign_up path", done => {
          req.path = "/sign_up"
          index(req, res, next).then(() => {
            expect(stitch.mock.calls[0][0].data.type).toBe("signup")
            done()
          })
        })

        it("Returns the correct modal.type for /forgot path", done => {
          req.path = "/forgot"
          index(req, res, next).then(() => {
            expect(stitch.mock.calls[0][0].data.type).toBe("forgot")
            done()
          })
        })
      })

      describe("Meta", () => {
        it("returns the correct title for login", done => {
          index(req, res, next).then(() => {
            expect(stitch.mock.calls[0][0].data.meta.title).toBe(
              "Login to Artsy"
            )
            done()
          })
        })

        it("returns the correct title for signup", done => {
          req.path = "/signup"
          index(req, res, next).then(() => {
            expect(stitch.mock.calls[0][0].data.meta.title).toBe(
              "Signup for Artsy"
            )
            done()
          })
        })

        it("returns the correct title for forgot", done => {
          req.path = "/forgot"
          index(req, res, next).then(() => {
            expect(stitch.mock.calls[0][0].data.meta.title).toBe(
              "Reset your password"
            )
            done()
          })
        })
      })

      describe("intent", () => {
        it("returns correct title for save artwork intent", done => {
          req.path = "/signup"
          req.query = {
            intent: "save artwork",
          }
          index(req, res, next).then(() => {
            expect(stitch.mock.calls[0][0].data.options.copy).toBe(
              "Sign up to save artworks"
            )
            done()
          })
        })

        it("returns correct title for follow partner intent", done => {
          req.path = "/signup"
          req.query = {
            intent: "follow partner",
          }
          index(req, res, next).then(() => {
            expect(stitch.mock.calls[0][0].data.options.copy).toBe(
              "Sign up to follow partners"
            )
            done()
          })
        })

        it("returns correct title for follow artist intent", done => {
          req.path = "/signup"
          req.query = {
            intent: "follow artist",
          }
          index(req, res, next).then(() => {
            expect(stitch.mock.calls[0][0].data.options.copy).toBe(
              "Sign up to follow artists"
            )
            done()
          })
        })

        it("returns correct title when other intent provided", done => {
          req.path = "/signup"
          req.query = {
            intent: "viewedEditorial",
          }
          index(req, res, next).then(() => {
            expect(stitch.mock.calls[0][0].data.options.copy).toBe(
              "Signup for Artsy"
            )
            done()
          })
        })

        it("returns correct title when other intent provided", done => {
          req.path = "/forgot"
          req.query = {
            set_password: "reset",
          }
          index(req, res, next).then(() => {
            expect(stitch.mock.calls[0][0].data.options.copy).toBe(
              "Set your password"
            )
            done()
          })
        })
      })

      it("Options returns all expected fields from query", done => {
        req.query = {
          action: "follow",
          contextModule: "artistHeader",
          kind: "profile",
          objectId: "david-zwirner",
          copy: "Sign up to follow David Zwirner",
          intent: "followPartner",
          mode: "signup",
          "redirect-to": "/david-zwirner",
        }

        index(req, res, next).then(() => {
          const {
            action,
            contextModule,
            copy,
            intent,
            kind,
            objectId,
            redirectTo,
          } = stitch.mock.calls[0][0].data.options
          expect(action).toBe("follow")
          expect(contextModule).toBe("artistHeader")
          expect(copy).toBe("Sign up to follow David Zwirner")
          expect(intent).toBe("followPartner")
          expect(kind).toBe("profile")
          expect(objectId).toBe("david-zwirner")
          expect(redirectTo).toBe("/david-zwirner")
          done()
        })
      })

      it("can handle old redirect_uri redirect params", done => {
        req.query = {
          redirect_uri: "/bar",
        }

        index(req, res, next).then(() => {
          const { redirectTo } = stitch.mock.calls[0][0].data.options
          expect(redirectTo).toBe("/bar")
          done()
        })
      })

      it("adds destination for static /login routes", done => {
        req.query = {}
        req.path = "/login"
        index(req, res, next).then(() => {
          const {
            redirectTo,
            destination,
          } = stitch.mock.calls[0][0].data.options
          expect(destination).toBe("/")
          expect(redirectTo).toBe(undefined)
          done()
        })
      })

      it("respects redirectTo for static /login routes", done => {
        req.query = {
          redirectTo: "/consign",
        }
        req.path = "/login"
        index(req, res, next).then(() => {
          const { redirectTo } = stitch.mock.calls[0][0].data.options
          expect(redirectTo).toBe("/consign")
          done()
        })
      })

      it("adds destination for static /signup routes", done => {
        req.query = {}
        req.path = "/signup"
        index(req, res, next).then(() => {
          const {
            redirectTo,
            destination,
          } = stitch.mock.calls[0][0].data.options
          expect(destination).toBe("/")
          expect(redirectTo).toBe(undefined)
          done()
        })
      })

      it("respects redirectTo for static /signup routes", done => {
        req.query = {
          redirectTo: "/consign",
        }
        req.path = "/signup"
        index(req, res, next).then(() => {
          const { redirectTo } = stitch.mock.calls[0][0].data.options
          expect(redirectTo).toBe("/consign")
          done()
        })
      })

      it("can handle old redirect-to redirect params", done => {
        req.query = {
          "redirect-to": "/bar",
        }

        index(req, res, next).then(() => {
          const { redirectTo } = stitch.mock.calls[0][0].data.options
          expect(redirectTo).toBe("/bar")
          done()
        })
      })

      it("Sets afterSignUpAction cookie if corresponding query params are present", done => {
        req.query = {
          action: "follow",
          objectId: "123",
          kind: "artist",
          destination: "/foo",
          redirectTo: "/bar",
          signupReferer: "referrer",
        }

        index(req, res, next).then(() => {
          expect(res.cookie.mock.calls[0][1]).toBe(
            JSON.stringify({
              action: "follow",
              objectId: "123",
              kind: "artist",
            })
          )
          done()
        })
      })
    })
  })

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
          reset_password_token: "foobar",
          reset_password_redirect_to: "/articles",
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
          reset_password_token: "foobar",
          reset_password_redirect_to: "/articles",
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
        header: () => "referrer",
        body: {},
        query: {},
        session: {},
        get: jest.fn(),
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
