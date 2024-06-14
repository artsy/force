import { flow } from "lodash"
import { stringify } from "qs"
import loadable from "@loadable/component"
import { RouteProps } from "System/Router/Route"
import { checkForRedirect } from "Apps/Authentication/Middleware/checkForRedirect"
import { setReferer } from "Apps/Authentication/Middleware/setReferer"
import { redirectIfLoggedIn } from "Apps/Authentication/Middleware/redirectIfLoggedIn"
import { redirectPostAuth } from "Apps/Authentication/Middleware/redirectPostAuth"

const ForgotPasswordRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "authenticationBundle" */ "./Routes/AuthenticationForgotPasswordRoute"
    ),
  { resolveComponent: component => component.AuthenticationForgotPasswordRoute }
)

const ResetPasswordRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "authenticationBundle" */ "./Routes/AuthenticationResetPasswordRoute"
    ),
  { resolveComponent: component => component.AuthenticationResetPasswordRoute }
)

const LoginRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "authenticationBundle" */ "./Routes/AuthenticationLoginRoute"
    ),
  { resolveComponent: component => component.AuthenticationLoginRoute }
)

const SignupRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "authenticationBundle" */ "./Routes/AuthenticationSignUpRoute"
    ),
  { resolveComponent: component => component.AuthenticationSignUpRoute }
)

const runAuthMiddleware = flow(checkForRedirect, setReferer)

export const authenticationRoutes: RouteProps[] = [
  {
    path: "/forgot",
    layout: "ContainerOnly",
    getComponent: () => ForgotPasswordRoute,
    onServerSideRender: ({ req, res }) => {
      res.locals.sd.RESET_PASSWORD_REDIRECT_TO =
        req.query.reset_password_redirect_to

      runAuthMiddleware({ req, res })
    },
  },
  {
    path: "/login",
    layout: "ContainerOnly",
    getComponent: () => LoginRoute,
    onServerSideRender: props => {
      // We need this check so we allow someone to log into the API even if they
      // have already logged into force. Otherwise, we short-circuit and risk
      // taking the user into an infinite redirect loop.
      if (!props.req.query.oauthLogin) {
        redirectIfLoggedIn(props)
      }

      runAuthMiddleware(props)
    },
    onClientSideRender: () => {
      LoginRoute.preload()
    },
  },
  {
    path: "/reset_password",
    layout: "ContainerOnly",
    getComponent: () => ResetPasswordRoute,
    onServerSideRender: ({ req, res }) => {
      // To avoid exposing the token to 3rd parties, we first put it in the session
      // then redirect without the query string.
      if (req.query.reset_password_token) {
        const { reset_password_token, ...rest } = req.query
        req.session.RESET_PASSWORD_TOKEN = reset_password_token
        res.redirect(
          `/reset_password${
            // Pass along any other query params
            Object.keys(rest).length > 0 ? `?${stringify(rest)}` : ""
          }`
        )
        return
      }

      // If at this point we don't have the token in the session, we can't do anything
      // so just redirect home.
      if (!req.session.RESET_PASSWORD_TOKEN) {
        res.redirect("/")
      }

      // Pull the token off the session and into Sharify
      res.locals.sd.RESET_PASSWORD_TOKEN = req.session.RESET_PASSWORD_TOKEN
      req.session.RESET_PASSWORD_TOKEN = null

      runAuthMiddleware({ req, res })
    },
    onClientSideRender: () => {
      ResetPasswordRoute.preload()
    },
  },
  {
    path: "/signup",
    layout: "ContainerOnly",
    getComponent: () => SignupRoute,
    onServerSideRender: props => {
      // We need this check so we allow someone to log into the API even if they
      // have already logged into force. Otherwise, we short-circuit and risk
      // taking the user into an infinite redirect loop.
      if (!props.req.query.oauthLogin) {
        redirectIfLoggedIn(props)
      }

      runAuthMiddleware(props)
    },
    onClientSideRender: () => {
      SignupRoute.preload()
    },
  },
  {
    path: "/auth-redirect",
    onServerSideRender: props => {
      redirectPostAuth(props)
    },
  },
]
