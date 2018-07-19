import { renderLayout } from '@artsy/stitch'
import express from 'express'
import React from 'react'
import { App } from './Components/App'

const app = (module.exports = express())

app.get('/order2/:orderID*', async (req, res, next) => {
  try {
    const layout = await renderLayout({
      basePath: __dirname,
      layout: '../../components/main_layout/templates/react_index.jade',
      config: {
        styledComponents: true,
      },
      blocks: {
        head: () => <div>head</div>,
        body: App,
      },
      locals: {
        assetPackage: 'order2',
        ...res.locals,
      },
    })

    res.send(layout)
  } catch (error) {
    console.log('(apps/order2) Error: ', error)
  }
})

export default app
