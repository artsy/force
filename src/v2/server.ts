import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"
import { buildServerApp } from "v2/System/Router/server"
import ReactDOM from "react-dom/server"
import loadAssetManifest from "lib/manifest"
import express from "express"
import path from "path"
import { getServerParam } from "./Utils/getServerParam"
import { getRouteConfig } from "./System/Router/getRouteConfig"
import { getV2SharifyScript } from "./System/Server/sharifyHelpers"

// TODO: Use the same variables as the asset middleware. Both config and sharify
// have a default CDN_URL while this does not.
const { CDN_URL, NODE_ENV } = process.env

const PUBLIC_DIR = path.resolve(__dirname, "../../public")
const NOVO_MANIFEST = loadAssetManifest("manifest-novo.json")

if (!NOVO_MANIFEST) {
  throw new Error("manifest-novo.json not found")
}

const app = express()
const { routes, routePaths } = getRouteConfig()

/**
 * Mount routes that will connect to global SSR router
 */
app.get(
  routePaths,
  async (req: ArtsyRequest, res: ArtsyResponse, next: NextFunction) => {
    if (res.locals.cachedPageAvailable) {
      res.send(res.locals.cachedPageData)
      return
    }

    try {
      const {
        status,
        styleTags,
        scripts,
        redirect,
        bodyHTML,
        headTags,
      } = await buildServerApp({
        req,
        res,
        next,
        routes,
        loadableFile: "loadable-novo-stats.json",
        loadablePath: "public/assets",
        assetsPath: "/assets",
      })

      if (redirect) {
        res.redirect(status ?? 302, redirect.url)
        return
      }

      const headTagsString = ReactDOM.renderToString(headTags as any)
      const sharify = res.locals.sharify

      const { APP_URL, CURRENT_PATH, WEBFONT_URL } = sharify.data

      const options = {
        cdnUrl: NODE_ENV === "production" ? CDN_URL : "",
        content: {
          body: bodyHTML,
          data: getV2SharifyScript(sharify.data),
          head: headTagsString,
          scripts,
          style: styleTags,
        },
        disable: {
          analytics: getServerParam(req, "disableAnalytics") === "true",
          onetrust: getServerParam(req, "disableOneTrust") === "true",
          postie: getServerParam(req, "disablePostie") === "true",
          segment: getServerParam(req, "disableSegment") === "true",
          stripe: getServerParam(req, "disableStripe") === "true",
        },
        env: NODE_ENV,
        fontUrl: WEBFONT_URL,
        icons: {
          // TODO: Move to new assset pipeline, this adds the CDN for images.
          favicon: res.locals.asset("/images/favicon.ico"),
          faviconSVG: res.locals.asset("/images/favicon.svg"),
          appleTouchIcon: res.locals.asset("/images/apple-touch-icon.png"),
        },
        manifest: {
          browserConfig: NOVO_MANIFEST.lookup("/images/browserconfig.xml"),
          openSearch: NOVO_MANIFEST.lookup("/images/opensearch.xml"),
          webmanifest: NOVO_MANIFEST.lookup("/images/manifest.webmanifest"),
        },
        meta: {
          appleItunesApp: `${APP_URL}${CURRENT_PATH}`,
        },
        // TODO: Post-release review that sharify is still used in the template.
        sd: sharify.data,
      }

      res.render(`${PUBLIC_DIR}/index.ejs`, options)
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
)

// This export form is required for express-reloadable
// TODO: Remove when no longer needed for hot reloading
module.exports = app
export default app
