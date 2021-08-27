import sharify from "sharify"
import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"
import { buildServerApp } from "v2/System/Router/server"
import { getAppRoutes } from "v2/routes"
import ReactDOM from "react-dom/server"
import loadAssetManifest from "lib/manifest"
import express from "express"
import path from "path"
import { getServerParam } from "./Utils/getServerParam"
import { getCacheableRoutes } from "./System/Router/getCacheableRoutes"

// TODO: Use the same variables as the asset middleware. Both config and sharify
// have a default CDN_URL while this does not.
const { CDN_URL, NODE_ENV } = process.env

const PUBLIC_DIR = path.resolve(__dirname, "../../public")
const NOVO_MANIFEST = loadAssetManifest("manifest-novo.json")

if (!NOVO_MANIFEST) {
  throw new Error("manifest-novo.json not found")
}

const app = express()
const routes = getAppRoutes()
const cacheableRoutes = getCacheableRoutes()

/**
 * Mount routes that will connect to global SSR router
 */
app.get(
  cacheableRoutes,
  async (req: ArtsyRequest, res: ArtsyResponse, next: NextFunction) => {
    try {
      const {
        status,
        styleTags,
        scripts,
        redirect,
        bodyHTML,
        headTags,
      } = await buildServerApp(
        {
          req,
          res,
          routes,
        },
        "loadable-novo-stats.json",
        "public/assets",
        "/assets"
      )

      if (redirect) {
        res.redirect(status ?? 302, redirect.url)
        return
      }

      const headTagsString = ReactDOM.renderToString(headTags as any)
      const sharifyData = res.locals.sharify.script()

      const { APP_URL, CURRENT_PATH, WEBFONT_URL } = sharify.data

      const options = {
        cdnUrl: NODE_ENV === "production" ? CDN_URL : "",
        content: {
          body: bodyHTML,
          data: sharifyData,
          head: headTagsString,
          scripts,
          style: styleTags,
        },
        disable: {
          analytics: getServerParam(req, "disableAnalytics") === "true",
          postie: getServerParam(req, "disablePostie") === "true",
          segment: getServerParam(req, "disableSegment") === "true",
          stripe: getServerParam(req, "disableStripe") === "true",
        },
        env: NODE_ENV,
        fontUrl: WEBFONT_URL,
        icons: {
          // TODO: Move to new assset pipeline, this adds the CDN for images.
          favicon: res.locals.asset("/images/favicon.ico"),
          icon120: res.locals.asset("/images/icon-120.png"),
          icon152: res.locals.asset("/images/icon-152.png"),
          icon76: res.locals.asset("/images/icon-76.png"),
        },
        manifest: {
          browserConfig: NOVO_MANIFEST.lookup("/images/browserconfig.xml"),
          openSearch: NOVO_MANIFEST.lookup("/images/opensearch.xml"),
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
