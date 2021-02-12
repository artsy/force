import * as _ from "underscore"
import { stitch } from "@artsy/stitch"
import { App } from "desktop/apps/personalize/components/App"

const computeStitchOptions = (request, response) => {
  const options = {
    basePath: request.app.get("views"),
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
      title: "Personalize | Artsy",
      currentUser: response.locals.sd.CURRENT_USER,
      redirectTo: request.query.redirectTo,
      forceStep: request.params.slug,
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

export const ensureLoggedInUser = (req, res, next) => {
  if (!res.locals.sd.CURRENT_USER) return res.redirect("/personalize")
  next()
}
