import fs from "fs"
import path from "path"
import RelayServerSSR from "react-relay-network-modern-ssr/lib/server"
import { getENV } from "Utils/getENV"
import { Environment } from "react-relay"
import { ChunkExtractor } from "@loadable/server"
import { ServerStyleSheet } from "styled-components"
import { renderToString } from "react-dom/server"
import { ENABLE_SSR_STREAMING } from "Server/config"
import { renderToStream } from "System/Router/Utils/renderToStream"
import { ArtsyRequest } from "Server/middleware/artsyExpress"
import { serializeRelayHydrationData } from "System/Router/Utils/serializeRelayHydrationData"

const ASSET_PATH = "/static"

interface CollectAssetsProps {
  ServerRouter: React.FC<React.PropsWithChildren<unknown>>
  relayEnvironment: Environment
  req: ArtsyRequest
}

export const collectAssets = async ({
  ServerRouter,
  relayEnvironment,
  req,
}: CollectAssetsProps) => {
  /**
   * This is the stats file generated by Force's webpack setup, via
   * @loadable/webpack-plugin.
   */
  const statsFile = (() => {
    try {
      return path.resolve(process.cwd(), "dist", "loadable-stats.json")
    } catch (error) {
      console.error(
        "[system/router/serverRouter.tsx] Error:",
        "Missing loadable-stats.json file"
      )
    }
  })()

  const assetPublicPath = getENV("CDN_URL") ?? ""

  const extractor = new ChunkExtractor({
    statsFile,
    entrypoints: [],
    publicPath: assetPublicPath,
  })

  const sheet = new ServerStyleSheet()

  const jsx = extractor.collectChunks(sheet.collectStyles(<ServerRouter />))

  let stream
  let html
  let styleTags

  if (ENABLE_SSR_STREAMING) {
    stream = await renderToStream({ jsx, sheet, req })
  } else {
    html = renderToString(jsx)
    styleTags = sheet.getStyleTags()
  }

  const relaySSRMiddleware = (relayEnvironment as any)
    .relaySSRMiddleware as RelayServerSSR

  const initialRelayData = await relaySSRMiddleware.getCache()

  const manifest = await fs.promises.readFile("./dist/manifest.json", "utf-8")

  const extractScriptTags = () => {
    const initialScripts: string[] = []

    const { entries } = JSON.parse(manifest)

    const { js = [] } = entries["index"].initial

    const runtimeScripts = js.map(url => {
      const cdnUrl = getENV("CDN_URL")

      const scriptUrl = (() => {
        if (getENV("NODE_ENV") === "production" && cdnUrl) {
          return `${cdnUrl}${url}`
        } else {
          return url
        }
      })()

      return `<script src="${scriptUrl}" defer></script>`
    })

    initialScripts.push(...runtimeScripts)

    const bundleScriptTags = extractor.getScriptTags()

    initialScripts.push(
      bundleScriptTags
        .split("\n")
        .map(script => {
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
        .join("\n")
    )

    initialScripts.push(`
      <script>
        var __RELAY_HYDRATION_DATA__ = ${serializeRelayHydrationData(
          initialRelayData
        )};
      </script>
    `)

    const scripts = initialScripts.join("\n")

    return scripts
  }

  return {
    html,
    extractScriptTags,
    stream,
    styleTags,
  }
}
