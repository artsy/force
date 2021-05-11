import { buildServerApp } from "v2/Artsy/Router/server"
import { stitch } from "@artsy/stitch"
import { featureAKGRoutes } from "v2/Apps/FeatureAKG/featureAKGRoutes"
// @ts-ignore
import JSONPage from "../../components/json_page"
import React from "react"
import { NextFunction, Request, Response } from "express"

export const landingPage = async (
  req: Request,
  res: Response,
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
        // @ts-expect-error STRICT_NULL_CHECK
        body: bodyHTML,
        head: () => <React.Fragment>{headTags}</React.Fragment>,
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

    // @ts-expect-error STRICT_NULL_CHECK
    res.status(status).send(layout)
  } catch (error) {
    next(error)
  }
}
