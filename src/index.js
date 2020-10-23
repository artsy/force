const express = require("express")

const app = express()

const oldForce = require("./old-force")
const novo = require("./novo/index")

app.use("/", novo)
app.use("/", oldForce)

app.listen(5000, () => {
  const bootMessage = true
    ? `\n[App] Booting Global Force...  \n`
    : `\n[App] Started on http://localhost:5000  \n`

  // eslint-disable-next-line no-console
  console.log(bootMessage)
})

// const http = require("http")
// const withGracefulShutdown = require("http-shutdown")
// const startServer = once(() => {
//   if (module === require.main) {
//     const message =
//       NODE_ENV === "development"
//         ? `\n\n  [Force] Booting on port ${PORT}... \n`
//         : `\n\n  [Force] Started on ${APP_URL}. \n`

//     const server = withGracefulShutdown(http.createServer(app))

//     const stopServer = once(() => {
//       server.shutdown(() => {
//         console.log("Closed existing connections.")
//         process.exit(0)
//       })
//     })

//     if (KEEPALIVE_TIMEOUT_SECONDS) {
//       console.log(
//         "Setting keepAliveTimeout to " + KEEPALIVE_TIMEOUT_SECONDS + " sec."
//       )
//       server.keepAliveTimeout = Number(KEEPALIVE_TIMEOUT_SECONDS) * 1000
//     }

//     if (HEADERS_TIMEOUT_SECONDS) {
//       console.log(
//         "Setting headersTimeout to " + HEADERS_TIMEOUT_SECONDS + " sec."
//       )
//       server.headersTimeout = Number(HEADERS_TIMEOUT_SECONDS) * 1000
//     }

//     server.listen(PORT, "0.0.0.0", () => console.log(message))

//     process.on("SIGTERM", stopServer)
//   }
// })
