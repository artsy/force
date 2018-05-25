import React from 'react'
import express from 'express'
import adminOnly from 'desktop/lib/admin_only'
import { buildRelayApp } from 'desktop/lib/isomorphic-relay/mountServer'
import { routes } from './routes'
import { renderLayout } from '@artsy/stitch'

const app = (module.exports = express())

app.get('/isomorphic-relay-example*', adminOnly, async (req, res, next) => {
  try {
    const { APP, relayData, loadableScriptTag } = await buildRelayApp(
      routes,
      req,
      res
    )

    console.log(loadableScriptTag)

    const layout = await renderLayout({
      basePath: __dirname,
      layout: '../../components/main_layout/templates/react_index.jade',
      blocks: {
        head: 'components/meta.jade',
        body: () => <APP />,
      },
      locals: {
        ...res.locals,
        assetPackage: 'relay',
      },
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
})
