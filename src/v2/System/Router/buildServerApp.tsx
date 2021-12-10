import path from "path"
import * as React from "react"
import { isFunction } from "lodash"
import ReactDOMServer from "react-dom/server"
import serialize from "serialize-javascript"
import { ServerStyleSheet } from "styled-components"

import { Resolver } from "found-relay"
import createRender from "found/createRender"
import {
  FarceElementResult,
  FarceRedirectResult,
  getFarceResult,
} from "found/server"
import qs from "qs"
import type { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"
import { createQueryMiddleware } from "farce"

import { createRelaySSREnvironment } from "v2/System/Relay/createRelaySSREnvironment"
import { Boot } from "v2/System/Router/Boot"

import createLogger from "v2/Utils/logger"
import { createMediaStyle } from "v2/Utils/Responsive"
import { getUser } from "v2/Utils/user"
import { createRouteConfig } from "./Utils/createRouteConfig"
import { matchingMediaQueriesForUserAgent } from "./Utils/matchingMediaQueriesForUserAgent"

import { RouterConfig } from "./"
import { RenderError, RenderPending, RenderReady } from "./RenderStatus"
import { queryStringParsing } from "./Utils/queryStringParsing"

import { ChunkExtractor } from "@loadable/server"
import { getENV } from "v2/Utils/getENV"
import RelayServerSSR from "react-relay-network-modern-ssr/lib/server"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
import { AppRouteConfig } from "v2/System/Router/Route"
import { NextFunction } from "express"
import { findRoutesByPath } from "./Utils/findRoutesByPath"

export interface ServerAppResolve {
  bodyHTML?: string
  redirect?: {
    url: string
  }
  status?: number
  scripts?: string
  headTags?: any[]
  styleTags?: string
}

const MediaStyle = createMediaStyle()
const logger = createLogger("Artsy/Router/buildServerApp.tsx")

export interface ServerRouterConfig extends RouterConfig {
  req: ArtsyRequest
  res: ArtsyResponse
  next: NextFunction
  routes: AppRouteConfig[]
  context?: {
    injectedData?: any
  }
  /* For loadable-components bundle splitting */
  loadableFile?: string
  loadablePath?: string
  assetsPath?: string
}

export function buildServerApp(
  config: ServerRouterConfig
): Promise<ServerAppResolve> {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        context = {},
        routes = [],
        res,
        req,
        next,
        // FIXME: We don't, and wont, bundle split legacy code. Can remove this
        // configuration once desktop/apps/art_keeps_going and auction_reaction
        // are deleted from the codebase.
        loadableFile = "loadable-stats.json",
        loadablePath = "public/assets",
        assetsPath = "/assets",
      } = config

      // Find and execute pre-render hooks
      const matchedRoutes = findRoutesByPath({
        path: req.path,
      })

      for await (const route of matchedRoutes) {
        if (isFunction(route?.onServerSideRender)) {
          await route.onServerSideRender({
            req,
            res,
            next,
            route,
          })
        }
      }

      const serverContext = buildServerAppContext(req, res, context)
      const userAgent = req.header("User-Agent")
      const user = getUser(serverContext.user)
      const relayEnvironment = createRelaySSREnvironment({ user, userAgent })
      const historyMiddlewares = [
        createQueryMiddleware({
          parse: queryStringParsing,
          stringify: qs.stringify,
        }),
      ]
      const resolver = new Resolver(relayEnvironment)

      const Render = createRender({
        renderPending: RenderPending,
        renderReady: RenderReady,
        renderError: RenderError,
      })

      const routeConfig = createRouteConfig(routes)

      const farceResults = await getFarceResult({
        url: req.url,
        historyMiddlewares,
        routeConfig,
        resolver,
        matchContext: serverContext,
        render: props => <Render {...props} />,
      })

      if (isRedirect(farceResults)) {
        resolve(farceResults)
      } else {
        /**
         * An array that gets passed to `react-head`'s provider that will
         * collect the header tags that are rendered by the App. `headTags`
         * is _mutated_ when it's passed to the App. Beware.
         *
         **/
        const headTags = [<style type="text/css">{MediaStyle}</style>]
        const matchingMediaQueries =
          userAgent && matchingMediaQueriesForUserAgent(userAgent)

        const ServerApp: React.FC<{ tags: JSX.Element[] }> = ({
          tags = [],
        }) => {
          return (
            <Boot
              context={serverContext}
              user={user}
              headTags={tags}
              // FIXME:
              // @ts-ignore
              onlyMatchMediaQueries={matchingMediaQueries}
              relayEnvironment={relayEnvironment}
              routes={routes}
            >
              {farceResults.element}
            </Boot>
          )
        }

        // Build up script tags to inject into head
        const scripts: string[] = []

        const sheet = new ServerStyleSheet()

        // Extract bundle split chunks for SSR
        let bundleJSX
        let bodyHTML

        /**
         * This is the stats file generated by Force's webpack setup, via
         * @loadable/webpack-plugin.
         *
         * @see https://github.com/damassi/force/blob/main/webpack/envs/baseConfig.js#L94
         */
        let statsFile
        try {
          statsFile = path.resolve(process.cwd(), loadablePath, loadableFile)
        } catch (error) {
          console.error(
            "[Artsy/Router/buildServerApp.tsx] Error:",
            "Missing loadable-stats.json file"
          )
        }

        const assetPublicPath = (getENV("CDN_URL") || "") + assetsPath
        const extractor = new ChunkExtractor({
          statsFile,
          entrypoints: [],
          publicPath: assetPublicPath,
        })

        // Wrap component tree in library contexts to extract usage
        bundleJSX = extractor.collectChunks(
          sheet.collectStyles(<ServerApp tags={headTags} />)
        )

        bodyHTML = ReactDOMServer.renderToString(bundleJSX)

        // Extract all dynamic `import()` bundle split tags from app
        const bundleScriptTags = extractor.getScriptTags()

        // TODO: Wire up / experiment
        // https://loadable-components.com/docs/api-loadable-server/
        // const bundleLinkTags = extractor.getLinkTags()

        scripts.push(
          bundleScriptTags
            .split("\n")
            .map(script => {
              /**
               * In production, prefix injected script src with CDN endpoint.
               * @see https://github.com/artsy/force/blob/main/src/lib/middleware/asset.ts#L23
               */
              if (getENV("CDN_URL")) {
                const scriptTagWithCDN = script.replace(
                  /src="\/assets/g,
                  `src="${assetPublicPath}`
                )
                return scriptTagWithCDN
              } else {
                return script
              }
            })
            .filter(script => {
              return !(
                /**
                 * Since these files are already embedded in our main
                 * layout file, omit them from the scripts array.
                 *
                 * TODO: Don't include these files in the main layout
                 * and instead relay on dynamically including them here.
                 * Will require some shuffling in the jade template,
                 * however.
                 */
                (
                  script.includes("/assets/runtime.") ||
                  script.includes("/assets/artsy.") ||
                  script.includes("/assets/common-artsy.") ||
                  script.includes("/assets/common-backbone.") ||
                  script.includes("/assets/common-jquery.") ||
                  script.includes("/assets/common-react.") ||
                  script.includes("/assets/common-utility.") ||
                  script.includes("/assets/common.")
                )
              )
            })
            .join("\n")
        )

        // TODO: Wire up if A/B test is successful
        // extractor.getLinkTags()

        // Get serializable Relay data for rehydration on the client
        const _relayData = await (relayEnvironment.relaySSRMiddleware as RelayServerSSR).getCache()

        // Extract CSS styleTags to inject for SSR pass
        const styleTags = sheet.getStyleTags()

        // Strip response of problematic data structures
        const relayData = cleanRelayData(_relayData)

        scripts.push(`
            <script>
              var __RELAY_BOOTSTRAP__ = ${serializeRelayData(relayData)};
            </script>
          `)

        const result = {
          bodyHTML,
          status: farceResults.status,
          headTags,
          styleTags,
          scripts: scripts.join("\n"),
        }

        // Only exporting this for testing purposes, don't go around using this
        // elsewhere, we’re serious.
        if (__TEST_INTERNAL_SERVER_APP__) {
          Object.defineProperty(
            result,

            __TEST_INTERNAL_SERVER_APP__,
            { value: ServerApp }
          )
        }

        resolve(result)
      }
    } catch (error) {
      logger.error(error)
      reject(error)
    }
  })
}

