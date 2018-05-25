import BrowserProtocol from 'farce/lib/BrowserProtocol'
import React from 'react'
import ReactDOM from 'react-dom'
import createInitialFarceRouter from 'found/lib/createInitialFarceRouter'
import createRender from 'found/lib/createRender'
import queryMiddleware from 'farce/lib/queryMiddleware'
import { AppProvider } from './AppProvider'
import { Resolver } from 'found-relay'
import { loadComponents } from 'loadable-components'

import { createRelayEnvironment } from './relayEnvironment'

export async function mountClient(routeConfig) {
  let bootstrap = null

  try {
    bootstrap = JSON.parse(window.__RELAY_BOOTSTRAP__ || '{}')
  } catch (error) {}

  const environment = createRelayEnvironment(bootstrap)
  const historyMiddlewares = [queryMiddleware]
  const resolver = new Resolver(environment)
  const render = createRender({})

  try {
    const Router = await createInitialFarceRouter({
      historyProtocol: new BrowserProtocol(),
      historyMiddlewares,
      routeConfig,
      resolver,
      render,
    })

    const mountApp = () => {
      ReactDOM.hydrate(
        <AppProvider
          provide={{
            environment,
            routeConfig,
            resolver,
          }}
        >
          <Router resolver={resolver} />
        </AppProvider>,
        document.getElementById('react-root')
      )
    }

    if (process.env.SSR_ENABLED) {
      mountApp()
      // loadComponents().then(mountApp)
    } else {
      mountApp()
    }
  } catch (error) {
    console.log('[isomorphic-relay] Error:', error)
  }
}
