import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import createHistory from 'history/createBrowserHistory'

import { ContextProvider } from '@artsy/reaction-force/dist/Components/Artsy'
import { RoutesWithProgressBar } from '../components/RoutesWithProgressBar'

export const init = () => {
  const bootstrapData = window.__BOOTSTRAP__

  // Start app
  ReactDOM.hydrate(
    <Router history={createHistory()}>
      <ContextProvider {...bootstrapData}>
        <RoutesWithProgressBar />
      </ContextProvider>
    </Router>,
    document.getElementById('react-root')
  )
}
