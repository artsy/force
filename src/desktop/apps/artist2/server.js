import { Theme } from '@artsy/palette'
import React from 'react'
import express from 'express'
import styled from 'styled-components'
import adminOnly from 'desktop/lib/admin_only'
import { buildServerApp } from 'reaction/Router'
import { renderLayout } from '@artsy/stitch'
import { Meta, query } from './components/Meta'
import { routes } from '@artsy/reaction/dist/Styleguide/Pages/Artist/routes'
import metaphysics from 'lib/metaphysics.coffee'

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

    const Container = styled.div`
      width: 100%;
      max-width: 1200px;
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
            <Theme>
              <ServerApp />
            </Theme>
          </Container>
        ),
      },
      locals: {
        ...res.locals,
        assetPackage: 'artist2',
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
