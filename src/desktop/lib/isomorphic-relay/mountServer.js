import React from 'react'
import ReactDOMServer from 'react-dom/server'
import createRender from 'found/lib/createRender'
import queryMiddleware from 'farce/lib/queryMiddleware'
import serialize from 'serialize-javascript'
import { AppProvider } from './AppProvider'
import { Resolver } from 'found-relay'
import { getFarceResult } from 'found/lib/server'
import { getLoadableState } from 'loadable-components/server'

import { createRelayEnvironment } from './relayEnvironment'

export async function buildRelayApp(routeConfig, req, res) {
  return new Promise(async (resolve, reject) => {
    try {
      if (process.env.SSR_ENABLED) {
        const environment = createRelayEnvironment()
        const historyMiddlewares = [queryMiddleware]
        const resolver = new Resolver(environment)
        const render = createRender({})

        const { redirect, status, element } = await getFarceResult({
          url: req.url,
          historyMiddlewares,
          routeConfig,
          resolver,
          render,
        })

        if (redirect) {
          res.redirect(302, redirect.url)
          return
        }

        const APP = () => (
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
        ReactDOMServer.renderToString(APP)
        const relayData = await environment.relaySSRMiddleware.getCache()
        const loadableState = await getLoadableState(APP)

        resolve({
          APP,
          relayData,
          loadableScriptTag: loadableState.getScriptTag(),
        })
      } else {
        resolve({}) // FIXME: Handle disabled SSR state
      }
    } catch (error) {
      console.error('[FORCE lib/relay/server] Error:', error)
      reject(error)
    }
  })
}

// function getMarkup(props = {}) {
//   const { html = '', relayData = {}, loadableState = null } = props

//   return `
//     <html>
//     <head>
//       <title>Isomorphic Found Relay App</title>
//     </head>
//     <body>
//       <div id="react-root">${html}</div>

//       <script>
//         window.__RELAY_BOOTSTRAP__ = ${serialize(JSON.stringify(relayData), {
//           isJSON: true,
//         })};
//       </script>

//       ${loadableState ? loadableState.getScriptTag() : ''}

//       <script src='/assets/common.js'></script>
//       <script src="/assets/relay.js"></script>
//   </body>
//   </html>
//   `
// }
