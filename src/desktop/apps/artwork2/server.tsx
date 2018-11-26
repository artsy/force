import React from "react"
import adminOnly from "desktop/lib/admin_only"
import { buildServerApp } from "reaction/Artsy/Router/server"
import { routes } from "reaction/Apps/Artwork/routes"
import { stitch } from "@artsy/stitch"
import { Meta } from "./components/Meta"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
import styled from "styled-components"
import express, { Request, Response, NextFunction } from "express"

export const app = express()

app.get(
  "/artwork2/:artworkID*",
  adminOnly,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        ServerApp,
        redirect,
        status,
        headTags,
        scripts,
      } = await buildServerApp({
        routes,
        url: req.url,
        context: buildServerAppContext(req, res),
      })

      if (redirect) {
        res.redirect(302, redirect.url)
        return
      }

      const Container = styled.div`
        width: 100%;
        max-width: 1192px;
        margin: auto;
      `

      const layout = await stitch({
        basePath: __dirname,
        layout: "../../components/main_layout/templates/react_redesign.jade",
        config: {
          styledComponents: true,
        },
        blocks: {
          head: () => (
            <React.Fragment>
              {headTags}
              <Meta />
            </React.Fragment>
          ),
          body: () => (
            <Container>
              <ServerApp />
            </Container>
          ),
        },
        locals: {
          ...res.locals,
          assetPackage: "artwork2",
          scripts,
        },
      })

      res.status(status).send(layout)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)
