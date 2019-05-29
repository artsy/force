import { stitch } from "@artsy/stitch"
import { AuthStatic } from "./components/AuthStatic"
import { ModalType } from "reaction/Components/Authentication/Types"
import { AuthenticationMeta } from "./components/meta"
import { MobileAuthStatic } from "./components/MobileAuthStatic"
import { parse } from "url"

export const index = async (req, res, next) => {
  let type: ModalType
  const template = res.locals.sd.IS_MOBILE ? MobileAuthStatic : AuthStatic
  let title

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
      pageTitle = "Forgot Password"
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
    destination,
    error,
    entityName,
    kind,
    objectId,
    signupIntent,
    intent,
    trigger,
  } = req.query

  switch (intent) {
    case "save artwork":
      title = `Sign up to ${intent}s`
      break
    case "follow partner":
      title = `Sign up to ${intent}s`
      break
    case "follow artist":
      title = `Sign up to follow ${entityName || "artists"}`
      break
    default:
      title = `Sign up for Artsy`
      break
  }

  if (type === ModalType.forgot) {
    res.locals.sd.RESET_PASSWORD_REDIRECT_TO =
      req.query.reset_password_redirect_to
    res.locals.sd.SET_PASSWORD = req.query.set_password
  }

  const redirectTo = req.query.redirectTo || "/"
  const signupReferer = req.header("Referer") || req.host

  if (action) {
    res.cookie("afterSignUpAction", JSON.stringify({ action, objectId, kind }))
  }

  try {
    const layout = await stitch({
      basePath: __dirname,
      layout: "../../components/main_layout/templates/react_blank_index.jade",
      config: {
        styledComponents: true,
      },
      blocks: {
        head: AuthenticationMeta,
        body: template,
      },
      locals: {
        ...res.locals,
        assetPackage: "auth2",
      },
      data: {
        type,
        meta,
        error,
        options: {
          afterSignUpAction,
          contextModule,
          destination,
          intent,
          redirectTo,
          signupIntent,
          signupReferer,
          trigger,
          title,
        },
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
  const pathname = parse(req.url || "").pathname
  if (["/log_in", "/login", "/sign_up", "/signup"].includes(pathname)) {
    req.query["redirect-to"] = "/"
  }
  if (req.user) {
    res.redirect(getRedirectTo(req))
  } else {
    next()
  }
}

export const getRedirectTo = req => {
  let referrer = parse(req.get("Referrer") || "").path || "/"

  return (
    req.body["redirect-to"] ||
    req.query["redirect-to"] ||
    req.query["redirect_uri"] ||
    referrer
  )
}
