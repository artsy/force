import { stitch } from "@artsy/stitch"
import express from "express"
import React from "react"
import { routes } from "reaction/Apps/Order/routes"
import { buildServerApp } from "reaction/Artsy/Router/server"
import styled from "styled-components"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"

const app = (module.exports = express())

app.get("/order2/:orderID*", async (req, res, next) => {
  if (!res.locals.sd.CURRENT_USER) {
    console.warn("no user D:")
    return res.redirect(
      `/login?redirectTo=${encodeURIComponent(req.originalUrl)}`
    )
  }
  try {
    const { ServerApp, redirect, status, headTags } = await buildServerApp({
      routes,
      url: req.url,
      context: buildServerAppContext(req, res),
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
    const layout = await stitch({
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
        hideLogoForEigen: res.locals.sd.EIGEN,
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
