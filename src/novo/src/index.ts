import { NextFunction, Request, Response } from "express"
import { buildServerApp } from "v2/Artsy/Router/server"
import { getAppRoutes } from "v2/Apps/getAppRoutes"
import { flatten } from "lodash"
import ReactDOM from "react-dom/server"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"

// This export form is required for express-reloadable
const app = (module.exports = require("express")())

app.get("/", (req, res) => {
  res.send(`
    <!doctype html>
      <body>
        <ul>
          <li><a href='/debug/baseline'>Baseline</a></li>
          <li><a href='/feature/artsy-vanguard-2020'>Feature Page</a></li>
          <li><a href='/artist/pablo-picasso'>Artist</a></li>
          <li><a href='/artwork/pablo-picasso-couple-posant-pour-un-portrait-en-medaillon-couple-posing-for-a-medallion-portrait'>Artwork</a></li>
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
      } = await buildServerApp({
        context: buildServerAppContext(req, res),
        routes: getAppRoutes(),
        url: req.url,
        userAgent: req.header("User-Agent"),
      })

      if (redirect) {
        res.redirect(status ?? 302, redirect.url)
        return
      }

      const headTagsString = ReactDOM.renderToString(headTags as any)
      const sharifyData = res.locals.sharify.script()
      const asset = res.locals.asset

      res.status(status).send(`
        <html>
          <head>
            ${styleTags}
            ${headTagsString}
            ${sharifyData}
          </head>
          <body>
            <script src="${asset("/assets/runtime.js")}"></script>
            <script src="${asset("/assets/common.js")}"></script>
            <script src="${asset("/assets/artsy-common.js")}"></script>
            <script src="${asset("/assets/common-backbone.js")}"></script>
            <script src="${asset("/assets/common-jquery.js")}"></script>
            <script src="${asset("/assets/common-react.js")}"></script>
            <script src="${asset("/assets/common-utility.js")}"></script>
            <script src="${asset("/assets/artsy.js")}"></script>
            <script src="${asset("/assets/artsy-novo.js")}"></script>

            ${scripts}

            <div id='react-root'>
              ${bodyHTML}
            </div>
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
  const routes = flatten(
    getAppRoutes()[0].children.map(app => {
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
  return routes
}
