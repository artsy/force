import { buildServerApp } from "reaction/Artsy/Router/server"
import { Meta, query, toJSONLD } from "./components/Meta"
import { stitch } from "@artsy/stitch"
import { routes } from "reaction/Apps/Artist/routes"
import React from "react"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
import express, { Request, Response, NextFunction } from "express"

const metaphysics = require("lib/metaphysics.coffee")

export const app = express()

app.get(
  "/artist/:artistID*",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user && req.user.toJSON()
      const { ARTIST_INSIGHTS } = res.locals.sd
      const {
        ServerApp,
        redirect,
        status,
        headTags,
        scripts,
      } = await buildServerApp({
        routes,
        url: req.url,
        userAgent: req.header("User-Agent"),
        context: {
          ...buildServerAppContext(req, res),
          ARTIST_INSIGHTS,
        },
      })

      if (redirect) {
        res.redirect(302, redirect.url)
        return
      }

      const send = {
        method: "post",
        query,
        variables: { artistID: req.params.artistID },
      }

      const { artist } = await metaphysics(send).then(data => data)
      const { APP_URL, IS_MOBILE, REFERRER } = res.locals.sd
      const isExternalReferer = !(REFERRER && REFERRER.includes(APP_URL))
      const jsonLD = toJSONLD(artist, APP_URL)

      res.locals.sd.ARTIST_PAGE_CTA_ENABLED =
        !user && isExternalReferer && !IS_MOBILE
      res.locals.sd.ARTIST_PAGE_CTA_ARTIST_ID = req.params.artistID

      // Render layout
      const layout = await stitch({
        basePath: __dirname,
        layout: "../../components/main_layout/templates/react_redesign.jade",
        config: {
          styledComponents: true,
        },
        blocks: {
          head: () => (
            <>
              {headTags}
              <Meta sd={res.locals.sd} artist={artist} />
            </>
          ),
          body: ServerApp,
        },
        locals: {
          ...res.locals,
          assetPackage: "artist",
          scripts,
        },
        data: {
          jsonLD,
        },
      })

      res.status(status).send(layout)
    } catch (error) {
      console.log(error)
      if (error.message.includes("Artist Not Found")) {
        const notFoundError: any = new Error("Artist Not Found")
        notFoundError.status = 404
        next(notFoundError)
      } else {
        next(error)
      }
    }
  }
)
