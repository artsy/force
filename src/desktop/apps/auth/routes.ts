import { stitch } from "@artsy/stitch"
import { AuthStatic } from "./components/AuthStatic"
import { ModalType } from "reaction/Components/Authentication/Types"
import { AuthenticationMeta } from "./components/meta"
import { MobileAuthStatic } from "./components/MobileAuthStatic"

export const index = async (req, res, next) => {
  let type: ModalType
  const template = res.locals.sd.IS_MOBILE ? MobileAuthStatic : AuthStatic

  switch (req.path) {
    case "/login":
      type = ModalType.login
      break
    case "/signup":
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
    kind,
    objectId,
    signupIntent,
    intent,
    trigger,
  } = req.query

  const title = ["save artwork", "follow partner"].includes(intent)
    ? `Sign up to ${intent}s`
    : null

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
        assetPackage: "auth",
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
