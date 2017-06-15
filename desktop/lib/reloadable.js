/**
 * Dev utility for server-side code reloading without the restart. In development,
 * watch for file-system changes and clear cached modules when a change occurs,
 * thus effectively reloading the entire app on request.
 *
 * @example
 *
 * // index.js
 * import 'babel-core/register'
 * import express from 'express'
 * import reloadable, { isDevelopment } from 'desktop/lib/reloadable'
 *
 * const app = module.exports = express()
 *
 * app.set('view engine', 'jade')
 * app.set('views', `${__dirname}/templates`)
 *
 * if (isDevelopment) {
 *   reloadable(app, (req, res, next) => {
 *     require('./server')(req, res, next)
 *   }
 * } else {
 *   app.use(require('./server'))
 * }
 *
 * // server.js
 * import * as routes from './routes'
 * import express from 'express'
 *
 * const app = module.exports = express.Router()
 *
 * app.get('/foo/:bar', routes.index)
 * ...
 */

import path from 'path'
import invariant from 'invariant'
import { isFunction } from 'underscore'

export const isDevelopment = process.env.NODE_ENV === 'development'

export default function reloadable (app, onReload, appPath) {
  if (isDevelopment) {
    invariant(isFunction(onReload),
      '(desktop/lib/reloadable.js) Error initializing reloadable: `onReload` is ' +
      'undefined. Did you forget to pass a callback function?'
    )

    // By default, watch all files in the `/desktop` folder
    appPath = appPath || path.join(__dirname, '../')

    const watcher = require('chokidar').watch(appPath)

    watcher.on('ready', () => {
      watcher.on('all', () => {
        Object.keys(require.cache).forEach(id => {
          if (id.startsWith(appPath)) {
            delete require.cache[id]
          }
        })
      })
    })

    let currentResponse = null
    let currentNext = null

    app.use((req, res, next) => {
      currentResponse = res
      currentNext = next

      res.on('finish', () => {
        currentResponse = null
        currentNext = null
      })

      next()
    })

    /**
     * In case of an uncaught exception show it to the user and proceed, rather
     * than exiting the process.
     */
    process.on('uncaughtException', (error) => {
      if (currentResponse) {
        currentNext(error)
        currentResponse = null
        currentNext = null
      } else {
        process.abort()
      }
    })

    app.use((req, res, next) => {
      onReload(req, res, next)
    })

    return app

    // Node env not 'development', exit
  } else {
    throw new Error(
      '(desktop/lib/reloadable.js) NODE_ENV must be set to "development" to use ' +
      'reloadable.js'
    )
  }
}
