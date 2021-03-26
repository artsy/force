import http from "http"
import withGracefulShutdown from "http-shutdown"
import { once } from "lodash"
import { initializeArtsyXapp } from "./artsyXapp"
import { initializeCache } from "./cacheClient"

const {
  APP_URL,
  HEADERS_TIMEOUT_SECONDS,
  KEEPALIVE_TIMEOUT_SECONDS,
  NODE_ENV,
  PORT,
} = process.env

/**
 * Run start server as a callback for now until waiting on the xapp token and
 * cache have a chance to be refactored.
 */
export async function startServer(app) {
  await initializeCache()

  initializeArtsyXapp(() => {
    const message =
      NODE_ENV === "development"
        ? `\n\n  [Force] Booting on ${APP_URL}... \n`
        : `\n\n  [Force] Started on ${APP_URL}. \n`

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