export const __TEST_INTERNAL_SERVER_APP__ =
  typeof jest !== "undefined" ? Symbol() : null

function isRedirect(
  farceResult: FarceElementResult | FarceRedirectResult
): farceResult is FarceRedirectResult {
  return farceResult.hasOwnProperty("redirect")
}

/**
 * FIXME: Relay SSR middleware is passing a _res object across which
 * has circular references, leading to issues *ONLY* on staging / prod
 * which can't be reproduced locally. This strips out _res as a quickfix
 * though this should be PR'd back at relay-modern-network-modern-ssr.
 */
function cleanRelayData(relayData: any) {
  try {
    relayData.forEach(item => {
      item.forEach(i => {
        delete i._res
      })
    })
  } catch (error) {
    console.error("[Artsy/Router/buildServerApp] Error cleaning data", error)
  }

  return relayData
}
/**
 * Serialize data for client-side consumption
 */
function serializeRelayData(relayData: any) {
  let hydrationData
  try {
    hydrationData = serialize(relayData, {
      isJSON: true,
    })
  } catch (error) {
    hydrationData = "{}"
    console.error(
      "[Artsy/Router/buildServerApp] Error serializing data:",
      error
    )
  }
  return serialize(hydrationData || {}, {
    isJSON: true,
  })
}
