const express = require("express")
const morgan = require("morgan")
const path = require("path")
const sharify = require("sharify")
const compression = require("compression")
const { createReloadable } = require("@artsy/express-reloadable")
const { assetMiddleware } = require("../lib/middleware/assetMiddleware")

require("../lib/setup_sharify")

const { NODE_ENV, PORT } = process.env
const isDevelopment = NODE_ENV === "development"
const app = express()

app.use(assetMiddleware("manifest-novo.json"))
app.use(sharify)
app.use(compression())
app.use(express.static("public"))

if (isDevelopment) {
  app.use(morgan("dev"))
  app.use(require("../lib/webpack-dev-server").app)

  const mountAndReload = createReloadable(app, require)
  mountAndReload(path.resolve("src/novo/src"))
} else {
  app.use(require("./src"))
}

// app.listen(PORT, () => {
//   const bootMessage = isDevelopment
//     ? `\n[App] Booting...  \n`
//     : `\n[App] Started on http://localhost:5000  \n`

//   // eslint-disable-next-line no-console
//   console.log(bootMessage)
// })

app._router.stack.forEach(function (r) {
  if (r.route && r.route.path) {
    console.log(r.route.path)
  }
})

/////////////////////////////////////////////
module.exports = app
