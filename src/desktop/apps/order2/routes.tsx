import { App } from './Components/App'
import React from 'react'
import { renderLayout } from '@artsy/stitch'

export async function index(req, res, next) {
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
}
