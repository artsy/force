import React from 'react'
import { createEnvironment } from 'reaction/Relay/createEnvironment'
import { TestComponent, query } from 'reaction/Components/TestComponent'
import App from 'desktop/apps/react_example/components/App'
import { renderLayout } from '@artsy/stitch'
import { fetchQuery } from 'react-relay'

export async function index(req, res, next) {
  try {
    const relayEnvironment = createEnvironment({
      endpoint: process.env.METAPHYSICS_ENDPOINT,
    })

    const variables = {
      artistID: 'andy-warhol',
    }

    const data = await fetchQuery(relayEnvironment, query, variables)
    res.locals.sharify.data.relay = data

    const layout = await renderLayout({
      basePath: req.app.get('views'),
      layout: '../../../components/main_layout/templates/react_index.jade',
      blocks: {
        head: 'meta.jade',
        body: props => {
          return <TestComponent relayEnvironment={relayEnvironment} {...data} />
          // return (
          //   <ContextProvider variables={>
          //     <App {...props} />,
          //   </ContextProvider>
          // )
        },
      },
      locals: {
        ...res.locals,
        assetPackage: 'react_example',
      },
      data: {
        name: 'Leif',
        description: 'hello hi how are you',
      },
      // templates: {
      //   MyJadeView: 'myJadeView.jade',
      // },
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}
