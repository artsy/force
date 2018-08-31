import { buildServerApp } from 'reaction/Artsy/Router'
import { renderLayout } from '@artsy/stitch'
import { routes } from 'reaction/Apps/Collect/routes'
import express from 'express'
import React from 'react'
import styled from 'styled-components'

const app = (module.exports = express())

app.get('/collect2', async (req, res, next) => {
  try {
    const user = req.user && req.user.toJSON()
    const { ServerApp, redirect } = await buildServerApp({
      routes,
      url: req.url,
      context: {
        initialMatchingMediaQueries: res.locals.sd.IS_MOBILE
          ? ['xs']
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
      layout: '../../components/main_layout/templates/react_redesign.jade',
      config: {
        styledComponents: true,
      },
      blocks: {
        head: () => null,
        body: () => (
          <Container>
            <ServerApp />
          </Container>
        ),
      },
      locals: {
        ...res.locals,
        assetPackage: 'collect2',
      },
    })

    res.send(layout)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default app
