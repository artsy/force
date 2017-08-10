import App from 'desktop/apps/auctions2/components/App'
import React from 'react'
import auctionsReducer from 'desktop/apps/auctions2/reducers'
import configureStore from 'desktop/components/react/utils/configureStore'
import { initialState as appInitialState } from 'desktop/apps/auctions2/reducers/appReducer'
import { renderReactLayout } from 'desktop/components/react/utils/renderReactLayout'

export function index (req, res, next) {
  const store = configureStore(auctionsReducer, {
    app: appInitialState
  })

  const layout = renderReactLayout({
    basePath: res.app.get('views'),
    blocks: {
      head: 'meta.jade',
      body: (props) => <App store={store} {...props} />
    },
    locals: {
      ...res.locals,
      assetPackage: 'auctions',
      bodyClass: 'auctions2-body body-header-fixed body-no-margins'
    },
    data: {
      app: store.getState().app
    }
  })

  res.send(layout)
}
