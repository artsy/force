import React from 'react'
import App from 'desktop/apps/react_example/components/App'
import CurrentUser from 'lib/current_user.coffee'
import { createEnvironment } from 'reaction/Relay/createEnvironment'
import { TestComponent, query } from 'reaction/Components/TestComponent'
import { renderLayout } from '@artsy/stitch'
import { fetchQuery } from 'react-relay'

export async function index(req, res, next) {
  try {
    const user = req.user.toJSON()
    const relayEnvironment = createEnvironment({
      user,
    })

    const variables = {
      artistID: 'andy-warhol',
    }

    const data = await fetchQuery(relayEnvironment, query, variables)

    res.locals.sharify.data.relay = {
      records: relayEnvironment.getStore().getSource(),
    }

    const layout = await renderLayout({
      basePath: req.app.get('views'),
      layout: '../../../components/main_layout/templates/react_index.jade',
      config: {
        styledComponents: true,
      },
      blocks: {
        head: 'meta.jade',
        body: props => {
          return (
            <TestComponent
              relayEnvironment={relayEnvironment}
              currentUser={user}
              {...data}
            />
          )
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
