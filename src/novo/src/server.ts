import type { NextFunction, Request, Response } from "express"
import { buildServerApp } from "v2/Artsy/Router/server"
import { getAppNovoRoutes } from "v2/Apps/getAppNovoRoutes"
import { flatten } from "lodash"
import ReactDOM from "react-dom/server"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
import loadAssetManifest from "lib/manifest"
import express from "express"

const novoManifest = loadAssetManifest("manifest-novo.json")

const app = express()

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

const routes = getAppNovoRoutes()

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
          context: buildServerAppContext(req, res),
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

      res.status(status).send(`
        <html>
          <head>
            ${styleTags}
            ${headTagsString}
            ${sharifyData}
          </head>
          <body>
            <script src="${novoManifest.lookup(
              "/assets-novo/novo-runtime.js"
            )}"></script>
            <script src="${novoManifest.lookup(
              "/assets-novo/novo-common.js"
            )}"></script>
            <script src="${novoManifest.lookup(
              "/assets-novo/novo-artsy-common.js"
            )}"></script>
            <script src="${novoManifest.lookup(
              "/assets-novo/novo-common-react.js"
            )}"></script>
            <script src="${novoManifest.lookup(
              "/assets-novo/novo-common-utility.js"
            )}"></script>
            <script src="${novoManifest.lookup(
              "/assets-novo/novo-artsy.js"
            )}"></script>

            <div id='react-root'>
            ${bodyHTML}
            </div>

            ${scripts}
            <script src="${novoManifest.lookup(
              "/assets-novo/novo-artsy-novo.js"
            )}"></script>
          </body>
        </html>
      `)
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
)

/**
 * We can't use a wildcard route because of gallery vanity urls, so iterate
 * over all app routes and return an array that we can explicity match against.
 */
function getRoutePaths() {
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

// This export form is required for express-reloadable
module.exports = app
