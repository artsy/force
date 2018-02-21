import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import Cookies from 'cookies-js'

import { ContextProvider } from '@artsy/reaction/dist/Components/Artsy'
import { Wizard } from '@artsy/reaction/dist/Components/Onboarding/Wizard'

export const init = () => {
  const bootstrapData = window.__BOOTSTRAP__

  // Get the path we should redirect to after onboarding
  const destination = Cookies.get('destination')
  if (destination) {
    Cookies.expire('destination')
  }

  // Start app
  ReactDOM.hydrate(
    <Router history={createHistory()}>
      <ContextProvider {...bootstrapData}>
        <Wizard redirectTo={destination} />
      </ContextProvider>
    </Router>,
    document.getElementById('react-root')
  )
}
