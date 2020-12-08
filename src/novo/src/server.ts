import sharify from "sharify"
import type { NextFunction, Request, Response } from "express"
import { buildServerApp } from "v2/Artsy/Router/server"
import { getAppNovoRoutes } from "v2/Apps/getAppNovoRoutes"
import { flatten } from "lodash"
import ReactDOM from "react-dom/server"
import loadAssetManifest from "lib/manifest"
import express from "express"
import path from "path"

const config = require("../../config")
const { NODE_ENV } = config

const PUBLIC_DIR = path.resolve(__dirname, "../../../public")
const NOVO_MANIFEST = loadAssetManifest("manifest-novo.json")

const app = express()
const routes = getAppNovoRoutes()

/**
 * We can't use a wildcard route because of gallery vanity urls, so iterate
 * over all app routes and return an array that we can explicity match against.
 */
function getRoutePaths(): string[] {
  const flatRoutes = flatten(
    routes[0].children.map(app => {
      // Only supports one level of nesting per app. For instance, these are tabs
      // on the artist page, etc.
      const childRoutePaths = app.children
        ?.map(child => child.path)
        .filter(route => route !== "/" && route !== "*")

      const allRoutes = childRoutePaths
        ? childRoutePaths.map(child => app.path + "/" + child).concat(app.path)
        : app.path

      return allRoutes
    })
  )
  return flatRoutes
}

function initializeNovo() {
  app.get("/novo", (req, res) => {
    res.send(`
      <!doctype html>
        <body>
          <ul>
            <li><a href='/novo/debug/baseline'>Baseline</a></li>
            <li><a href='/novo/feature/artsy-vanguard-2020'>Feature Page</a></li>
            <li><a href='/novo/artist/pablo-picasso'>Artist</a></li>
            <li><a href='/novo/artwork/pablo-picasso-couple-posant-pour-un-portrait-en-medaillon-couple-posing-for-a-medallion-portrait'>Artwork</a></li>
          </ul>
        </body>
      </html>
    `)
  })

  /**
   * Mount routes that will connect to global SSR router
   */
  app.get(
    getRoutePaths(),

    // Route handler
    async (req: Request, res: Response, next: NextFunction) => {
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
          "public/assets-novo",
          "/assets-novo"
        )

        if (redirect) {
          res.redirect(status ?? 302, redirect.url)
          return
        }

        const headTagsString = ReactDOM.renderToString(headTags as any)
        const sharifyData = res.locals.sharify.script()

        const options = {
          content: {
            body: bodyHTML,
            data: sharifyData,
            head: headTagsString,
            scripts,
            style: styleTags,
          },
          css: {
            // TODO: Old global asset, possibly move into styled components.
            global: res.locals.asset("/assets/main_layout.css"),
          },
          env: NODE_ENV,
          icons: {
            // TODO: Move to new assset pipeline, this adds the CDN for images.
            favicon: res.locals.asset("/images/favicon.ico"),
            icon120: res.locals.asset("/images/icon-120.png"),
            icon152: res.locals.asset("/images/icon-152.png"),
            icon76: res.locals.asset("/images/icon-76.png"),
          },
          manifest: {
            artsy: NOVO_MANIFEST.lookup("/assets-novo/artsy.js"),
            artsyCommon: NOVO_MANIFEST.lookup("/assets-novo/artsy-common.js"),
            artsyNovo: NOVO_MANIFEST.lookup("/assets-novo/artsy-novo.js"),
            common: NOVO_MANIFEST.lookup("/assets-novo/common.js"),
            commonReact: NOVO_MANIFEST.lookup("/assets-novo/common-react.js"),
            commonUtility: NOVO_MANIFEST.lookup(
              "/assets-novo/common-utility.js"
            ),
            runtime: NOVO_MANIFEST.lookup("/assets-novo/runtime.js"),
          },
          sd: sharify.data,
        }

        res.render(`${PUBLIC_DIR}/index.ejs`, {
          ...options,
        })
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
  )
  return app
}

// This export form is required for express-reloadable
// TODO: Remove when no longer needed for hot reloading
module.exports = app
module.exports.initializeNovo = initializeNovo
