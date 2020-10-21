import { buildServerApp } from "v2/Artsy/Router/server"
import { stitch } from "@artsy/stitch"
import { routes } from "v2/Apps/FeatureAKG/routes"
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
      req,
      res,
      context: { injectedData: data },
      routes: routes,
    })

    if (redirect) {
      res.redirect(302, redirect.url)
      return
    }

    // Render layout
    const layout = await stitch({
      basePath: __dirname,
      layout: "../../components/main_layout/templates/react_redesign.jade",
      blocks: {
        head: () => <React.Fragment>{headTags}</React.Fragment>,
        body: bodyHTML,
      },
      locals: {
        ...res.locals,
        assetPackage: "art_keeps_going",
        scripts,
        styleTags,
        data,
      },
    })

    res.status(status).send(layout)
  } catch (error) {
    next(error)
  }
}
