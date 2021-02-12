import * as _ from "underscore"
import { stitch } from "@artsy/stitch"
import { App } from "desktop/apps/personalize/components/App"

const computeStitchOptions = (request, response) => {
  const basePath = request.app.get("views")
  const currentUser = response.locals.sd.CURRENT_USER
  const redirectTo = request.query.redirectTo
  const forceStep = request.params.slug

  const options = {
    basePath,
    config: {
      styledComponents: true,
    },
    layout: "../../components/main_layout/templates/react_blank_index.jade",
    blocks: {
      head: "./meta.jade",
      body: App,
    },
    locals: {
      ...response.locals,
      assetPackage: "onboarding",
    },
    data: {
      currentUser,
      forceStep,
      redirectTo,
      title: "Personalize | Artsy",
    },
  }

  return options
}

export const index = async (req, res, next) => {
  try {
    const options = computeStitchOptions(req, res)
    const layout = await stitch(options)

    res.send(layout)
  } catch (error) {
    next(error)
  }
}

export const ensureLoggedInUser = (request, response, next) => {
  const loginWithRedirect = "/login?redirect-to=/personalize/interests"
  const currentUser = response.locals.sd.CURRENT_USER
  if (!currentUser) return response.redirect(loginWithRedirect)
  next()
}
