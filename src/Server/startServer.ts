import { APP_URL, NODE_ENV, PORT } from "Server/config"
import { setupExpressErrorHandler } from "@sentry/node"
import http from "http"
import withGracefulShutdown from "http-shutdown"
import { once } from "lodash"
import { initializeArtsyXapp } from "./artsyXapp"

const { HEADERS_TIMEOUT_SECONDS, KEEPALIVE_TIMEOUT_SECONDS } = process.env

/**
 * Run start server as a callback for now until waiting on the xapp token and
 * cache have a chance to be refactored.
 */
export async function startServer(
  app,
  onStart?: () => void,
): Promise<http.Server> {
  setupExpressErrorHandler(app)

  return new Promise(resolve => {
    initializeArtsyXapp(() => {
      const message =
        NODE_ENV === "development"
          ? `[Force] Booting on ${APP_URL}... \n`
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
          `Setting keepAliveTimeout to ${KEEPALIVE_TIMEOUT_SECONDS} sec.`,
        )
        server.keepAliveTimeout = Number(KEEPALIVE_TIMEOUT_SECONDS) * 1000
      }

      if (HEADERS_TIMEOUT_SECONDS) {
        console.log(`Setting headersTimeout to ${HEADERS_TIMEOUT_SECONDS} sec.`)

        server.headersTimeout = Number(HEADERS_TIMEOUT_SECONDS) * 1000
      }

      server.listen(PORT, "0.0.0.0", () => {
        console.log(message)

        onStart?.()

        resolve(server)
      })

      process.on("SIGTERM", stopServer)
    })
  })
}
