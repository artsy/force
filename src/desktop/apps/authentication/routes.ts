import { stitch } from "@artsy/stitch"
import { ModalType } from "v2/Components/Authentication/Types"
import { AuthenticationMeta } from "./components/meta"
import { parse } from "url"
import { FullPageAuthStatic } from "./components/FullPageAuthStatic"

export const index = async (req, res, next) => {
  let type: ModalType
  const template = FullPageAuthStatic

  switch (req.path) {
    case "/signup":
      type = ModalType.signup
      break
    case "/sign_up":
      type = ModalType.signup
      break
    case "/forgot":
      type = ModalType.forgot
      break
    default:
      type = ModalType.login
      break
  }

  let pageTitle = ""
  switch (type) {
    case ModalType.login:
      pageTitle = "Login to Artsy"
      break
    case ModalType.signup:
      pageTitle = "Signup for Artsy"
      break
    case ModalType.forgot:
      pageTitle = "Reset your password"
      break
  }
  const meta = {
    description: "",
    title: pageTitle,
  }

  const {
    action,
    afterSignUpAction,
    contextModule,
    copy,
    error,
    kind,
    objectId,
    intent,
    trigger,
  } = req.query

  let title
  switch (intent) {
    case "save artwork":
      title = `Sign up to ${intent}s`
      break
    case "follow partner":
      title = `Sign up to ${intent}s`
      break
    case "follow artist":
      title = "Sign up to follow artists"
      break
    default:
      title = pageTitle || `Sign up for Artsy`
      break
  }

  if (type === ModalType.forgot) {
    res.locals.sd.RESET_PASSWORD_REDIRECT_TO =
      req.query.reset_password_redirect_to

    // Used to customize reset copy/emails for partners etc
    res.locals.sd.SET_PASSWORD = req.query.set_password
    if (req.query.set_password) {
      title = "Set your password"
    }
  }

  const redirectTo = getRedirectTo(req)
  const destination = req.query.destination || (isStaticAuthRoute && "/")
  const signupReferer = req.header("Referer") || req.hostname

  if (action) {
    res.cookie("afterSignUpAction", JSON.stringify({ action, kind, objectId }))
  }

  try {
    const layout = await stitch({
      basePath: __dirname,
      blocks: {
        body: template,
        head: AuthenticationMeta,
      },
      config: {
        styledComponents: true,
      },
      data: {
        error,
        meta,
        options: {
          action,
          afterSignUpAction,
          contextModule,
          copy: copy || title,
          destination,
          error,
          intent,
          kind,
          objectId,
          redirectTo,
          signupReferer,
          trigger,
        },
        type,
      },
      layout: "../../components/main_layout/templates/react_blank_index.jade",
      locals: {
        ...res.locals,
        assetPackage: "authentication",
      },
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}

export const resetPassword = (req, res) => {
  if (req.query.reset_password_token) {
    req.session.reset_password_token = req.query.reset_password_token
    req.session.set_password = req.query.set_password
    req.session.reset_password_redirect_to =
      req.query.reset_password_redirect_to
    res.redirect("/reset_password")
  } else {
    res.locals.sd.RESET_PASWORD_REDIRECT_TO =
      req.session.reset_password_redirect_to
    res.render("reset_password", {
      reset_password_token: req.session.reset_password_token,
      set_password: req.session.set_password,
    })
  }
}

export const redirectLoggedInHome = (req, res, next) => {
  if (req.user) {
    const isStaticAuth = isStaticAuthRoute(req)
    if (isStaticAuth) {
      req.query["redirect-to"] = req.query["redirect-to"] || "/"
    }
    res.redirect(getRedirectTo(req))
  } else {
    next()
  }
}

export const isStaticAuthRoute = req => {
  const pathname = req.path || parse(req.url || "").pathname
  const isStaticAuthRoute = [
    "/log_in",
    "/login",
    "/sign_up",
    "/signup",
  ].includes(pathname)
  return isStaticAuthRoute
}

export const getRedirectTo = req => {
  let referrer = parse(req.get("Referrer") || "").path || "/"
  const isStaticAuth = isStaticAuthRoute(req)
  const redirectTo =
    req.query["redirectTo"] ||
    req.body["redirect-to"] ||
    req.query["redirect-to"] ||
    req.query["redirect_uri"] ||
    (!isStaticAuth ? referrer : undefined)

  if (redirectTo === ("/reset_password" || "/user/delete")) {
    return "/"
  } else {
    return redirectTo
  }
}
