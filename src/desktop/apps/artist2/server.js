import { buildServerApp } from 'reaction/Router'
import { Meta, query } from './components/Meta'
import { renderLayout } from '@artsy/stitch'
import { routes } from 'reaction/Apps/Artist/routes'
import adminOnly from 'desktop/lib/admin_only'
import express from 'express'
import metaphysics from 'lib/metaphysics.coffee'
import React from 'react'
import styled from 'styled-components'

const app = (module.exports = express())

app.get('/artist2/:artistID*', adminOnly, async (req, res, next) => {
  try {
    const user = req.user && req.user.toJSON()

    const { ServerApp, redirect, status } = await buildServerApp({
      boot: {
        breakpoint: res.locals.sd.IS_MOBILE ? 'xs' : false,
      },
      routes,
      url: req.url,
      user,
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
      method: 'post',
      query,
      variables: { artistID: req.params.artistID },
    }

    const { artist } = await metaphysics(send).then(data => data)

    const isExternalReferer =
      res.locals.sd.REFERRER &&
      !res.locals.sd.REFERRER.includes(res.locals.sd.APP_URL)

    // Since this page is admin-only now, need to swap this in to test.
    // res.locals.sd.ARTIST_PAGE_CTA_ENABLED = true
    res.locals.sd.ARTIST_PAGE_CTA_ENABLED = !user && isExternalReferer
    res.locals.sd.ARTIST_PAGE_CTA_ARTIST_ID = req.params.artistID

    // Render layout
    const layout = await renderLayout({
      basePath: __dirname,
      layout: '../../components/main_layout/templates/react_redesign.jade',
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
        assetPackage: 'artist2',
      },
    })

    res.status(status).send(layout)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default app
