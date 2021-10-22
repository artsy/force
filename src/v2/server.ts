import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"
import { buildServerApp } from "v2/System/Router/server"
import ReactDOM from "react-dom/server"
import loadAssetManifest from "lib/manifest"
import express from "express"
import path from "path"
import { getServerParam } from "./Utils/getServerParam"
import { getRouteConfig } from "./System/Router/getRouteConfig"
import {
  filterObjectKeys,
  generateCustomSharifyScript,
  V2_SHARIFY,
} from "./System/Server/sharifyHelpers"

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
          data: generateCustomSharifyScript(
            filterObjectKeys(sharify.data, [...V2_SHARIFY])
          ),
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

      // Move uncachable per response data to a cookie.
      res.cookie("ARTSY_XAPP_TOKEN", sharify.data["ARTSY_XAPP_TOKEN"])
      res.cookie("IP_ADDRESS", sharify.data["IP_ADDRESS"])
      res.cookie("REQUEST_ID", sharify.data["REQUEST_ID"])
      res.cookie("SESSION_ID", sharify.data["SESSION_ID"])

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
