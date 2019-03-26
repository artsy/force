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
      const {
        ARTIST_INSIGHTS,
        ARTIST_COLLECTIONS_RAIL_QA, // TODO: update after Artist Collections Rail a/b test
      } = res.locals.sd
      const {
        bodyHTML,
        redirect,
        status,
        headTags,
        styleTags,
        scripts,
      } = await buildServerApp({
        routes,
        url: req.url,
        userAgent: req.header("User-Agent"),
        context: {
          ...buildServerAppContext(req, res),
          ARTIST_INSIGHTS,
          showCollectionsRail:
            ARTIST_COLLECTIONS_RAIL_QA === "experiment" &&
            req.user &&
            req.user.isAdmin(), // TODO: update after Artist Collections Rail a/b test
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
        blocks: {
          head: () => (
            <>
              {headTags}
              <Meta sd={res.locals.sd} artist={artist} />
            </>
          ),
          body: bodyHTML,
        },
        locals: {
          ...res.locals,
          assetPackage: "artist",
          scripts,
          styleTags,
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
