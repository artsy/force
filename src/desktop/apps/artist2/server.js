import { Theme } from '@artsy/palette'
import React from 'react'
import express from 'express'
import styled from 'styled-components'
import adminOnly from 'desktop/lib/admin_only'
import { buildServerApp } from 'reaction/Router'
import { renderLayout } from '@artsy/stitch'
import { Meta } from './components/Meta'
import { routes } from '@artsy/reaction/dist/Styleguide/Pages/Artist/routes'

const app = (module.exports = express())

app.get('/artist2*', adminOnly, async (req, res, next) => {
  try {
    const { ServerApp, redirect, status } = await buildServerApp({
      routes,
      url: req.url,
    })

    if (redirect) {
      res.redirect(302, redirect.url)
      return
    }

    const Container = styled.div`
      width: 100%;
      max-width: 1200px;
      margin: auto;
    `
    const layout = await renderLayout({
      basePath: __dirname,
      layout: '../../components/main_layout/templates/react_redesign.jade',
      config: {
        styledComponents: true,
      },
      blocks: {
        head: Meta,
        body: () => (
          <Container>
            <Theme>
              <ServerApp />
            </Theme>
          </Container>
        ),
      },
      locals: {
        ...res.locals,
        assetPackage: 'artist2',
        styledComponents: true,
      },
    })

    res.status(status).send(layout)
    // res.send(layout)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default app
