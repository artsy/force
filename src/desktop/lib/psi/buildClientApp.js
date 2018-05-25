import BrowserProtocol from 'farce/lib/BrowserProtocol'
import React from 'react'
import createInitialFarceRouter from 'found/lib/createInitialFarceRouter'
import createRender from 'found/lib/createRender'
import queryMiddleware from 'farce/lib/queryMiddleware'
import { AppProvider } from './AppProvider'
import { Resolver } from 'found-relay'
import { loadComponents } from 'loadable-components'

import { createRelayEnvironment } from './relayEnvironment'

export function buildClientApp(routeConfig) {
  return new Promise(async (resolve, reject) => {
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

      const App = () => (
        <AppProvider
          provide={{
            environment,
            routeConfig,
            resolver,
          }}
        >
          <Router resolver={resolver} />
        </AppProvider>
      )

      if (process.env.SSR_ENABLED) {
        loadComponents().then(resolve({ App }))
      } else {
        resolve({ App })
      }
    } catch (error) {
      console.log('[isomorphic-relay] Error:', error)
      reject(new Error(error))
    }
  })
}
