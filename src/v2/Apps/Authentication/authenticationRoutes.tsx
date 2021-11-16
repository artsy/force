import loadable from "@loadable/component"
import { RedirectException } from "found"
import { AppRouteConfig } from "v2/System/Router/Route"
import { checkForRedirect } from "./Server/checkForRedirect"
import { setReferer } from "./Server/setReferer"
import { flow } from "lodash"

const ForgotPasswordRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "authenticationBundle" */ "./Routes/ForgotPasswordRoute"
    ),
  { resolveComponent: component => component.ForgotPasswordRoute }
)

const ResetPasswordRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "authenticationBundle" */ "./Routes/ResetPasswordRoute"
    ),
  { resolveComponent: component => component.ResetPasswordRoute }
)

const LoginRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "authenticationBundle" */ "./Routes/LoginRoute"
    ),
  { resolveComponent: component => component.LoginRoute }
)

const SignupRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "authenticationBundle" */ "./Routes/SignupRoute"
    ),
  { resolveComponent: component => component.SignupRoute }
)

const runAuthMiddleware = flow(checkForRedirect, setReferer)

export const authenticationRoutes: AppRouteConfig[] = [
  {
    path: "/forgot2",
    hideNav: true,
    hideFooter: true,
    getComponent: () => ForgotPasswordRoute,
    onServerSideRender: ({ req, res }) => {
      res.locals.sd.RESET_PASSWORD_REDIRECT_TO =
        req.query.reset_password_redirect_to

      // Used to customize reset copy/emails for partners etc
      res.locals.sd.SET_PASSWORD = req.query.set_password

      runAuthMiddleware({ req, res })
    },
  },
  {
    path: "/login2",
    hideNav: true,
    hideFooter: true,
    getComponent: () => LoginRoute,
    onServerSideRender: runAuthMiddleware,
    onClientSideRender: () => {
      return LoginRoute.preload()
    },
  },
  {
    path: "/log_in2",
    render: ({ match }) => {
      throw new RedirectException(`/login2${match.location.search}`, 301)
    },
  },
  {
    path: "/reset_password2",
    hideNav: true,
    hideFooter: true,
    getComponent: () => ResetPasswordRoute,
    onServerSideRender: runAuthMiddleware,
    onClientSideRender: () => {
      return ResetPasswordRoute.preload()
    },
  },
  {
    path: "/signup2",
    hideNav: true,
    hideFooter: true,
    getComponent: () => SignupRoute,
    onServerSideRender: runAuthMiddleware,
    onClientSideRender: () => {
      return LoginRoute.preload()
    },
  },
  {
    path: "/sign_up2",
    render: ({ match }) => {
      throw new RedirectException(`/signup2${match.location.search}`, 301)
    },
  },
]
