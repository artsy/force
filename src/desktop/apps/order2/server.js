import { renderLayout } from "@artsy/stitch"
import express from "express"
import React from "react"
import { routes } from "reaction/Apps/Order/routes"
import { buildServerApp } from "reaction/Artsy/Router/server"
import styled from "styled-components"

const app = (module.exports = express())

app.get("/order2/:orderID*", async (req, res, next) => {
  try {
    const user = req.user && req.user.toJSON()

    const { ServerApp, redirect, status, headTags } = await buildServerApp({
      routes,
      url: req.url,
      context: {
        initialMatchingMediaQueries: res.locals.sd.IS_MOBILE
          ? ["xs"]
          : undefined,
        user,
      },
    })

    if (redirect) {
      res.redirect(302, redirect.url)
      return
    }

    // FIXME: Move this to Reaction
    const Container = styled.div`
      width: 100%;
      max-width: 1192px;
      margin: auto;
    `

    // Render layout
    const layout = await renderLayout({
      basePath: __dirname,
      layout:
        "../../components/main_layout/templates/react_minimal_header.jade",
      config: {
        styledComponents: true,
      },
      blocks: {
        head: () => headTags,
        body: () => (
          <Container>
            <ServerApp />
          </Container>
        ),
      },
      locals: {
        ...res.locals,
        assetPackage: "order2",
        // header logo should link back to originating artwork
        headerLogoHref: res.locals.sd.REFERRER,
        options: {
          stripev3: true,
        },
      },
    })

    res.status(status).send(layout)
  } catch (error) {
    console.log("(apps/order2) Error: ", error)
    next(error)
  }
})

export default app
