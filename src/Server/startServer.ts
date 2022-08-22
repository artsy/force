import http from "http"
import withGracefulShutdown from "http-shutdown"
import { once } from "lodash"
import { initializeArtsyXapp } from "./artsyXapp"
import { initializeCache } from "./cacheClient"
import { errorHandlerMiddleware } from "./middleware/errorHandler"
import * as Sentry from "@sentry/node"
import { APP_URL, NODE_ENV, PORT } from "Server/config"

const { HEADERS_TIMEOUT_SECONDS, KEEPALIVE_TIMEOUT_SECONDS } = process.env

/**
 * Run start server as a callback for now until waiting on the xapp token and
 * cache have a chance to be refactored.
 */
export async function startServer(app) {
  await initializeCache()

  setupErrorHandling(app)

  initializeArtsyXapp(() => {
    const message =
      NODE_ENV === "development"
        ? `[Force] Booting on ${APP_URL} \n\n`
        : `\n[Force] Started on ${APP_URL}. \n`

    const server = withGracefulShutdown(http.createServer(app))

    const stopServer = once(() => {
      server.shutdown(() => {
        console.log("Closed existing connections.")
        process.exit(0)
      })
    })

    if (KEEPALIVE_TIMEOUT_SECONDS) {
      console.log(
        "Setting keepAliveTimeout to " + KEEPALIVE_TIMEOUT_SECONDS + " sec."
      )
      server.keepAliveTimeout = Number(KEEPALIVE_TIMEOUT_SECONDS) * 1000
    }

    if (HEADERS_TIMEOUT_SECONDS) {
      console.log(
        "Setting headersTimeout to " + HEADERS_TIMEOUT_SECONDS + " sec."
      )

      // @ts-ignore -- FIXME: Property 'headersTimeout' does not exist on type 'Server & WithShutdown'.
      server.headersTimeout = Number(HEADERS_TIMEOUT_SECONDS) * 1000
    }

    // @ts-ignore -- Argument of type 'string' is not assignable to parameter of type 'number'.
    server.listen(PORT, "0.0.0.0", () => console.log(message))

    process.on("SIGTERM", stopServer)
  })
}

function setupErrorHandling(app) {
  // Setup exception reporting
  app.use(Sentry.Handlers.errorHandler())

  // And error handling
  app.get("*", (req, res, next) => {
    const err = new Error()
    // @ts-ignore -- FIXME: status does not exist on err
    err.status = 404
    err.message = "Not Found"
    next(err)
  })

  app.use(errorHandlerMiddleware)
}
