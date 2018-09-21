require("regenerator-runtime/runtime")
require("coffeescript/register")
require("@babel/register")({
  extensions: [".ts", ".js", ".tsx", ".jsx"],
  plugins: ["babel-plugin-dynamic-import-node"],
})

global.Promise = require("bluebird")

const artsyXapp = require("artsy-xapp")
const cache = require("./lib/cache")
const express = require("express")
const setup = require("./lib/setup").default
const app = (module.exports = express())

const {
  APP_URL,
  API_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  NODE_ENV,
  PORT,
  PROFILE_MEMORY,
} = process.env

if (PROFILE_MEMORY) require(".src/lib/memory_profiler")()

// Add all of the middleware and global setup
setup(app)

// Connect to Redis
cache.setup(() => {
  // if we can't get an xapp token, just exit and let the whole system try
  // again - this prevents a sustained broken state when gravity returns a
  // 502 during force startup.
  artsyXapp.on("error", err => {
    error(`
Could not start Force because it could not set up the xapp token, this is likely
due to \`API_URL\`, \`CLIENT_ID\` and \`CLIENT_SECRET\` not being set, but 
also could be gravity being down.`)
    error(err)
    process.exit()
  })
  // Get an xapp token
  artsyXapp.init({ url: API_URL, id: CLIENT_ID, secret: CLIENT_SECRET }, () => {
    // Start the server
    if (module === require.main) {
      const message =
        NODE_ENV === "development"
          ? `\n\n  [Force] Booting on port ${PORT}... \n`
          : `\n\n  [Force] Started on ${APP_URL}. \n`

      app.listen(PORT, "0.0.0.0", () => console.log(message))
    }
  })
})
