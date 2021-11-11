import { ModalType } from "v2/Components/Authentication/Types"
import { parse } from "url"
import { FullPageAuthStatic } from "v2/Apps/Authentication/Components/FullPageAuthStatic"
import { AuthenticationMeta } from "v2/Apps/Authentication/Components/AuthenticationMeta"

export const computeCopy = ({ intent, pageTitle, req, res, type }) => {
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

  return req.query.copy || title
}

export const computeStitchOptions = ({
  canonical,
  pageTitle,
  req,
  res,
  type,
}) => {
  const {
    action,
    afterSignUpAction,
    contextModule,
    error,
    intent,
    kind,
    objectId,
    trigger,
  } = req.query

  const copy = computeCopy({ intent, pageTitle, req, res, type })
  const redirectTo = getRedirectTo(req)
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const destination = req.query.destination || (isStaticAuthRoute && "/")
  const signupReferer = req.header("Referer") || req.hostname

  if (action) {
    res.cookie("afterSignUpAction", JSON.stringify({ action, kind, objectId }))
  }

  const meta = {
    canonical,
    description: "",
    title: pageTitle,
  }

  const options = {
    basePath: __dirname,
    blocks: {
      body: FullPageAuthStatic,
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
        copy,
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
  }

  return options as any
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
