import { buildServerApp } from "v2/System/Router/server"
import { stitch } from "@artsy/stitch"
import { featureAKGRoutes } from "v2/Apps/FeatureAKG/featureAKGRoutes"
// @ts-ignore
import JSONPage from "../../components/json_page"
import { Fragment } from "react"
import { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"

export const landingPage = async (
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) => {
  try {
    const landing = new JSONPage({ name: "art-keeps-going" })
    const data = await landing.get()
    res.locals.sd.JSON_PAGE_DATA = data

    const {
      bodyHTML,
      redirect,
      status,
      headTags,
      styleTags,
      scripts,
    } = await buildServerApp({
      context: { injectedData: data },
      req,
      res,
      next,
      routes: featureAKGRoutes,
    })

    if (redirect) {
      res.redirect(302, redirect.url)
      return
    }

    // Render layout
    const layout = await stitch({
      basePath: __dirname,
      blocks: {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        body: bodyHTML,
        head: () => <Fragment>{headTags}</Fragment>,
      },
      layout: "../../components/main_layout/templates/react_redesign.jade",
      locals: {
        ...res.locals,
        assetPackage: "art_keeps_going",
        data,
        scripts,
        styleTags,
      },
    })

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    res.status(status).send(layout)
  } catch (error) {
    next(error)
  }
}
