import { getENV } from "Utils/getENV"
import { Environment } from "react-relay"
import path from "path"
import { ChunkExtractor } from "@loadable/server"
import serialize from "serialize-javascript"
import { ServerStyleSheet } from "styled-components"
import { renderToString } from "react-dom/server"
import RelayServerSSR, {
  SSRCache,
} from "react-relay-network-modern-ssr/lib/server"
import { RelayNetworkLayerResponse } from "react-relay-network-modern"

const STATS = "loadable-stats.json"

const PUBLIC_ASSET_PATH = "public/assets"

const ASSET_PATH = "/assets"

interface CollectAssetsProps {
  ServerRouter: React.FC
  relayEnvironment: Environment
}

export const collectAssets = async ({
  ServerRouter,
  relayEnvironment,
}: CollectAssetsProps) => {
  /**
   * This is the stats file generated by Force's webpack setup, via
   * @loadable/webpack-plugin.
   */
  const statsFile = (() => {
    try {
      return path.resolve(process.cwd(), PUBLIC_ASSET_PATH, STATS)
    } catch (error) {
      console.error(
        "[system/router/serverRouter.tsx] Error:",
        "Missing loadable-stats.json file"
      )
    }
  })()

  const assetPublicPath = (getENV("CDN_URL") ?? "") + ASSET_PATH

  const extractor = new ChunkExtractor({
    statsFile,
    entrypoints: [],
    publicPath: assetPublicPath,
  })

  const sheet = new ServerStyleSheet()

  const jsx = extractor.collectChunks(sheet.collectStyles(<ServerRouter />))

  const html = renderToString(jsx)

  // Extract styled-components styles
  const styleTags = sheet.getStyleTags()

  // Build up script tags to inject into head
  const initialScripts: string[] = []

  // Extract scripts from loadable components
  const bundleScriptTags = extractor.getScriptTags()

  initialScripts.push(
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
      // Add defer tag
      .map(script => script.replace("></script>", " defer></script>"))
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
            script.includes("/assets/common-react.") ||
            script.includes("/assets/common-utility.") ||
            script.includes("/assets/common.")
          )
        )
      })
      .join("\n")
  )

  const relaySSRMiddleware = (relayEnvironment as any)
    .relaySSRMiddleware as RelayServerSSR

  const initialRelayData = await relaySSRMiddleware.getCache()

  initialScripts.push(`
    <script>
      var __RELAY_BOOTSTRAP__ = ${serializeRelayData(initialRelayData)};
    </script>
  `)

  const scripts = initialScripts.join("\n")

  return {
    html,
    scripts,
    styleTags,
  }
}

const serializeRelayData = (initialRelayData: SSRCache) => {
  initialRelayData.forEach(entry => {
    entry.forEach((item: RelayNetworkLayerResponse) => {
      // Clean relay data of problematic data structures
      delete item._res
    })
  })

  let hydrationData

  try {
    hydrationData = serialize(initialRelayData, {
      isJSON: true,
    })
  } catch (error) {
    hydrationData = "{}"

    console.error(
      "[system/router/collectAssets] Error serializing data:",
      error
    )
  }

  return serialize(hydrationData || {}, {
    isJSON: true,
  })
}
