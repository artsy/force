import express from 'express'
import adminOnly from 'desktop/lib/admin_only'
import { buildServerApp } from 'desktop/lib/psi/buildServerApp'
import { routes } from './routes'
import { renderLayout } from '@artsy/stitch'
import { Meta } from './components/Meta'

const app = (module.exports = express())

app.get('/isomorphic-relay-example*', adminOnly, async (req, res, next) => {
  try {
    const { App } = await buildServerApp(routes, req.url)

    const layout = await renderLayout({
      basePath: __dirname,
      layout: '../../components/main_layout/templates/react_index.jade',
      config: {
        styledComponents: true,
      },
      blocks: {
        head: Meta,
        body: App,
      },
      locals: {
        ...res.locals,
        assetPackage: 'relay',
        styledComponents: true,
      },
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
})
