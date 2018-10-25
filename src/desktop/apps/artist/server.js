import { buildServerApp } from "reaction/Artsy/Router/server"
import { Meta, query, toJSONLD } from "./components/Meta"
import { stitch } from "@artsy/stitch"
import { routes } from "reaction/Apps/Artist/routes"
import express from "express"
import metaphysics from "lib/metaphysics.coffee"
import React from "react"
import styled from "styled-components"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"

const app = (module.exports = express())

app.get("/artist/:artistID*", async (req, res, next) => {
  try {
    const user = req.user && req.user.toJSON()

    const { ServerApp, redirect, status } = await buildServerApp({
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
        head: () => <Meta sd={res.locals.sd} artist={artist} />,
        body: () => (
          <Container>
            <ServerApp />
          </Container>
        ),
      },
      locals: {
        ...res.locals,
        assetPackage: "artist",
      },
      data: {
        jsonLD,
      },
    })

    res.status(status).send(layout)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default app
