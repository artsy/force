import React, { Fragment } from 'react'
import ReactDOMServer from 'react-dom/server'
import createRender from 'found/lib/createRender'
import queryMiddleware from 'farce/lib/queryMiddleware'
import serialize from 'serialize-javascript'
import { AppProvider } from './AppProvider'
import { Resolver } from 'found-relay'
import { getFarceResult } from 'found/lib/server'
import { getLoadableState } from 'loadable-components/server'

import { createRelayEnvironment } from './relayEnvironment'

export function buildServerApp(routeConfig, url = '/') {
  return new Promise(async (resolve, reject) => {
    try {
      if (!process.env.SSR_ENABLED) {
        return resolve({
          RelayApp: x => x,
          relayData: {},
          loadableScripts: {},
        })
      }

      const environment = createRelayEnvironment()
      const historyMiddlewares = [queryMiddleware]
      const resolver = new Resolver(environment)
      const render = createRender({})

      const { redirect, status, element } = await getFarceResult({
        url,
        historyMiddlewares,
        routeConfig,
        resolver,
        render,
      })

      // TODO: Deal with redirect one level up?
      if (redirect) {
        return resolve({ redirect, status })
      }

      const App = () => (
        <AppProvider
          provide={{
            environment,
            resolver,
            routeConfig,
          }}
        >
          {element}
        </AppProvider>
      )

      // Kick off relay requests
      ReactDOMServer.renderToString(App)

      const relayData = await environment.relaySSRMiddleware.getCache()
      const loadableState = await getLoadableState(App())

      resolve({
        App: ({ children, ...props }) => (
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: `
                  ${loadableState.getScriptTag()}

                  <script>
                    var __RELAY_BOOTSTRAP__ = ${serialize(
                      JSON.stringify(relayData),
                      { isJSON: true }
                    )};
                  </script>
                `,
              }}
            />

            <App {...props}>{children}</App>
          </div>
        ),
      })
    } catch (error) {
      console.error('[FORCE lib/relay/server] Error:', error)
      reject(error)
    }
  })
}
