import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import createHistory from 'history/createBrowserHistory'

import { ContextProvider } from '@artsy/reaction-force/dist/Components/Artsy'
import { Wizard } from '@artsy/reaction-force/dist/Components/Onboarding/Wizard'

export const init = () => {
  const bootstrapData = window.__BOOTSTRAP__

  // Start app
  ReactDOM.hydrate(
    <Router history={createHistory()}>
      <ContextProvider {...bootstrapData}>
        <Wizard />
      </ContextProvider>
    </Router>,
    document.getElementById('react-root')
  )
}
