import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import Cookies from 'cookies-js'

import { ContextProvider } from '@artsy/reaction/dist/Components/Artsy'
import { Wizard } from '@artsy/reaction/dist/Components/Onboarding/Wizard'

export const init = () => {
  const bootstrapData = window.__BOOTSTRAP__

  let redirectTo = '/'
  // Check the cookie for a destination
  if (Cookies.get('destination')) {
    redirectTo = Cookies.get('destination')
    Cookies.expire('destination')

    // Also check the redirectTo from query params
  } else if (bootstrapData.redirectTo) {
    redirectTo = bootstrapData.redirectTo
  }

  // Start app
  ReactDOM.hydrate(
    <Router history={createHistory()}>
      <ContextProvider {...bootstrapData}>
        <Wizard redirectTo={redirectTo} />
      </ContextProvider>
    </Router>,
    document.getElementById('react-root')
  )
}
