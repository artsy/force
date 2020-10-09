import express, { Request } from "express"
import { buildServerApp } from "v2/Artsy/Router/server"
import { getAppRoutes } from "v2/Apps/getAppRoutes"
import { flatten } from "lodash"
import mediator from "desktop/lib/mediator.coffee"
import ReactDOM from "react-dom/server"

// export const app = express()
const app = (module.exports = require("express")())

const isAllowedRoute = route => route !== "/" && route !== "*"

const topLevelMetaRoute = getAppRoutes()[0]
const allRoutes = flatten(
  topLevelMetaRoute.children.map(app => {
    // Only supports one level of nesting per app.
    // For instance, these are tabs on the artist page, etc.
    const allChildPaths = app.children
      ?.map(child => child.path)
      .filter(isAllowedRoute)

    return allChildPaths
      ? allChildPaths.map(child => app.path + "/" + child).concat(app.path)
      : app.path
  })
)

/**
 * Mount routes that will connect to global SSR router
 */
app.get(
  allRoutes,
  /**
   * Route handler
   */
  async (req: Request, res, next) => {
    try {
      const {
        status,
        styleTags,
        scripts,
        redirect,
        bodyHTML,
        headTags,
      } = await buildServerApp({
        context: {
          // initialMatchingMediaQueries: res.locals.sd.IS_MOBILE ? ["xs"] : undefined,
          user: req.user && req.user.toJSON(),
          // isEigen: res.locals.sd.EIGEN,
          mediator,
        },
        routes: getAppRoutes(),
        url: req.url,
        userAgent: req.header("User-Agent"),
      })

      if (redirect) {
        res.redirect(status ?? 302, redirect.url)
        return
      }

      // Investigate where this goes
      // console.log(headTags)
      // console.log(styleTags)

      res.status(status).send(`
        <html>
          <head>
            ${styleTags}
            ${ReactDOM.renderToString(headTags)}
          </head>
          <body>
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
